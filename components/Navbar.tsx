"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [user] = useState<{ username: string } | null>(() => {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-dark-card/80 backdrop-blur-lg border-b border-white/5 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side - Profile & Friends */}
        <div className="flex items-center gap-3">
          {/* Profile Button */}
          <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium text-gray-200 hidden sm:block">
              {user?.username || "User"}
            </span>
          </button>

          {/* Friends Button */}
          <Link
            href={"/friends"}
            className="relative p-2.5 rounded-xl bg-dark-bg border border-white/5 hover:border-accent/40 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </span>
          </Link>

          {/* Devices Button */}
          <Link
            href={"/devices"}
            className="p-2.5 rounded-xl bg-dark-bg border border-white/5 hover:border-primary/40 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>

        {/* Center/Right - Leaderboard Button */}
        <Link
          href={"/leaderboard"}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 group"
        >
          <span className="text-xl">🏆</span>
          <span className="text-sm font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">
            Leaderboard
          </span>
        </Link>

        {/* Right Side - Hamburger Menu (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-xl bg-dark-bg border border-white/5 hover:border-primary/40 transition-all duration-300"
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
