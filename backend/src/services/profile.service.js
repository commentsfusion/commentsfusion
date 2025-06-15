// src/services/profile.service.js
const Profile = require('../models/profile');
const User = require('../models/user');
const { JSDOM } = require('jsdom');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status').default;
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkUserExists(userId, linkedinUsername) {
  const exists = await Profile.exists({ user: userId, linkedinUsername });
  return Boolean(exists);
}

/**
 * Parse the HTML into fields and upsert into Mongo.
 */
async function upsertProfileData(userId, linkedinUsername, html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // replicate your PHP crawls:
  const name = doc.querySelector('.top-card-background-hero-image + .ph5 h1')?.textContent?.trim() || '';
  const tag_line = doc.querySelector('.top-card-background-hero-image + .ph5 div.text-body-medium')?.textContent?.trim() || '';
  // …do the rest: location, about, services, experience, etc…

  const data = { name, tag_line /*, location, about…*/ };
  
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    {
      $set: { linkedinUsername, ...data },
      $currentDate: { updatedAt: true },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return profile;
}

/**
 * Given your own profile + the target’s, call OpenAI for a “smart comment.”
 */
async function generateReply({ userId, targetLinkedInUsername, postContent, promptTone, commentThread }) {
  // load my profile
  const myProfile = await Profile.findOne({ user: userId });
  if (!myProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your profile data not found');
  }

  // load target profile if provided
  let targetProfile = null;
  if (targetLinkedInUsername) {
    targetProfile = await Profile.findOne({ linkedinUsername: targetLinkedInUsername });
  }

  // build system+user prompts exactly like your PHP does…
  let systemPrompt = `My Name: ${myProfile.name}\nTagline: ${myProfile.tag_line}\n…`;
  if (targetProfile) {
    systemPrompt += `\nClient Name: ${targetProfile.name}\n…`;
  }
  systemPrompt += `\nClient Post Content: ${postContent}`;
  if (commentThread) {
    systemPrompt += `\nClient Comment: ${JSON.stringify(commentThread)}`;
  }

  const toneMap = {
    Enlightenment: 'Try to praise…',
    Services: 'Also try to include my services…',
    Insights: '…',
    'Self Intro': '…',
    'Convert to DM': '…',
  };
  const toneInstruction = toneMap[promptTone] || toneMap.Test;

  const gptPrompt = commentThread
    ? `You generate relevant reply to the last child comment… ${toneInstruction}.`
    : `You generate relevant comment… ${toneInstruction}.`;

  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: gptPrompt },
      { role: 'user', content: systemPrompt },
    ],
    temperature: 0.7,
  });

  return resp.choices[0].message.content;
}

async function getProfileStatus(linkedinUsername) {
  // 1) Do we have *any* document for that username?
  const profile = await Profile.findOne({ linkedinUsername });

  if (!profile) {
    return { exists: false };
  }

  // 2) We have a doc: decide if we should re‑scrape
  // e.g. consider data stale if updatedAt is more than 24h ago:
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const age = now - profile.updatedAt.getTime();
  const needsRefresh = age > ONE_DAY;

  return {
    exists:       true,
    hasData:      profile.updatedAt != null,  // always true if exists
    needsRefresh,                            // true if stale
    updatedAt:    profile.updatedAt,
  };
}

// call this when you actually _use_ the profile data
async function markProfileFetched(linkedinUsername) {
  await Profile.findOneAndUpdate(
    { linkedinUsername },
    { lastFetchedAt: new Date() }
  );
}

// your upsert logic should also update profile.updatedAt automatically
async function upsertProfileData(userId, linkedinUsername, data) {
  return Profile.findOneAndUpdate(
    { user: userId },
    { 
      $set: { linkedinUsername, ...data },
      $currentDate: { updatedAt: true },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

module.exports = {
  getProfileStatus,
  markProfileFetched,
  upsertProfileData,
};


module.exports = {
  checkUserExists,
  upsertProfileData,
  generateReply,
};
