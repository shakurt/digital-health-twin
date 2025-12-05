"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
  authenticated: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (!user) {
      router.push("/signin");
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

  return (
    <div className="min-h-screen bg-dark-bg">
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text-animated">Welcome Back!</span>
          </h1>
          <p className="text-xl text-gray-400">
            Hello,{" "}
            <span className="text-white font-semibold">{user.username}</span>
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-3xl mx-auto bg-dark-card border border-dark-border rounded-3xl p-12 text-center card-glow animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full mb-6 animate-bounce-slow">
            <span className="text-5xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Dashboard Coming Soon
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            We&apos;re building an amazing dashboard experience for you. Stay
            tuned!
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "📊", title: "Health Analytics" },
              { icon: "🎯", title: "Goal Tracking" },
              { icon: "👥", title: "Social Features" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-dark-border rounded-xl p-6 hover-lift"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <div className="text-sm text-gray-300">{feature.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
