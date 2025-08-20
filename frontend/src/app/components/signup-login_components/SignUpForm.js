import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_V2_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
export default function SignupForm({
  signupData,
  signupErrors,
  loading,
  captchaRequired,
  onSignupChange,
  onSignupSubmit,
  onSignupV2Submit,
  onSwitchMode,
  signupUsernameRef,
  recaptchaV2Ref,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
      <p className="text-sm text-center">Please enter your details</p>

      <form onSubmit={onSignupSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Username</label>
          <input
            name="username"
            value={signupData.username}
            ref={signupUsernameRef}
            onChange={onSignupChange}
            className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {signupErrors.username && (
            <p className="text-red-400 text-xs mt-1">{signupErrors.username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={signupData.email}
            onChange={onSignupChange}
            className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {signupErrors.email && (
            <p className="text-red-400 text-xs mt-1">{signupErrors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input
            name="phone"
            type="tel"
            value={signupData.phone}
            onChange={onSignupChange}
            className="w-full h-10 px-3 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {signupErrors.phone && (
            <p className="text-red-400 text-xs mt-1">{signupErrors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={signupData.password}
              onChange={onSignupChange}
              className="w-full h-10 px-3 pr-10 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.121 14.121l1.415 1.415M14.121 14.121L9.878 9.878m4.243 4.243L8.464 8.464"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {signupErrors.password && (
            <p className="text-red-400 text-xs mt-1">{signupErrors.password}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={signupData.confirmPassword}
              onChange={onSignupChange}
              className="w-full h-10 px-3 pr-10 rounded-full border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
            >
              {showConfirmPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.121 14.121l1.415 1.415M14.121 14.121L9.878 9.878m4.243 4.243L8.464 8.464"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {signupErrors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {signupErrors.confirmPassword}
            </p>
          )}
        </div>
        <motion.button
          type="submit"
          className={`
          w-full py-3 mt-4 rounded-full
          ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-black hover:opacity-90"
          }
          text-white font-medium flex justify-center items-center transition
        `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? "Loading…" : "Register"}
        </motion.button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button onClick={() => onSwitchMode("login")} className="underline">
          Log In
        </button>
      </p>
      {captchaRequired && (
        <div className="mt-4 flex flex-col items-center justify-center text-center">
          <p className="mb-2">Please complete this CAPTCHA to continue:</p>
          <ReCAPTCHA
            ref={recaptchaV2Ref}
            sitekey={RECAPTCHA_V2_SITE_KEY}
            size="normal"
            onChange={onSignupV2Submit}
          />
        </div>
      )}
    </>
  );
}

SignupForm.propTypes = {
  signupData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  signupErrors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  captchaRequired: PropTypes.bool.isRequired,
  onSignupChange: PropTypes.func.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
  onSignupV2Submit: PropTypes.func,
  onSwitchMode: PropTypes.func.isRequired,
  signupUsernameRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
