"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function AuthDocs() {
  const router = useRouter();
  const [user] = useState<{ session?: boolean } | null>(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  });

  useEffect(() => {
    if (!user || user.session !== true) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const authFeatures = [
    {
      title: "🔐 Secure Authentication",
      description:
        "OTP-based authentication ensures secure access without passwords. One-time passwords are sent via email for verification.",
      details: [
        "Email-based verification",
        "6-digit OTP codes",
        "Session-based security",
        "No password storage required",
      ],
    },
    {
      title: "📱 Session Management",
      description:
        "User sessions are managed through localStorage with boolean session flags. Authenticated users maintain access across browser sessions.",
      details: [
        "Persistent login state",
        "Automatic session validation",
        "Secure logout functionality",
        "Session timeout handling",
      ],
    },
    {
      title: "🛡️ Access Control",
      description:
        "Role-based access control ensures users can only access appropriate content. Unauthenticated users are redirected to the home page.",
      details: [
        "Protected route validation",
        "Automatic redirects",
        "Session state checking",
        "User permission levels",
      ],
    },
    {
      title: "💾 Data Storage",
      description:
        "User data is stored locally in the browser using localStorage for persistence and sessionStorage for temporary authentication data.",
      details: [
        "localStorage for user profiles",
        "sessionStorage for auth flow",
        "Client-side data management",
        "Privacy-focused storage",
      ],
    },
  ];

  const pageAccess = [
    {
      category: "Public Pages",
      icon: "🌐",
      description: "Accessible to all users without authentication",
      pages: [
        { name: "Home Page", path: "/", access: "Everyone" },
      ],
    },
    {
      category: "Authentication Pages",
      icon: "🔑",
      description: "Pages for user registration and login",
      pages: [
        { name: "Sign Up", path: "/signup", access: "New users" },
        { name: "Sign In", path: "/signin", access: "Existing users" },
        { name: "Verify OTP", path: "/verify-otp", access: "During auth flow" },
      ],
    },
    {
      category: "Protected Pages",
      icon: "🔒",
      description: "Require active user session (session: true)",
      pages: [
        { name: "Dashboard", path: "/dashboard", access: "Authenticated users" },
        { name: "Nutrition", path: "/nutrition", access: "Authenticated users" },
        { name: "Activity", path: "/activity", access: "Authenticated users" },
        { name: "Health", path: "/health", access: "Authenticated users" },
        { name: "Sleep", path: "/sleep", access: "Authenticated users" },
        { name: "Mindfulness", path: "/mindfulness", access: "Authenticated users" },
        { name: "Profile", path: "/profile", access: "Authenticated users" },
        { name: "Documentation", path: "/docs", access: "Authenticated users" },
        { name: "Onboarding", path: "/onboarding", access: "New users only" },
      ],
    },
  ];

  const dataStorage = [
    {
      storage: "localStorage",
      icon: "💾",
      purpose: "Persistent user data and session state",
      data: [
        "username: User's display name",
        "email: User's email address",
        "session: Boolean login state (true/false)",
        "sex: User's gender (male/female/neutral)",
        "birthdate: User's date of birth",
        "height: User's height in cm",
        "weight: User's weight in kg",
        "job: User's occupation",
        "goal: User's health goal",
        "activityLevel: User's activity level",
        "sleepData: Sleep tracking data",
        "activityData: Activity tracking data",
        "nutritionData: Nutrition tracking data",
        "mindfulnessData: Mindfulness tracking data",
      ],
    },
    {
      storage: "sessionStorage",
      icon: "⚡",
      purpose: "Temporary authentication flow data",
      data: [
        "authData: {email, username?, type} during OTP verification",
        "user: Temporary user data during onboarding",
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3 sm:mb-4"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm sm:text-base">Back to Docs</span>
          </button>

          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">🔐</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                Authentication & Security
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-1">
                Complete guide to user authentication, access control, and data security
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              Authentication System Overview
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Our authentication system uses OTP-based verification for secure access without traditional passwords.
              User sessions are managed locally in the browser with role-based access control.
            </p>
          </div>

          {/* Authentication Features */}
          <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
              🔐 Authentication Features
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {authFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6"
                >
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{feature.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Access Control */}
          <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
              🚪 Page Access Control
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {pageAccess.map((category, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                        {category.category}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.pages.map((page, pageIndex) => (
                      <div key={pageIndex} className="flex items-center justify-between py-2 px-3 bg-dark-bg rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-mono text-gray-500">{page.path}</span>
                          <span className="text-xs sm:text-sm text-gray-300">{page.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-green-400 font-medium">{page.access}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Storage */}
          <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
              💾 Data Storage & Privacy
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {dataStorage.map((storage, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl">{storage.icon}</span>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                        {storage.storage}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400">{storage.purpose}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {storage.data.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <span className="text-green-400 text-xs mt-0.5">•</span>
                        <code className="text-xs sm:text-sm text-gray-300 font-mono bg-dark-bg px-2 py-1 rounded">
                          {item}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🔒</span>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  Security & Privacy
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  All user data is stored locally in your browser. We never transmit personal information to external servers.
                  Your health data remains private and under your control.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                    Client-side only
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                    No external APIs
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                    Privacy-focused
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}