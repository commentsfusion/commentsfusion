const Profile = require("../models/profile");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status").default;
const { JSDOM } = require("jsdom");
const OpenAI = require("openai");
const config = require("../config/config");

const openai = new OpenAI({ apiKey: config.openai.apiKey });

async function checkUserExists(userId, linkedinUsername) {
  const exists = await Profile.exists({ user: userId, linkedinUsername });
  return Boolean(exists);
}

async function upsertProfileData(userId, linkedinUsername, html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const name =
    doc
      .querySelector(".top-card-background-hero-image + .ph5 h1")
      ?.textContent.trim() || "";
  const tagLine =
    doc
      .querySelector(
        ".top-card-background-hero-image + .ph5 div.text-body-medium.break-words"
      )
      ?.textContent.trim() || "";
  const location =
    doc
      .querySelector(
        ".top-card-background-hero-image + .ph5 span.text-body-small.inline.break-words"
      )
      ?.textContent.trim() || "";
  const about =
    doc
      .querySelector("#about ~ .display-flex.ph5.pv3 span[aria-hidden]")
      ?.textContent.trim() || "";

  const rawConn = (() => {
    const link = doc.querySelector(
      'a[href*="/search/results/people/?connectionOf"]'
    );
    if (link) return link.textContent.trim();
    const lis = doc.querySelectorAll(".pv-top-card--list > li");
    return lis[1]?.textContent.trim() || "";
  })();

  const rawFoll = (() => {
    const li = doc.querySelector(".pv-top-card--list-bullet li");
    if (li) return li.textContent.trim();
    const span = Array.from(doc.querySelectorAll("span")).find((el) =>
      /followers$/i.test(el.textContent)
    );
    return span?.textContent.trim() || "";
  })();

  const toNumber = (str) => {
    const digits = str.replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const connections = toNumber(rawConn);
  const followers = toNumber(rawFoll);

  function extractList(
    selector,
    transform = (node) => node.textContent.trim()
  ) {
    const nodes = Array.from(doc.querySelectorAll(selector));
    return nodes.map(transform).filter(Boolean);
  }

  // Services
  const services = extractList(
    "#services ~ div li.pvs-list__item--with-top-padding div span.visually-hidden strong"
  );

  // Experience entries
  const experience = Array.from(
    doc.querySelectorAll("#experience ~ div > ul > li.artdeco-list__item")
  ).map((li) => {
    const role =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height span.visually-hidden"
        )
        ?.textContent.trim() || "";
    const at =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden"
        )
        ?.textContent.trim() || "";
    return { role, at };
  });

  // Education entries
  const education = Array.from(
    doc.querySelectorAll("#education ~ div > ul > li.artdeco-list__item")
  ).map((li) => {
    const place =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height span.visually-hidden"
        )
        ?.textContent.trim() || "";
    const degree =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden"
        )
        ?.textContent.trim() || "";
    return { place, degree };
  });

  // Certifications entries
  const certifications = Array.from(
    doc.querySelectorAll(
      "#licenses_and_certifications ~ div > ul > li.artdeco-list__item"
    )
  ).map((li) => {
    const certificate =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height span.visually-hidden"
        )
        ?.textContent.trim() || "";
    const issuer =
      li
        .querySelector(
          ".display-flex.flex-wrap.align-items-center.full-height + span.t-14.t-normal span.visually-hidden"
        )
        ?.textContent.trim() || "";
    return { certificate, issuer };
  });

  // Projects (just text)
  const projects = extractList(
    "#projects ~ div > ul > li.artdeco-list__item span.visually-hidden"
  );

  // Skills (just text)
  const skills = extractList(
    "#skills ~ div > ul > li.artdeco-list__item span.visually-hidden"
  );

  // Build data object mirroring PHP
  const data = {
    name,
    tag_line: tagLine,
    location,
    about,
    connections,
    followers,
    services: services.join(" • "),
    experience,
    education,
    certifications,
    projects: projects.join(" • "),
    skills: skills.join(" • "),
  };
  const profile = await Profile.findOneAndUpdate(
    { user: userId, linkedinUsername },
    {
      $set: { ...data, linkedinUsername },
      $setOnInsert: { user: userId },
      $currentDate: { updatedAt: true },
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

async function fetchExactConnections(userID) {
  try {
    const url = `https://www.linkedin.com/search/results/people/?connectionOf=${userID}&connectionLevel=F`;

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Csrf-Token": "ajax",
        "X-RestLi-Protocol-Version": "2.0.0",
        Accept: "application/json",
      },
    });
    if (!resp.ok) {
      console.warn("fetchExactConnections: network error", resp.status);
      return 0;
    }
    const html = await resp.text();

    const dom = new JSDOM(html);
    const parser = new dom.window.DOMParser();

    const doc = parser.parseFromString(html, "text/html");

    let totalEl = doc.querySelector(
      "h3.search-results-container__total-results"
    );
    if (!totalEl) {
      totalEl = doc.querySelector("span.search-results-container__total");
    }
    if (!totalEl) {
      console.warn("fetchExactConnections: could not find total element");
      return 0;
    }

    const text = totalEl.textContent || "";
    const m = text.match(/([\d,]+)/);
    if (!m) {
      console.warn("fetchExactConnections: no digits in text:", text);
      return 0;
    }
    const digits = m[1].replace(/,/g, "");
    return parseInt(digits, 10);
  } catch (err) {
    console.error("fetchExactConnections error:", err);
    return 0;
  }
}

