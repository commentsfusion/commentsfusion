"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signupUser } from "../../app/utils/api";

const testimonials = [
  {
    name: "Deen Colemen",
    designation: "CEO, Deen Colemen exp reality",
    rating: 4,
    quote:
      "Comments Fusion has completely transformed the way I engage with online discussions! The AI-driven insights and smart commenting features make interactions more meaningful and effortless. It’s a game-changer for anyone looking to boost engagement and streamline communication. Highly recommend!",
  },
  {
    name: "Mehmat",
    designation: "CEO, Homera Real State",
    rating: 5,
    quote:
      "Comments Fusion has made online discussions more seamless and engaging. The AI-powered suggestions save me time while keeping my responses relevant and thoughtful. It’s a must-have tool for anyone looking to enhance their commenting experience!",
  },
  {
    name: "Jay Limbachia",
    designation: "Director, Kilnstone property group",
    rating: 4,
    quote:
      "Comments Fusion is an absolute game-changer! It makes engaging in discussions so much easier and more insightful. The AI-driven suggestions help me craft better responses, and the platform is smooth and user-friendly. Definitely a must-have for anyone looking to enhance their online interactions!",
  },
  {
    name: "Aarij Ahmed",
    designation: "Director, ADW Development Limited",
    rating: 3,
    quote:
      "Comments Fusion makes commenting online so much easier. The AI suggestions help me write better replies in seconds. It keeps conversations flowing and saves me time. I’d recommend it to anyone who wants smoother, more engaging discussions!",
  },
];

export default function AuthPage() {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const inputRefs = useRef([]);
  const { name, designation, rating, quote } = testimonials[idx];

  //animations in the testinomials
  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const variants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  const Stars = ({ count }) => (
    <div className="flex space-x-1 m-0 p-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < count ? "text-yellow-400" : "text-white/50"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    //TODO validate if the email is already registered in the system
    setMode("verify");
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    // Check or validate the code here
    // ...
    alert("Verification successful (placeholder)!");

    setMode("login");
  };

  //
  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // (Optional) Handle backspace to move focus to previous input if needed
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // handle input changes
  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
    setErrors((errs) => ({ ...errs, [e.target.name]: undefined }));
  };

  const validate = () => {
    const errs = {};
  
    if (!formData.username.trim()) {
      errs.username = "Username is required";
    } else if (/\s/.test(formData.username)) {
      errs.username = "Username must not contain spaces";
    }
  
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email address";
    }
  
    if (!formData.phone) {
      errs.phone = "Phone is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      errs.phone = "Phone must contain only numbers";
    } else if (formData.phone.length < 10) {
      errs.phone = "Phone number must be at least 10 digits";
    }
  
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
  
    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = "Passwords do not match";
    }
  
    return errs;
  };  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { token, user } = await signupUser({
        name: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      window.localStorage.setItem("token", token);

      router.push("/dashboard");
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="relative min-h-screen flex bg-[linear-gradient(to_bottom,#000000,#33C6F4)]">
      {/* Left panel */}
      <div className="w-1/2 flex flex-col justify-start px-12 py-8 text-white">
        {/* Logo & headline */}
        <div className="space-y-8">
          <div className="w-20 h-20 relative mx-auto">
            <Image
              src="/images/chatBotIcon.svg"
              alt="Chatbot Icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 className="text-4xl font-bold leading-snug text-center">
            <span>Transform Conversations with</span>
            <span className="block text-[#33C6F4]">AI-Powered Smart</span>
            <span className="block text-[#33C6F4]">Comments!</span>
          </h1>
        </div>

        {/* Testimonial */}
        <div className="flex-1 flex items-center justify-center my-8 relative">
          <button
            onClick={prev}
            className="absolute left-0 text-white text-3xl hover:opacity-80"
          >
            ‹
          </button>

          <div className="relative w-full max-w-2xl min-h-[200px] mx-8">
            <AnimatePresence initial={false} exitBeforeEnter>
              <motion.div
                key={idx}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="
                  absolute inset-0
                  border border-white rounded-lg
                  p-6 bg-white/10
                  flex flex-col gap-4
                "
              >
                {/* Header: name + stars */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="text-sm opacity-80">{designation}</p>
                  </div>
                  <Stars count={rating} />
                </div>

                {/* Quote */}
                <div>
                  <hr className="border-white/50 mb-1" />
                  <p className="text-sm leading-relaxed">{quote}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="absolute right-0 text-white text-3xl hover:opacity-80"
          >
            ›
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="w-px bg-white/20"></div>

      {/* Right panel */}
      <div className="w-5/14 flex items-center justify-center px-12 py-8">
        <div className="flex w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-white">
          <div className="flex-1 space-y-6">
            {mode === "login" && (
              <>
                <h2 className="text-3xl font-semibold text-center">Log In</h2>
                <p className="text-sm text-center">Please enter your details</p>
                <form className="space-y-4">
                  {[
                    { label: "Username / Email", type: "text" },
                    { label: "Password", type: "password", forgot: true },
                  ].map((field, i) => (
                    <div key={i} className="space-y-1">
                      <label className="block text-sm">{field.label}</label>
                      <input
                        type={field.type}
                        className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      {field.forgot && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setMode("forgot")}
                            className="text-xs hover:underline cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
                  >
                    Confirm
                  </button>
                </form>
                <div className="text-center text-sm">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="underline"
                  >
                    Sign Up
                  </button>
                </div>
                <button className="w-full py-2 flex items-center justify-center space-x-2 border border-white rounded-full mt-4">
                  <Image
                    src="/images/authPage/googleIcon.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Sign In with Google</span>
                </button>
              </>
            )}

            {mode === "signup" && (
              <>
                <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
                <p className="text-sm text-center">Please enter your details</p>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  {errors.general && (
                    <p className="text-red-400 text-center">{errors.general}</p>
                  )}

                  <div>
                    <label className="block text-sm">Username</label>
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.username && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm">Password</label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
                  >
                    Register
                  </button>
                </form>

                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="underline"
                  >
                    Log In
                  </button>
                </p>
              </>
            )}

            {mode === "forgot" && (
              <>
                <h2 className="text-3xl font-semibold text-center">
                  Forgot Password
                </h2>
                <p className="text-sm text-center">Please enter your details</p>
                <form className="space-y-4 onSubmit={handleForgotSubmit}">
                  <div className="space-y-1">
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={() => setMode("verify")}
                    className="w-full py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
                  >
                    Confirm
                  </button>
                </form>
                <div className="text-center text-sm">
                  Back to Login?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="underline"
                  >
                    Log In
                  </button>
                </div>
              </>
            )}

            {mode === "verify" && (
              <>
                <h2 className="text-3xl font-semibold text-center">
                  Verification Code
                </h2>
                <p className="text-center text-sm mt-2">
                  Check your Email for Verification Code!
                </p>

                <form className="space-y-4" onSubmit={handleVerifySubmit}>
                  <div className="flex items-center justify-center mt-4 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 text-center rounded-md border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
                  >
                    Confirm
                  </button>

                  <div className="text-center text-sm mt-4">
                    Didn’t receive the code?{" "}
                    <button
                      type="button"
                      className="underline"
                      onClick={() => {
                        // Logic to resend the code
                        alert("Code resent (placeholder)!");
                      }}
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
        {/* Mascot section */}
        <div className="absolute bottom-20 right-20 w-32 h-32">
          <div className="w-50 h-50 relative">
            <Image
              src="/images/authPage/mascot.svg"
              alt="Mascot"
              fill
              style={{ objectFit: "contain" }}
              className="animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
