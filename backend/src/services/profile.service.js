const Profile = require('../models/profile');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status').default;
const { JSDOM } = require('jsdom');
const OpenAI = require('openai');
const config = require('../config/config');

const openai = new OpenAI({ apiKey: config.openai.apiKey });

console.log("🤖 [profile.service] config.openai.apiKey = ", config.openai.apiKey);

async function checkUserExists(userId, linkedinUsername) {
  const exists = await Profile.exists({ user: userId, linkedinUsername });
  return Boolean(exists);
}

async function upsertProfileData(/*userId,*/ linkedinUsername, html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Basic text selectors
  const name = doc.querySelector('.top-card-background-hero-image + .ph5 h1')?.textContent.trim() || '';
  const tagLine = doc.querySelector('.top-card-background-hero-image + .ph5 div.text-body-medium.break-words')?.textContent.trim() || '';
  const location = doc.querySelector('.top-card-background-hero-image + .ph5 span.text-body-small.inline.break-words')?.textContent.trim() || '';
  const about = doc.querySelector('#about ~ .display-flex.ph5.pv3 span[aria-hidden]')?.textContent.trim() || '';

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
    services: services.join(' • '),
    experience,
    education,
    certifications,
    projects: projects.join(' • '),
    skills: skills.join(' • '),
    posts,
  };

  const profile = await Profile.findOneAndUpdate(
    { /*user: userId,*/ linkedinUsername },
    { $set: data, $currentDate: { updatedAt: true } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return profile;
}

/**
 * Generate an AI-powered reply using both your profile & target’s profile.
 */
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
    Enlightenment: 'Try to praise the client in a natural and friendly tone',
    Services: 'Also try to include my services if they are relevant to post content',
    Insights: 'Try to praise the client naturally and provide suggestions according to the post content',
    'Self Intro': 'Introduce yourself to the client in a natural way using my previous data',
    'Self Intro 2': 'Create a comment introducing myself to the client using his data and my data to appear more likeable in a natural way',
    'Convert to DM': 'Write a reply to convert the conversation into DM',
    Test: 'Using client data and client post content to create a very natural and human-like comment to praise him',
  };
  const toneInstruction = toneMap[promptTone] || toneMap.Test;

  const systemPrompt = commentThread
    ? `You generate relevant reply to the last child comment with my data, previous comments and post content as context. Do not include any other text or code in your response—only reply (also don’t include any hashtags). ${toneInstruction}.`
    : `You generate relevant comment based on user data, client data and post content. Do not include any other text or code in your response—only comment (also don’t include any hashtags). ${toneInstruction}.`;

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
