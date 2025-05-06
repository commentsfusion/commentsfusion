// utils/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function signupUser({ name, email, phone, password }) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, password }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || "Signup failed");
  return body;
}

export async function loginUser({ email, password }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Login failed");
  }
  return body;
}
