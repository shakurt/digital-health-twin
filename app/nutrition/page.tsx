"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface WeeklyPattern {
  fastFood: { limit: number; logged: number };
  sugaryDrinks: { limit: number; logged: number };
  lateNight: { limit: number; logged: number };
}

interface NutritionData {
  weeklyPattern: WeeklyPattern;
  weeklyCalories: number[];
  idealRange: { min: number; max: number };
  goalWeight: number;
  currentWeight: number;
  avatarHealth: number;
  lastUpdated: string;
}

export default function Nutrition() {
  const router = useRouter();
  const [data, setData] = useState<NutritionData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize or load nutrition data
  useEffect(() => {
    // Load from localStorage and check session
    let hasActiveSession = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user_")) {
        const userData = localStorage.getItem(key);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.session === true) {
            hasActiveSession = true;
            break;
          }
        }
      }
    }
    if (!hasActiveSession) {
      router.push("/");
      return;
    }

    const storedData = sessionStorage.getItem("nutritionData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      // Initialize with default data based on user's onboarding
      const onboardingData = sessionStorage.getItem("onboardingData");
      const userData = onboardingData ? JSON.parse(onboardingData) : {};

      const initialData: NutritionData = {
        weeklyPattern: {
          fastFood: { limit: 2, logged: 0 },
          sugaryDrinks: { limit: 3, logged: 0 },
          lateNight: { limit: 2, logged: 0 },
        },
        weeklyCalories: [0, 0, 0, 0, 0, 0, 0], // Sun-Sat
        idealRange: { min: 1800, max: 2200 },
        goalWeight: userData.weight ? parseFloat(userData.weight) - 3 : 60,
        currentWeight: userData.weight ? parseFloat(userData.weight) : 63,
        avatarHealth: 85,
        lastUpdated: new Date().toISOString(),
      };
      setData(initialData);
      sessionStorage.setItem("nutritionData", JSON.stringify(initialData));
    }
  }, [router]);

  // Calculate status for pattern items
  const getPatternStatus = (logged: number, limit: number) => {
    const percentage = (logged / limit) * 100;
    if (percentage < 100) return { color: "green", text: "Good", emoji: "🟢" };
    if (percentage === 100)
      return { color: "yellow", text: "Limit", emoji: "🟡" };
    return { color: "red", text: "Over", emoji: "🔴" };
  };

  // Log a pattern item
  const logPattern = (type: keyof WeeklyPattern) => {
    if (!data) return;

    const newData = { ...data };
    newData.weeklyPattern[type].logged += 1;
    newData.lastUpdated = new Date().toISOString();

    setData(newData);
    sessionStorage.setItem("nutritionData", JSON.stringify(newData));

    // Also update localStorage with nutrition data
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const updatedUser = {
      ...user,
      nutritionData: newData,
    };
    localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    // Show success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Calculate projected weight
  const calculateProjectedWeight = () => {
    if (!data) return data?.currentWeight || 63;

    const avgCalories = data.weeklyCalories.reduce((a, b) => a + b, 0) / 7;
    const calorieDeficit =
      (data.idealRange.min + data.idealRange.max) / 2 - avgCalories;
    const weeklyWeightChange = calorieDeficit / 7700; // 7700 cal = 1kg

    return data.currentWeight + weeklyWeightChange * 8; // 8 weeks projection
  };

  // Generate insights based on patterns
  const generateInsights = () => {
    if (!data) return [];

    const insights = [];
    const { fastFood, sugaryDrinks, lateNight } = data.weeklyPattern;

    // Check for warnings
    if (fastFood.logged >= fastFood.limit) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Fast Food Limit Reached",
        message: `You've reached your weekly fast food limit (${fastFood.limit}x). This may add 0.5kg this week.`,
      });
    }

    if (sugaryDrinks.logged >= sugaryDrinks.limit) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Sugary Drinks Alert",
        message:
          "You've maxed out sugary drinks. Try sparkling water or herbal tea!",
      });
    }

    if (lateNight.logged >= lateNight.limit) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Late Night Eating",
        message: "Eating late can slow metabolism and affect sleep quality.",
      });
    }

    // Add positive feedback
    const totalLogged =
      fastFood.logged + sugaryDrinks.logged + lateNight.logged;
    const totalLimit = fastFood.limit + sugaryDrinks.limit + lateNight.limit;

    if (totalLogged < totalLimit * 0.7) {
      insights.push({
        type: "success",
        icon: "🎉",
        title: "Great Progress!",
        message: "You're staying well within your weekly limits. Keep it up!",
      });
    }

    // Add suggestions
    insights.push({
      type: "suggestion",
      icon: "💡",
      title: "Pro Tip",
      message:
        "Try meal prepping on Sundays to avoid last-minute fast food temptations.",
    });

    return insights;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading nutrition data...</p>
        </div>
      </div>
    );
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const projectedWeight = calculateProjectedWeight();
  const insights = generateInsights();

  return (
    <AppLayout>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-500/90 backdrop-blur-lg text-white px-6 py-4 rounded-2xl shadow-lg animate-fade-in flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span className="font-medium">Logged successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Nutrition</h1>
            <p className="text-gray-400">Track your weekly eating patterns</p>
          </div>
          <button
            onClick={() => {
              // Reset weekly data (for demo purposes)
              const newData = {
                ...data,
                weeklyPattern: {
                  fastFood: { limit: 2, logged: 0 },
                  sugaryDrinks: { limit: 3, logged: 0 },
                  lateNight: { limit: 2, logged: 0 },
                },
              };
              setData(newData);
              sessionStorage.setItem("nutritionData", JSON.stringify(newData));

              // Also update localStorage
              const user = JSON.parse(sessionStorage.getItem("user") || "{}");
              const updatedUser = {
                ...user,
                nutritionData: newData,
              };
              localStorage.setItem(
                `user_${user.email}`,
                JSON.stringify(updatedUser)
              );
              sessionStorage.setItem("user", JSON.stringify(updatedUser));
            }}
            className="px-4 py-2 bg-dark-card border border-white/10 rounded-xl text-gray-300 text-sm hover:border-primary/40 transition-all"
          >
            Reset Week
          </button>
        </div>

        {/* Weekly Pattern Card */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              📅 Your Weekly Pattern
            </h2>
            <span className="text-sm text-gray-400">
              Updated: {new Date(data.lastUpdated).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-6">
            {/* Fast Food */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍔</span>
                  <span className="text-white font-medium">Fast Food</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">
                    {data.weeklyPattern.fastFood.logged}/
                    {data.weeklyPattern.fastFood.limit}
                  </span>
                  <span className="text-lg">
                    {
                      getPatternStatus(
                        data.weeklyPattern.fastFood.logged,
                        data.weeklyPattern.fastFood.limit
                      ).emoji
                    }
                  </span>
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    getPatternStatus(
                      data.weeklyPattern.fastFood.logged,
                      data.weeklyPattern.fastFood.limit
                    ).color === "green"
                      ? "bg-green-500"
                      : getPatternStatus(
                          data.weeklyPattern.fastFood.logged,
                          data.weeklyPattern.fastFood.limit
                        ).color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (data.weeklyPattern.fastFood.logged /
                        data.weeklyPattern.fastFood.limit) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Sugary Drinks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥤</span>
                  <span className="text-white font-medium">Sugary Drinks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">
                    {data.weeklyPattern.sugaryDrinks.logged}/
                    {data.weeklyPattern.sugaryDrinks.limit}
                  </span>
                  <span className="text-lg">
                    {
                      getPatternStatus(
                        data.weeklyPattern.sugaryDrinks.logged,
                        data.weeklyPattern.sugaryDrinks.limit
                      ).emoji
                    }
                  </span>
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    getPatternStatus(
                      data.weeklyPattern.sugaryDrinks.logged,
                      data.weeklyPattern.sugaryDrinks.limit
                    ).color === "green"
                      ? "bg-green-500"
                      : getPatternStatus(
                          data.weeklyPattern.sugaryDrinks.logged,
                          data.weeklyPattern.sugaryDrinks.limit
                        ).color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (data.weeklyPattern.sugaryDrinks.logged /
                        data.weeklyPattern.sugaryDrinks.limit) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Late Night */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌙</span>
                  <span className="text-white font-medium">
                    Late Night Eating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">
                    {data.weeklyPattern.lateNight.logged}/
                    {data.weeklyPattern.lateNight.limit}
                  </span>
                  <span className="text-lg">
                    {
                      getPatternStatus(
                        data.weeklyPattern.lateNight.logged,
                        data.weeklyPattern.lateNight.limit
                      ).emoji
                    }
                  </span>
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    getPatternStatus(
                      data.weeklyPattern.lateNight.logged,
                      data.weeklyPattern.lateNight.limit
                    ).color === "green"
                      ? "bg-green-500"
                      : getPatternStatus(
                          data.weeklyPattern.lateNight.logged,
                          data.weeklyPattern.lateNight.limit
                        ).color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (data.weeklyPattern.lateNight.logged /
                        data.weeklyPattern.lateNight.limit) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Log Section */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Log Today</h2>
          <p className="text-gray-400 text-sm mb-6">
            Tap to log any of these items
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => logPattern("fastFood")}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                🍔
              </span>
              <span className="text-white font-medium block">Fast Food</span>
              <span className="text-gray-400 text-sm">Log a meal</span>
            </button>

            <button
              onClick={() => logPattern("sugaryDrinks")}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                🥤
              </span>
              <span className="text-white font-medium block">Sugary Drink</span>
              <span className="text-gray-400 text-sm">Log a drink</span>
            </button>

            <button
              onClick={() => logPattern("lateNight")}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-accent/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                🌙
              </span>
              <span className="text-white font-medium block">Late Night</span>
              <span className="text-gray-400 text-sm">After 10 PM</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Projection Card */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Weight Projection
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Current Weight</p>
                  <p className="text-2xl font-bold text-white">
                    {data.currentWeight} kg
                  </p>
                </div>
                <span className="text-3xl">⚖️</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Goal Weight</p>
                  <p className="text-2xl font-bold text-green-400">
                    {data.goalWeight} kg
                  </p>
                </div>
                <span className="text-3xl">🎯</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 rounded-xl">
                <div>
                  <p className="text-gray-300 text-sm">Projected (8 weeks)</p>
                  <p className="text-2xl font-bold text-white">
                    {projectedWeight.toFixed(1)} kg
                  </p>
                </div>
                <span className="text-3xl">📊</span>
              </div>

              <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
                <p className="text-accent text-sm font-medium">
                  {projectedWeight <= data.goalWeight
                    ? "✨ You're on track to reach your goal!"
                    : "⚠️ Adjust your pattern to reach your goal faster"}
                </p>
              </div>
            </div>
          </div>

          {/* Avatar Health */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Avatar Health</h2>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/40 mb-4">
                <span className="text-6xl">🧍</span>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-white">
                    {data.avatarHealth}
                  </span>
                  <span className="text-gray-400">/100</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-primary transition-all duration-1000"
                    style={{ width: `${data.avatarHealth}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-green-400 font-medium">
                  Your avatar is thriving! 🌟
                </p>
                <p className="text-gray-400 text-sm">
                  Keep following your pattern to maintain excellent health
                </p>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 text-sm">
                  ⚠️ If you exceed all limits this week, health may drop to{" "}
                  {Math.max(data.avatarHealth - 7, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Twin Insights */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            🤖 Your Digital Twin Says
          </h2>

          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border animate-fade-in ${
                  insight.type === "warning"
                    ? "bg-red-500/10 border-red-500/30"
                    : insight.type === "success"
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h3
                      className={`font-medium mb-1 ${
                        insight.type === "warning"
                          ? "text-red-400"
                          : insight.type === "success"
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    >
                      {insight.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
