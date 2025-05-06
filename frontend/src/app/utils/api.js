// utils/api.js

export async function signupUser({ name, email, phone, password }) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
  
    const body = await res.json();
    if (!res.ok) {
      // backend will typically send { message: "..." }
      throw new Error(body.message || "Signup failed");
    }
  
    // return the token & user object for your caller to handle
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
  