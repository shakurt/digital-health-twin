"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { DashboardAvatar } from "@/components/HealthAvatar";
import { UserHealthData } from "@/components/AvatarCalculations";

interface UserData {
  username: string;
  email: string;
  session?: boolean;
  height?: string;
  weight?: string;
  sex?: string;
  sleepData?: unknown;
  activityData?: unknown;
  nutritionData?: unknown;
  mindfulnessData?: unknown;
  [key: string]: unknown;
}

export default function Dashboard() {
  const router = useRouter();
  const [user] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!user || user.session !== true) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  // Prepare user health data for avatar
  const getUserHealthData = (): UserHealthData => {
    return {
      height: user.height,
      weight: user.weight,
      sleepData: user.sleepData as UserHealthData["sleepData"],
      activityData: user.activityData as UserHealthData["activityData"],
      nutritionData: user.nutritionData as UserHealthData["nutritionData"],
      mindfulnessData:
        user.mindfulnessData as UserHealthData["mindfulnessData"],
    };
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getTodayStats = () => {
    const sleepData = user?.sleepData as
      | { lastNight?: { hours: number; quality: number } }
      | undefined;
    const activityData = user?.activityData as
      | {
          todayActivity?: {
            steps: number;
            calories: number;
            activeMinutes: number;
          };
        }
      | undefined;
    const mindfulnessData = user?.mindfulnessData as
      | { weeklyStress?: number[] }
      | undefined;

    const sleepHours = sleepData?.lastNight?.hours || 7.2;
    const sleepQuality = sleepData?.lastNight?.quality || 4.0;
    const steps = activityData?.todayActivity?.steps || 8432;
    const calories = activityData?.todayActivity?.calories || 1847;
    const activeMinutes = activityData?.todayActivity?.activeMinutes || 45;
    const weeklyStress = mindfulnessData?.weeklyStress || [5, 6, 4, 7, 5, 6, 4];
    const avgStress =
      weeklyStress.reduce((a: number, b: number) => a + b, 0) / 7;

    return {
      sleepHours,
      sleepQuality,
      steps,
      calories,
      activeMinutes,
      avgStress,
    };
  };

  const stats = getTodayStats();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Hero Section with Avatar */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 border border-white/10 p-6 md:p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-400 mb-2">
                  {getGreeting()},{" "}
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {user?.username}
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  Ready to make today count?
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/activity"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/80 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    Start Workout
                  </Link>
                  <Link
                    href="/mindfulness"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 border border-white/20"
                  >
                    Meditate
                  </Link>
                </div>
              </div>

              <div className="md:w-80">
                <DashboardAvatar
                  userData={getUserHealthData()}
                  gender={user?.sex as "male" | "female" | "neutral"}
                  onClick={() => router.push("/profile")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Sleep Card */}
          <Link
            href="/sleep"
            className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Sleep</h3>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">😴</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {stats.sleepHours.toFixed(1)}h
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= Math.round(stats.sleepQuality)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">Quality</p>
            </div>
          </Link>

          {/* Activity Card */}
          <Link
            href="/activity"
            className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Activity</h3>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏃</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {stats.steps.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              steps · {stats.activeMinutes} min active
            </p>
          </Link>

          {/* Nutrition Card */}
          <Link
            href="/nutrition"
            className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Nutrition</h3>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🍎</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {stats.calories}
            </p>
            <p className="text-sm text-gray-400">calories · Goal: 2,200</p>
          </Link>

          {/* Mindfulness Card */}
          <Link
            href="/mindfulness"
            className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Mindfulness</h3>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧘</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {stats.avgStress.toFixed(1)}/10
            </p>
            <p className="text-sm text-gray-400">
              avg stress ·{" "}
              {stats.avgStress < 5
                ? "Good"
                : stats.avgStress < 7
                ? "Moderate"
                : "High"}
            </p>
          </Link>
        </div>

        {/* Weekly Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sleep Trend */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Sleep Trend
                </h3>
                <p className="text-sm text-gray-400">Last 7 days</p>
              </div>
              <Link
                href="/sleep"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View Details →
              </Link>
            </div>
            <div className="flex items-end justify-between h-40 gap-2">
              {[6.5, 7.2, 7.8, 6.9, 7.5, 8.1, 7.2].map((hours, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-linear-to-t from-blue-500/80 to-blue-400/40 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-400"
                    style={{ height: `${(hours / 10) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {["S", "M", "T", "W", "T", "F", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Progress */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Weekly Goals
                </h3>
                <p className="text-sm text-gray-400">Your progress this week</p>
              </div>
              <Link
                href="/activity"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Steps</span>
                  <span className="text-sm font-bold text-white">
                    58,432 / 70,000
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full"
                    style={{ width: "83%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Active Minutes</span>
                  <span className="text-sm font-bold text-white">
                    245 / 300
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Workouts</span>
                  <span className="text-sm font-bold text-white">4 / 5</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-purple-500 to-pink-400 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/sleep"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🌙</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Log Sleep
              </span>
            </Link>

            <Link
              href="/nutrition"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🍽️</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Log Meal
              </span>
            </Link>

            <Link
              href="/activity"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-green-500/10 border border-transparent hover:border-green-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💪</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Workout
              </span>
            </Link>

            <Link
              href="/mindfulness"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧘</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Meditate
              </span>
            </Link>

            <Link
              href="/health"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-red-500/10 border border-transparent hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">❤️</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Health
              </span>
            </Link>

            <Link
              href="/friends"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-accent/10 border border-transparent hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">
                Friends
              </span>
            </Link>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Today's Insights */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Today&apos;s Insights
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Great sleep quality!
                  </p>
                  <p className="text-xs text-gray-400">
                    You got 7.2 hours of quality sleep. Keep up the good work!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Stay active
                  </p>
                  <p className="text-xs text-gray-400">
                    You&apos;re 1,568 steps away from your daily goal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-2xl">💧</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Hydration reminder
                  </p>
                  <p className="text-xs text-gray-400">
                    Don&apos;t forget to drink water throughout the day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                Recent Achievements
              </h3>
              <Link
                href="/leaderboard"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">7-Day Streak</p>
                  <p className="text-xs text-gray-400">
                    Completed all daily goals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-2xl">💪</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Workout Warrior
                  </p>
                  <p className="text-xs text-gray-400">5 workouts this week</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <span className="text-2xl">😴</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Sleep Master</p>
                  <p className="text-xs text-gray-400">7+ hours for 5 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
