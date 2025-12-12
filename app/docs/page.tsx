"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function Docs() {
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

  const modules = [
    {
      name: "Nutrition",
      description:
        "Learn about nutrition tracking, meal planning, and dietary guidelines",
      icon: "🍎",
      gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
      borderColor: "border-orange-500/40",
      hoverBorder: "hover:border-orange-500/70",
      iconBg: "bg-orange-500/20",
      link: "/docs/nutrition",
    },
    {
      name: "Activity",
      description:
        "Discover workout tracking, exercise guides, and fitness metrics",
      icon: "💪",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      borderColor: "border-green-500/40",
      hoverBorder: "hover:border-green-500/70",
      iconBg: "bg-green-500/20",
      link: "/docs/activity",
    },
    {
      name: "Health",
      description:
        "Understand health metrics, vital signs, and wellness indicators",
      icon: "❤️",
      gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20",
      borderColor: "border-red-500/40",
      hoverBorder: "hover:border-red-500/70",
      iconBg: "bg-red-500/20",
      link: "/docs/health",
    },
    {
      name: "Sleep & Recovery",
      description:
        "Explore sleep patterns, recovery metrics, and rest optimization",
      icon: "😴",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      borderColor: "border-blue-500/40",
      hoverBorder: "hover:border-blue-500/70",
      iconBg: "bg-blue-500/20",
      link: "/docs/sleep",
    },
    {
      name: "Mindfulness",
      description:
        "Master meditation techniques, stress management, and mental wellness",
      icon: "🧘",
      gradient: "from-purple-500/20 via-violet-500/20 to-fuchsia-500/20",
      borderColor: "border-purple-500/40",
      hoverBorder: "hover:border-purple-500/70",
      iconBg: "bg-purple-500/20",
      link: "/docs/mindfulness",
    },
    {
      name: "Metaverse & Avatar",
      description:
        "Explore dynamic health avatars and virtual representation of your wellness",
      icon: "🧑",
      gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
      borderColor: "border-cyan-500/40",
      hoverBorder: "hover:border-cyan-500/70",
      iconBg: "bg-cyan-500/20",
      link: "/docs/avatar",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                Documentation
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 mt-1">
                Comprehensive guides for your health journey
              </p>
            </div>
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <button
              key={index}
              onClick={() => router.push(module.link)}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-dark-card border ${module.borderColor} ${module.hoverBorder} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${module.borderColor}/20`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Icon */}
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl ${module.iconBg} border border-white/10 flex items-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 justify-center group-hover:rotate-3 transition-all duration-500 mx-auto`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                    {module.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {module.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4 md:mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {module.description}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-500 group-hover:text-white transition-colors duration-300 justify-center">
                  <span>View Doc</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-dark-card rounded-2xl sm:rounded-3xl border border-gray-800 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 sm:mb-3">
                Need Help Getting Started?
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                Each documentation section provides detailed information about
                tracking, metrics, best practices, and tips to help you achieve
                your health goals. Select a module above to learn more.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  📊 Data Tracking
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  🎯 Goal Setting
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  💡 Best Practices
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  📈 Progress Insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