(async () => {
  const myUserID = "ayesha-nazneen-690283271";
  const exactCount = await fetchExactConnections(myUserID);
  console.log("Exact connections:", exactCount);
})();

async function generateReply({
  userId,
  targetLinkedInUsername,
  postContent,
  promptTone,
  commentThread,
}) {
  const myProfile = await Profile.findOne({ user: userId });
  if (!myProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, "Your profile data not found");
  }

  let targetProfile = null;
  if (targetLinkedInUsername) {
    targetProfile = await Profile.findOne({
      linkedinUsername: targetLinkedInUsername,
    });
  }

  let prompt = `My Name: ${myProfile.name}\nTagline: ${
    myProfile.tag_line
  }\nLocation: ${myProfile.location}\nAbout: ${myProfile.about}\nServices: ${
    myProfile.services
  }\nExperience: ${JSON.stringify(
    myProfile.experience
  )}\nEducation: ${JSON.stringify(
    myProfile.education
  )}\nCertifications: ${JSON.stringify(myProfile.certifications)}\nProjects: ${
    myProfile.projects
  }\nSkills: ${myProfile.skills}\nPosts: ${JSON.stringify(myProfile.posts)}`;

  if (targetProfile) {
    prompt += `\n------------------------------------\nClient Name: ${
      targetProfile.name
    }\nTagline: ${targetProfile.tag_line}\nLocation: ${
      targetProfile.location
    }\nAbout: ${targetProfile.about}\nServices: ${
      targetProfile.services
    }\nExperience: ${JSON.stringify(
      targetProfile.experience
    )}\nEducation: ${JSON.stringify(
      targetProfile.education
    )}\nCertifications: ${JSON.stringify(
      targetProfile.certifications
    )}\nProjects: ${targetProfile.projects}\nSkills: ${
      targetProfile.skills
    }\nPosts: ${JSON.stringify(targetProfile.posts)}`;
  }

  prompt += `\n------------------------------------\nClient Post Content: ${postContent}`;
  if (commentThread) {
    prompt += `\n------------------------------------\nClient Comment: ${JSON.stringify(
      commentThread
    )}`;
  }

  // Tone instructions map
  const toneMap = {
    Enlightenment: "Try to praise the client in a natural and friendly tone",
    Services:
      "Also try to include my services if they are relevant to post content",
    Insights:
      "Try to praise the client naturally and provide suggestions according to the post content",
    "Self Intro":
      "Introduce yourself to the client in a natural way using my previous data",
    "Self Intro 2":
      "Create a comment introducing myself to the client using his data and my data to appear more likeable in a natural way",
    "Convert to DM": "Write a reply to convert the conversation into DM",
    Test: "Using client data and client post content to create a very natural and human-like comment to praise him",
  };
  const toneInstruction = toneMap[promptTone] || toneMap.Test;

  const systemPrompt = commentThread
    ? `You generate relevant reply to the last child comment with my data, previous comments and post content as context. Do not include any other text or code in your response—only reply (also don’t include any hashtags). ${toneInstruction}.`
    : `You generate relevant comment based on user data, client data and post content. Do not include any other text or code in your response—only comment (also don’t include any hashtags). ${toneInstruction}.`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
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
