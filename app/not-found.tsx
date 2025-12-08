"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [hasActiveSession] = useState(() => {
    if (typeof window === "undefined") return false;

    // Check if user has active session
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.session === true) {
        return true;
      }
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-white leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => router.back()}
            className="px-8 py-4 bg-dark-bg border-2 border-white/10 rounded-xl text-gray-300 font-semibold text-lg transition-all duration-300 hover:border-white/30 hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Go Back
            </span>
          </button>

          <button
            onClick={() => router.push(hasActiveSession ? "/dashboard" : "/")}
            className="px-8 py-4 bg-gradient-animated rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover-glow relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Go to Home
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-8 text-gray-600">
          <div className="w-16 h-px bg-linear-to-r from-transparent to-gray-600"></div>
          <svg
            className="w-6 h-6 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="w-16 h-px bg-linear-to-l from-transparent to-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
