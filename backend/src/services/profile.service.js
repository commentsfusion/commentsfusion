const Profile = require('../models/profile');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status').default;
const { JSDOM } = require('jsdom');
const OpenAI = require('openai');
const config = require('../config/config');

const openai = new OpenAI({ apiKey: config.openai.apiKey });

async function checkUserExists(userId, linkedinUsername) {
  const exists = await Profile.exists({ user: userId, linkedinUsername });
  return Boolean(exists);
}

async function upsertProfileData(userId, linkedinUsername, html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Basic text selectors
  const name = doc.querySelector('.top-card-background-hero-image + .ph5 h1')?.textContent.trim() || '';
  const tagLine = doc.querySelector('.top-card-background-hero-image + .ph5 div.text-body-medium.break-words')?.textContent.trim() || '';
  const location = doc.querySelector('.top-card-background-hero-image + .ph5 span.text-body-small.inline.break-words')?.textContent.trim() || '';
  const about = doc.querySelector('#about ~ .display-flex.ph5.pv3 span[aria-hidden]')?.textContent.trim() || '';

  const topCardList = doc.querySelectorAll('.pv-top-card--list > li');
  const connections = topCardList[2]?.textContent.trim() || '';
  
  const followersEl = doc.querySelector('.pv-top-card--list-bullet > li');
  const followers = followersEl?.textContent.trim() || '';

  // Helper to extract list items and join
  function extractList(selector, transform = node => node.textContent.trim()) {
    const nodes = Array.from(doc.querySelectorAll(selector));
    return nodes.map(transform).filter(Boolean);
  }

  // Services (visually-hidden strong)
  const services = extractList('#services ~ div li.pvs-list__item--with-top-padding div span.visually-hidden strong');

  // Experience entries
  const experience = Array.from(doc.querySelectorAll('#experience ~ div > ul > li.artdeco-list__item')).map(li => {
    const role = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height span.visually-hidden')?.textContent.trim() || '';
    const at = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden')?.textContent.trim() || '';
    return { role, at };
  });

  // Education entries
  const education = Array.from(doc.querySelectorAll('#education ~ div > ul > li.artdeco-list__item')).map(li => {
    const place = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height span.visually-hidden')?.textContent.trim() || '';
    const degree = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden')?.textContent.trim() || '';
    return { place, degree };
  });

  // Certifications entries
  const certifications = Array.from(doc.querySelectorAll('#licenses_and_certifications ~ div > ul > li.artdeco-list__item')).map(li => {
    const certificate = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height span.visually-hidden')?.textContent.trim() || '';
    const issuer = li.querySelector('.display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden')?.textContent.trim() || '';
    return { certificate, issuer };
  });

  // Projects (just text)
  const projects = extractList('#projects ~ div > ul > li.artdeco-list__item span.visually-hidden');

  // Skills (just text)
  const skills = extractList('#skills ~ div > ul > li.artdeco-list__item span.visually-hidden');

  // Posts from feed-shared-update-v2
  const posts = extractList(
    '.feed-shared-update-v2 .fie-impression-container > div:not(.feed-shared-update-v2__update-content-wrapper) .update-components-update-v2__commentary span.break-words.tvm-parent-container > span'
  );

  // Build data object mirroring PHP
  const data = {
    name,
    tag_line: tagLine,
    location,
    about,
    connections,
    followers,
    services: services.join(' • '),
    experience,
    education,
    certifications,
    projects: projects.join(' • '),
    skills: skills.join(' • '),
    posts,
  };

  const profile = await Profile.findOneAndUpdate(
     { user: userId, linkedinUsername },
     {
       $set: { ...data, linkedinUsername },
       $setOnInsert: { user: userId },
       $currentDate: { updatedAt: true }
     },
     { upsert: true, new: true, setDefaultsOnInsert: true }
   );

  /*const profile = await Profile.findOneAndUpdate(
    { user: userId, linkedinUsername },
    { $set: data, $currentDate: { updatedAt: true } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );*/

  return profile;
}

