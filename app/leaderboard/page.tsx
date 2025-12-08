"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  healthScore: number;
  totalPoints: number;
  weeklySteps: number;
  streak: number;
  badges: string[];
  trend: "up" | "down" | "same";
  rankChange: number;
  level: number;
  isCurrentUser?: boolean;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedBy: number;
  total: number;
}

export default function Leaderboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    null
  );
  const [selectedPeriod, setSelectedPeriod] = useState<
    "weekly" | "monthly" | "alltime"
  >("weekly");
  const [selectedCategory, setSelectedCategory] = useState<
    "overall" | "steps" | "mindfulness" | "nutrition"
  >("overall");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [topAchievements, setTopAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const avatarEmojis = [
      "🧑‍💼",
      "👩‍🔬",
      "🧑‍🎨",
      "👨‍🏫",
      "👩‍⚕️",
      "🧑‍🍳",
      "👨‍🚀",
      "👩‍💻",
      "🧑‍🎤",
      "👩‍🚒",
    ];

    // Check session in localStorage
    const data = localStorage.getItem("user");
    if (!data) {
      router.push("/");
      return;
    }

    const user = JSON.parse(data);
    if (user.session !== true) {
      router.push("/");
      return;
    }
    setCurrentUser(user); // Generate mock leaderboard data
    const mockUsers: LeaderboardUser[] = [
      {
        rank: 1,
        username: "fitness_king",
        avatar: avatarEmojis[0],
        healthScore: 98,
        totalPoints: 15420,
        weeklySteps: 95000,
        streak: 45,
        badges: ["🏆", "🥇", "💪", "🔥", "⭐"],
        trend: "up",
        rankChange: 2,
        level: 32,
      },
      {
        rank: 2,
        username: "wellness_pro",
        avatar: avatarEmojis[1],
        healthScore: 96,
        totalPoints: 14850,
        weeklySteps: 92000,
        streak: 38,
        badges: ["🥇", "🧘", "💪", "⭐"],
        trend: "same",
        rankChange: 0,
        level: 30,
      },
      {
        rank: 3,
        username: "healthy_warrior",
        avatar: avatarEmojis[2],
        healthScore: 94,
        totalPoints: 13920,
        weeklySteps: 88000,
        streak: 30,
        badges: ["🥉", "🏃", "💪", "⭐"],
        trend: "up",
        rankChange: 1,
        level: 28,
      },
      {
        rank: 4,
        username: user.username,
        avatar: "👤",
        healthScore: 87,
        totalPoints: 11240,
        weeklySteps: 75000,
        streak: 14,
        badges: ["🏃", "🥗", "💤"],
        trend: "up",
        rankChange: 3,
        level: 22,
        isCurrentUser: true,
      },
      {
        rank: 5,
        username: "zen_master",
        avatar: avatarEmojis[3],
        healthScore: 91,
        totalPoints: 12580,
        weeklySteps: 70000,
        streak: 25,
        badges: ["🧘", "💤", "⭐"],
        trend: "down",
        rankChange: -2,
        level: 26,
      },
      {
        rank: 6,
        username: "active_life",
        avatar: avatarEmojis[4],
        healthScore: 89,
        totalPoints: 11890,
        weeklySteps: 82000,
        streak: 20,
        badges: ["🏃", "💪", "🔥"],
        trend: "up",
        rankChange: 1,
        level: 24,
      },
      {
        rank: 7,
        username: "nutrition_ninja",
        avatar: avatarEmojis[5],
        healthScore: 86,
        totalPoints: 10920,
        weeklySteps: 68000,
        streak: 18,
        badges: ["🥗", "🍎", "⭐"],
        trend: "same",
        rankChange: 0,
        level: 21,
      },
      {
        rank: 8,
        username: "sleep_champion",
        avatar: avatarEmojis[6],
        healthScore: 88,
        totalPoints: 10540,
        weeklySteps: 65000,
        streak: 22,
        badges: ["💤", "🌙", "⭐"],
        trend: "down",
        rankChange: -1,
        level: 23,
      },
      {
        rank: 9,
        username: "mindful_soul",
        avatar: avatarEmojis[7],
        healthScore: 85,
        totalPoints: 10120,
        weeklySteps: 72000,
        streak: 16,
        badges: ["🧘", "🌟"],
        trend: "up",
        rankChange: 2,
        level: 20,
      },
      {
        rank: 10,
        username: "daily_achiever",
        avatar: avatarEmojis[8],
        healthScore: 83,
        totalPoints: 9850,
        weeklySteps: 70000,
        streak: 12,
        badges: ["🎯", "🔥"],
        trend: "same",
        rankChange: 0,
        level: 19,
      },
    ];

    setLeaderboardData(mockUsers);

    // Generate achievements
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        name: "Century Club",
        icon: "💯",
        description: "Maintain 100+ health score for 7 days",
        rarity: "legendary",
        unlockedBy: 23,
        total: 10000,
      },
      {
        id: "2",
        name: "Marathon Master",
        icon: "🏃",
        description: "Walk 100,000 steps in a week",
        rarity: "epic",
        unlockedBy: 487,
        total: 10000,
      },
      {
        id: "3",
        name: "Zen Achievement",
        icon: "🧘",
        description: "30-day meditation streak",
        rarity: "rare",
        unlockedBy: 1250,
        total: 10000,
      },
      {
        id: "4",
        name: "Early Bird",
        icon: "🌅",
        description: "Wake up before 6 AM for 14 days",
        rarity: "epic",
        unlockedBy: 680,
        total: 10000,
      },
      {
        id: "5",
        name: "Nutrition Expert",
        icon: "🥗",
        description: "Perfect nutrition week",
        rarity: "rare",
        unlockedBy: 1580,
        total: 10000,
      },
      {
        id: "6",
        name: "Social Butterfly",
        icon: "🦋",
        description: "Complete 10 quests with friends",
        rarity: "common",
        unlockedBy: 3420,
        total: 10000,
      },
    ];

    setTopAchievements(mockAchievements);
  }, [router, selectedPeriod, selectedCategory]);

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-500 to-orange-500";
      case "epic":
        return "from-purple-500 to-pink-500";
      case "rare":
        return "from-blue-500 to-cyan-500";
      case "common":
        return "from-gray-500 to-gray-400";
    }
  };

  const getRarityBorder = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500/50";
      case "epic":
        return "border-purple-500/50";
      case "rare":
        return "border-blue-500/50";
      case "common":
        return "border-gray-500/50";
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const currentUserData = leaderboardData.find((u) => u.isCurrentUser);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl">🏆</span>
            Global Leaderboard
          </h1>
          <p className="text-gray-400">
            Compete with the community and climb the ranks
          </p>
        </div>

        {/* Current User Stats Banner */}
        {currentUserData && (
          <div className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/40 rounded-2xl p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-4xl ring-4 ring-primary/40">
                  {currentUserData.avatar}
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Your Rank</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-white">
                      #{currentUserData.rank}
                    </span>
                    {currentUserData.trend === "up" && (
                      <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                        ↑ {currentUserData.rankChange}
                      </span>
                    )}
                    {currentUserData.trend === "down" && (
                      <span className="flex items-center gap-1 text-red-400 text-sm font-medium">
                        ↓ {Math.abs(currentUserData.rankChange)}
                      </span>
                    )}
                  </div>
                  <p className="text-white font-medium">
                    {currentUserData.username}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {currentUserData.healthScore}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Health Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">
                    {currentUserData.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">
                    {currentUserData.streak}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {currentUserData.level}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Level</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Time Period */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Time Period</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPeriod("weekly")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedPeriod === "weekly"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setSelectedPeriod("monthly")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedPeriod === "monthly"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPeriod("alltime")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedPeriod === "alltime"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Category</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory("overall")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === "overall"
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  🏆 Overall
                </button>
                <button
                  onClick={() => setSelectedCategory("steps")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === "steps"
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  🏃 Steps
                </button>
                <button
                  onClick={() => setSelectedCategory("mindfulness")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === "mindfulness"
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  🧘 Mindfulness
                </button>
                <button
                  onClick={() => setSelectedCategory("nutrition")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === "nutrition"
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  🥗 Nutrition
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <div
              className="bg-dark-card border border-white/5 rounded-2xl p-6 flex flex-col items-center animate-fade-in md:order-1"
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-5xl mb-4">🥈</span>
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-gray-400 to-gray-500 flex items-center justify-center text-4xl ring-4 ring-gray-400/30 mb-4">
                {leaderboardData[1].avatar}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {leaderboardData[1].username}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Level {leaderboardData[1].level}
              </p>
              <div className="flex gap-1 mb-3">
                {leaderboardData[1].badges.map((badge, i) => (
                  <span key={i} className="text-xl">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="w-full bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">
                  {leaderboardData[1].totalPoints.toLocaleString()}
                </p>
                <p className="text-gray-400 text-xs">XP Points</p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <div className="bg-linear-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-2xl p-6 flex flex-col items-center animate-fade-in md:order-2 md:-mt-4">
              <span className="text-6xl mb-4">👑</span>
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-5xl ring-4 ring-yellow-400/50 mb-4">
                {leaderboardData[0].avatar}
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {leaderboardData[0].username}
              </h3>
              <p className="text-yellow-400 text-sm font-medium mb-3">
                Level {leaderboardData[0].level} • Champion
              </p>
              <div className="flex gap-1 mb-4">
                {leaderboardData[0].badges.map((badge, i) => (
                  <span key={i} className="text-2xl">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="w-full bg-linear-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-yellow-400">
                  {leaderboardData[0].totalPoints.toLocaleString()}
                </p>
                <p className="text-gray-300 text-sm">XP Points</p>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <div
              className="bg-dark-card border border-white/5 rounded-2xl p-6 flex flex-col items-center animate-fade-in md:order-3"
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-5xl mb-4">🥉</span>
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-600 to-amber-700 flex items-center justify-center text-4xl ring-4 ring-amber-600/30 mb-4">
                {leaderboardData[2].avatar}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {leaderboardData[2].username}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Level {leaderboardData[2].level}
              </p>
              <div className="flex gap-1 mb-3">
                {leaderboardData[2].badges.map((badge, i) => (
                  <span key={i} className="text-xl">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="w-full bg-white/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">
                  {leaderboardData[2].totalPoints.toLocaleString()}
                </p>
                <p className="text-gray-400 text-xs">XP Points</p>
              </div>
            </div>
          )}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Full Rankings</h2>

          <div className="space-y-3">
            {leaderboardData.map((user, index) => (
              <div
                key={user.username}
                className={`p-4 rounded-xl border transition-all hover:scale-[1.02] animate-fade-in ${
                  user.isCurrentUser
                    ? "bg-primary/10 border-primary/40"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-12 text-center">
                    {getMedalEmoji(user.rank) ? (
                      <span className="text-3xl">
                        {getMedalEmoji(user.rank)}
                      </span>
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">
                        #{user.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl ring-2 ring-white/10">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold">
                          {user.username}
                        </h3>
                        {user.isCurrentUser && (
                          <span className="px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-primary text-xs font-medium">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>Level {user.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          🔥 {user.streak} days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="hidden md:flex gap-1">
                    {user.badges.slice(0, 4).map((badge, i) => (
                      <span key={i} className="text-xl">
                        {badge}
                      </span>
                    ))}
                    {user.badges.length > 4 && (
                      <span className="text-gray-400 text-sm">
                        +{user.badges.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="hidden lg:grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-white">
                        {user.healthScore}
                      </p>
                      <p className="text-xs text-gray-400">Health</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-yellow-400">
                        {user.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">XP</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-accent">
                        {Math.floor(user.weeklySteps / 1000)}k
                      </p>
                      <p className="text-xs text-gray-400">Steps</p>
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="w-16 text-center">
                    {user.trend === "up" && (
                      <div className="flex flex-col items-center">
                        <span className="text-green-400 text-xl">↑</span>
                        <span className="text-green-400 text-xs font-medium">
                          +{user.rankChange}
                        </span>
                      </div>
                    )}
                    {user.trend === "down" && (
                      <div className="flex flex-col items-center">
                        <span className="text-red-400 text-xl">↓</span>
                        <span className="text-red-400 text-xs font-medium">
                          {user.rankChange}
                        </span>
                      </div>
                    )}
                    {user.trend === "same" && (
                      <span className="text-gray-400 text-xl">─</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rare Achievements */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>✨</span>
            Rare Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAchievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`bg-linear-to-br ${getRarityColor(
                  achievement.rarity
                )} bg-opacity-10 border-2 ${getRarityBorder(
                  achievement.rarity
                )} rounded-xl p-4 hover:scale-105 transition-all animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold capitalize ${
                      achievement.rarity === "legendary"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : achievement.rarity === "epic"
                        ? "bg-purple-500/20 text-purple-400"
                        : achievement.rarity === "rare"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {achievement.rarity}
                  </span>

                  <div className="text-right">
                    <p className="text-white text-sm font-medium">
                      {(
                        (achievement.unlockedBy / achievement.total) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-gray-400 text-xs">
                      {achievement.unlockedBy.toLocaleString()} unlocked
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${getRarityColor(
                      achievement.rarity
                    )} transition-all duration-500`}
                    style={{
                      width: `${
                        (achievement.unlockedBy / achievement.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-6 text-center">
            <p className="text-5xl font-bold text-white mb-2">10,247</p>
            <p className="text-gray-300 text-sm font-medium mb-1">
              Active Users
            </p>
            <p className="text-gray-400 text-xs">+324 this week</p>
          </div>

          <div className="bg-linear-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-6 text-center">
            <p className="text-5xl font-bold text-white mb-2">487M</p>
            <p className="text-gray-300 text-sm font-medium mb-1">
              Total Steps
            </p>
            <p className="text-gray-400 text-xs">This month</p>
          </div>

          <div className="bg-linear-to-br from-secondary/10 to-accent/10 border border-secondary/30 rounded-xl p-6 text-center">
            <p className="text-5xl font-bold text-white mb-2">2,834</p>
            <p className="text-gray-300 text-sm font-medium mb-1">
              Active Quests
            </p>
            <p className="text-gray-400 text-xs">Join the competition</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
