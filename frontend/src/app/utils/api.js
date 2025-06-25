// utils/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

export async function loginUser({ email, password, recaptchaToken, recaptchaV2Token }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, recaptchaToken, recaptchaV2Token}),
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

export async function resetPassword(email, code, newPassword, confirmNewPassword) {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword, confirmNewPassword }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body;
}