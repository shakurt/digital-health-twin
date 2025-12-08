"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.session === true) {
        router.push("/dashboard");
        return;
      }
    }
  }, [router]);

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    // Check if user exists in localStorage
    const existingUser = localStorage.getItem("user");
    if (!existingUser) {
      setError("No account found. Please sign up instead.");
      setIsLoading(false);
      return;
    }

    // Verify email matches
    const userData = JSON.parse(existingUser);
    if (userData.email !== email) {
      setError("No account found with this email. Please sign up instead.");
      setIsLoading(false);
      return;
    }

    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store data in sessionStorage for OTP verification
    sessionStorage.setItem(
      "authData",
      JSON.stringify({
        email: email,
        type: "signin",
      })
    );

    setIsLoading(false);
    router.push("/verify-otp");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
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

        {/* Sign In Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 card-glow animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-bg border border-dark-border rounded-full text-sm mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-gray-400">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text-animated">Sign In</span>
            </h1>
            <p className="text-gray-400">Continue your health journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  error ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                placeholder="Enter your email"
              />
              {error && (
                <p className="text-red-500 text-sm animate-fade-in">{error}</p>
              )}
            </div>

            {/* Info Message */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 animate-fade-in">
              <p className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-primary text-lg">ℹ️</span>
                <span>
                  We&apos;ll send a verification code to your email to sign you
                  in securely.
                </span>
              </p>
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
                    Send Verification Code
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
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300 font-medium group"
            >
              Create New Account
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Secure authentication with one-time password (OTP)
        </p>
      </div>
    </div>
  );
}
