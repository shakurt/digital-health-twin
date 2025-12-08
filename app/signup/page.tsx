"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user_")) {
        const userData = localStorage.getItem(key);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.session === true) {
            router.push("/dashboard");
            return;
          }
        }
      }
    }
  }, [router]);

  const validateForm = () => {
    const newErrors = { username: "", email: "" };
    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Check if email already exists in localStorage
    const existingUser = localStorage.getItem(`user_${formData.email}`);
    if (existingUser) {
      setErrors({
        ...errors,
        email:
          "You already have an account with this email. Please sign in instead.",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store data in sessionStorage for OTP verification
    sessionStorage.setItem(
      "authData",
      JSON.stringify({
        email: formData.email,
        username: formData.username,
        type: "signup",
      })
    );

    setIsLoading(false);
    router.push("/verify-otp");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute top-60 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-40 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          Back to Home
        </Link>

        {/* Sign Up Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 card-glow animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-bg border border-dark-border rounded-full text-sm mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-gray-400">Create Your Account</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text-animated">Sign Up</span>
            </h1>
            <p className="text-gray-400">
              Start your digital health journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.username ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.email ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-animated rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Next
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-card text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300 font-medium group"
            >
              Sign In Instead
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
