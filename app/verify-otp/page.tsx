"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize authData directly from sessionStorage
  const getAuthData = () => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("authData");
      if (storedData) {
        return JSON.parse(storedData);
      }
    }
    return null;
  };

  const [authData] = useState<{
    email: string;
    username?: string;
    type: "signin" | "signup";
  } | null>(getAuthData);

  useEffect(() => {
    // Redirect if no auth data
    if (!authData) {
      router.push("/signin");
    }
  }, [router, authData]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For prototype, accept any 6-digit code
    // In production, verify with backend
    if (otpString.length === 6) {
      // Store user as authenticated in sessionStorage and localStorage
      if (authData) {
        let userData: Record<string, unknown> = {
          email: authData.email,
          username: authData.username || authData.email.split("@")[0],
        };

        // For signin, load existing user data from localStorage
        if (authData.type === "signin") {
          const existingUser = localStorage.getItem(`user_${authData.email}`);
          if (existingUser) {
            const savedData = JSON.parse(existingUser);
            userData = { ...savedData, session: true };
            // Update localStorage with active session
            localStorage.setItem(
              `user_${authData.email}`,
              JSON.stringify(userData)
            );
          }
        }

        // Store in sessionStorage for current session
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.removeItem("authData");
      }

      setIsLoading(false);

      // Redirect based on signup or signin
      if (authData?.type === "signup") {
        // New users go to onboarding
        router.push("/onboarding");
      } else {
        // Returning users go to dashboard
        router.push("/dashboard");
      }
    } else {
      setIsLoading(false);
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setResendCooldown(60);
    // Simulate API call to resend OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message (you could add a toast notification here)
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  if (!authData) {
    return null; // Will redirect in useEffect
  }

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
        {/* Back Link */}
        <Link
          href={authData.type === "signup" ? "/signup" : "/signin"}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          Back
        </Link>

        {/* Verification Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 card-glow animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 animate-pulse-slow">
              <span className="text-3xl">📧</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text-animated">Verify Email</span>
            </h1>
            <p className="text-gray-400">We&apos;ve sent a 6-digit code to</p>
            <p className="text-white font-medium mt-1">{authData.email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 text-center">
                Enter Verification Code
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold bg-dark-bg border ${
                      error ? "border-red-500" : "border-dark-border"
                    } rounded-xl text-white focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0
                  ? `Resend code in ${resendCooldown}s`
                  : "Didn't receive the code? Resend"}
              </button>
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
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-dark-bg/50 border border-dark-border rounded-xl">
            <p className="text-xs text-gray-500 text-center">
              🔒 For security, this code will expire in 10 minutes
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Having trouble? Make sure to check your spam folder
        </p>
      </div>
    </div>
  );
}