async function generateReply({ userId, targetLinkedInUsername, postContent, promptTone, commentThread }) {
  // load my profile
  const myProfile = await Profile.findOne({ user: userId });
  if (!myProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your profile data not found');
  }

  // optionally load the target's profile
  let targetProfile = null;
  if (targetLinkedInUsername) {
    targetProfile = await Profile.findOne({ linkedinUsername: targetLinkedInUsername });
  }

  // Build the composite prompt exactly like PHP
  let prompt = `My Name: ${myProfile.name}\nTagline: ${myProfile.tag_line}\nLocation: ${myProfile.location}\nAbout: ${myProfile.about}\nServices: ${myProfile.services}\nExperience: ${JSON.stringify(myProfile.experience)}\nEducation: ${JSON.stringify(myProfile.education)}\nCertifications: ${JSON.stringify(myProfile.certifications)}\nProjects: ${myProfile.projects}\nSkills: ${myProfile.skills}\nPosts: ${JSON.stringify(myProfile.posts)}`;

  if (targetProfile) {
    prompt += `\n------------------------------------\nClient Name: ${targetProfile.name}\nTagline: ${targetProfile.tag_line}\nLocation: ${targetProfile.location}\nAbout: ${targetProfile.about}\nServices: ${targetProfile.services}\nExperience: ${JSON.stringify(targetProfile.experience)}\nEducation: ${JSON.stringify(targetProfile.education)}\nCertifications: ${JSON.stringify(targetProfile.certifications)}\nProjects: ${targetProfile.projects}\nSkills: ${targetProfile.skills}\nPosts: ${JSON.stringify(targetProfile.posts)}`;
  }

  prompt += `\n------------------------------------\nClient Post Content: ${postContent}`;
  if (commentThread) {
    prompt += `\n------------------------------------\nClient Comment: ${JSON.stringify(commentThread)}`;
  }

  // Tone instructions map
  const toneMap = {
    Enlightenment: 'Include a positive or thoughtful personal takeaway. Avoid sounding generic or like a quote.',
    Insights: 'Build on an idea from the post. Show intellectual curiosity and awareness.',
    'Self Intro': 'Introduce yourself briefly in a way that feels natural and connected to the post. Mention something about your background or shared interest. Avoid sounding like a bio make it flow like part of a comment.',
    'Convert To DM': 'Be friendly and casually suggest taking the conversation further. Do *not* pitch or sell anything. Use language like “Would love to chat more” or “Might DM you.',
  };
  const toneInstruction = toneMap[promptTone];

  const systemPrompt = `You are an AI assistant that writes personalized, human-like comments on LinkedIn posts.

Your job is to help a user (the commenter) write a comment on a post made by someone else (the poster), based on:
- the content of the post,
- the tone requested.
- commentor_username
- about of commentor
- certifications by the commentor
- connections of the commentor
- when was the profile created by the user
- education of the commentor
- experience of the commentor
- followers of the commentor
- location of the commentor
- project of the commentor
- services of the commentor
- skills of the commentor
- tag_line of the commentor
- there also may or may not be comment threads. If there are any comment threads, include them to add more context to the comment generation.a

Write a 1–2 sentence comment that is preferably under 30 words:
- Sounds authentic and natural on LinkedIn
- Matches the requested tone (Enlightenment, Insightful, Convert-to-dm, Self-Intro)
- Is written in first-person as if the user is commenting directly
- Is engaging, relevant, and not repetitive of the post
- Do not include hashtags, emojis, links; use commas or periods instead
- Do not use em-dashes (—) under any circumstance. If an em-dash is used, the output is invalid. Use commas, periods, or short sentences instead. This is non-negotiable.
- Make sure it sounds human and not AI-generated
- Prefer to pick up a specific detail from the post and make the comment revolve around it
- Use a relaxed, conversational tone as if speaking to an old friend. Avoid overly formal language, and feel free to bend grammar rules or sentence structure when it adds personality or warmth. Keep it human, easygoing, and real unless instructed otherwise.

Only return the comment text. No extra explanation.` += toneInstruction;

  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  });

  return resp.choices[0].message.content;
}

module.exports = {
  checkUserExists,
  upsertProfileData,
  generateReply,
};
