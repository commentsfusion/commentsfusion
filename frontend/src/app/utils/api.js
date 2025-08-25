// utils/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 5;
export const MAX_LIMIT = 100;

export async function sendCode(data) {
  const res = await fetch(`${API_BASE}/api/auth/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || "Failed to send code");
  return body;
}

export async function verifySignup({ email, code }) {
  const res = await fetch(`${API_BASE}/api/auth/verify-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || "Verification failed");
  return body;
}

export async function loginUser({
  email,
  password,
  recaptchaToken,
  recaptchaV2Token,
}) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, recaptchaToken, recaptchaV2Token }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Login failed");
  }
  return body;
}

export async function requestPasswordReset(email) {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body;
}

export async function verifyPasswordOTP(email, code) {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body;
}

export async function resetPassword(
  email,
  code,
  newPassword,
  confirmNewPassword
) {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword, confirmNewPassword }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body;
}

export async function checkLinkedInConnection() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return { isConnected: false };
    }
    
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    
    const res = await fetch(`${API_BASE}/api/profile/check-linkedin`, {
      method: "GET",
      credentials: "include",
      headers: headers,
    });
    
    if (!res.ok) {
      // If API doesn't exist yet, we'll assume not connected
      return { isConnected: false };
    }
    
    const data = await res.json();
    
    // Update local storage with the latest connection status
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        userInfo.isLinkedInConnected = data.isConnected;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } catch (err) {
        console.error("Error updating user info:", err);
      }
    }
    
    return data;
  } catch (err) {
    console.error("Error checking LinkedIn connection:", err);
    return { isConnected: false };
  }
}

export async function fetchUserDetails() {
  try {
    const token = localStorage.getItem("authToken");
    console.log('Token from localStorage:', token ? 'Token exists' : 'No token found');
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'N/A');
    
    const headers = {
      "Content-Type": "application/json"
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: headers,
    });

    if (!res.ok) {
      console.error('Response status:', res.status);
      console.error('Response headers:', res.headers);
      throw new Error("Failed to fetch user details");
    }

    const data = await res.json();
    console.log('Successfully fetched user data:', data);
    return data;
  } catch (error) {
    console.error('Full error details:', error);
    throw new Error(`Error fetching user details: ${error.message}`);
  }
}

export async function fetchGoogleUserDetails() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/google-user`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Google user details");
    }

    const data = await res.json();
    console.log('Successfully fetched Google user data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Google user details:', error);
    throw new Error(`Error fetching Google user details: ${error.message}`);
  }
}

export async function getDashboardMetrics(period = "7d") {
  const token = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json"
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${API_BASE}/api/dashboard/metrics?period=${period}`,
    {
      credentials: "include",
      headers: headers,
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch metrics: ${res.status} ${err}`);
  }
  return await res.json();
}

export async function getDashboardTargets(
  period = "15d",
  { page = 1, limit = 10 } = {}
) {
  const params = new URLSearchParams({
    period,
    page: String(page),
    limit: String(limit),
  });
  const res = await fetch(
    `${API_BASE}/api/dashboard/targets?${params.toString()}`,
    {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("Response", res)
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch targets: ${res.status} ${err}`);
  }
  return res.json();
}

function buildParams(params = {}) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    p.set(k, String(v));
  }
  return p.toString();
}

function clampLimit(limit) {
  const l = Number(limit) || DEFAULT_LIMIT;
  if (l <= 0) return DEFAULT_LIMIT;
  return Math.min(l, MAX_LIMIT);
}

async function handleResponse(res) {
  if (res.ok) {
    return res.json().catch(() => null);
  }
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* ignore */
  }
  const message =
    (body && (body.message || body.error)) ||
    `Request failed with status ${res.status}`;
  const error = new Error(message);
  error.status = res.status;
  error.body = body;
  throw error;
}

export async function fetchComments(options = {}) {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    status,
    account,
    from,
    to,
    sort,
    signal,
    credentials = "include",
  } = options;

  const safeLimit = clampLimit(limit);

  const params = {
    page: Number(page) || DEFAULT_PAGE,
    limit: safeLimit,
    status,
    account,
    from,
    to,
    search,
    sort,
  };

  const token = localStorage.getItem("authToken");
  const headers = {};
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const query = buildParams(params);
  const url = `${API_BASE}/api/comment/list-comments${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    credentials,
    headers,
    signal,
  });

  return handleResponse(res);
}

export const sendContactMessage = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/api/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || "Failed to send message");
    }

    const responseBody = await res.json();
    return responseBody;
  } catch (error) {
    console.error("Error in sending message:", error);
    alert(`Error: ${error.message}`);
    throw error;
  }
};
