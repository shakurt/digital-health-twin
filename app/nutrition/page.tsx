"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

// ============= TYPES =============

interface WeeklyPattern {
  fastFood: { limit: number; logged: number };
  sugaryDrinks: { limit: number; logged: number };
  lateNight: { limit: number; logged: number };
}

interface MicroHabit {
  id: string;
  title: string;
  description: string;
  targetDays: number; // days per week
  completedDays: number[];
  icon: string;
  category: "reduce" | "add" | "replace";
  active: boolean;
  startDate: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "solo" | "social";
  duration: number; // days
  progress: number;
  target: number;
  participants?: string[]; // for social challenges (mock data)
  startDate: string;
  endDate: string;
  icon: string;
}

interface CrossFeatureInsight {
  source: "sleep" | "mindfulness" | "activity";
  type: "warning" | "positive" | "correlation";
  icon: string;
  title: string;
  message: string;
  data?: any;
}

interface NutritionData {
  // Core tracking
  weeklyPattern: WeeklyPattern;
  weeklyCalories: number[];
  idealRange: { min: number; max: number };

  // Goals & avatar
  goalWeight: number;
  currentWeight: number;
  avatarHealth: number;

  // Phase 1 Features
  allergies: string[]; // from onboarding
  microHabits: MicroHabit[];
  challenges: Challenge[];
  crossFeatureInsights: CrossFeatureInsight[];

  lastUpdated: string;
}

// ============= MAIN COMPONENT =============

export default function Nutrition() {
  const router = useRouter();
  const [data, setData] = useState<NutritionData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "habits" | "challenges"
  >("overview");
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showOnboardingModal || showResetConfirm || showHabitModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOnboardingModal, showResetConfirm, showHabitModal]);

  // ============= INITIALIZATION =============

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/");
      return;
    }

    const user = JSON.parse(userData);
    if (user.session !== true) {
      router.push("/");
      return;
    }

    // Load existing nutrition data or initialize
    if (user.nutritionData) {
      setData(user.nutritionData);
    } else {
      // Initialize with data from onboarding
      const allergies =
        user.optionalAnswers?.nutrition?.allergies?.split(",") || [];

      const initialData: NutritionData = {
        weeklyPattern: {
          fastFood: { limit: 2, logged: 0 },
          sugaryDrinks: { limit: 3, logged: 0 },
          lateNight: { limit: 2, logged: 0 },
        },
        weeklyCalories: [0, 0, 0, 0, 0, 0, 0],
        idealRange: { min: 1800, max: 2200 },
        goalWeight: user.weight ? parseFloat(user.weight) - 3 : 60,
        currentWeight: user.weight ? parseFloat(user.weight) : 63,
        avatarHealth: 85,
        allergies: allergies,
        microHabits: generateDefaultHabits(),
        challenges: generateDefaultChallenges(),
        crossFeatureInsights: [],
        lastUpdated: new Date().toISOString(),
      };

      setData(initialData);

      // Save to localStorage
      const updatedUser = { ...user, nutritionData: initialData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [router]);

  // Generate cross-feature insights from other modules
  useEffect(() => {
    if (!data) return;

    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    const insights: CrossFeatureInsight[] = [];

    // Check sleep data
    if (user.sleepData) {
      const avgSleep =
        user.sleepData.weeklyHours?.reduce((a: number, b: number) => a + b, 0) /
        7;
      const yesterday = new Date().getDay() - 1;
      const yesterdaySleep =
        user.sleepData.weeklyHours?.[yesterday < 0 ? 6 : yesterday];

      if (yesterdaySleep && yesterdaySleep < 6) {
        insights.push({
          source: "sleep",
          type: "warning",
          icon: "😴",
          title: "Sleep Deprivation Alert",
          message: `You slept ${yesterdaySleep}h last night. Research shows sleep-deprived people crave 30% more sugar. Consider high-protein snacks today.`,
          data: { hours: yesterdaySleep },
        });
      }

      // Check late night eating impact on sleep
      if (data.weeklyPattern.lateNight.logged >= 3 && avgSleep < 7) {
        insights.push({
          source: "sleep",
          type: "correlation",
          icon: "🔍",
          title: "Pattern Detected",
          message:
            "Late-night eating may be affecting your sleep quality. Try finishing meals 3 hours before bed.",
        });
      }
    }

    // Check mindfulness/stress data
    if (user.mindfulnessData) {
      const recentMoods = user.mindfulnessData.moodLogs?.slice(-3) || [];
      const stressedCount = recentMoods.filter(
        (m: any) => m.mood === "Stressed" || m.mood === "Anxious"
      ).length;

      if (stressedCount >= 2) {
        insights.push({
          source: "mindfulness",
          type: "warning",
          icon: "😰",
          title: "Stress-Eating Risk",
          message:
            "Your stress levels are high. Be mindful of emotional eating. Try meditation before reaching for snacks.",
        });
      }
    }

    // Positive feedback
    if (
      data.weeklyPattern.fastFood.logged < 1 &&
      data.weeklyPattern.sugaryDrinks.logged < 2
    ) {
      insights.push({
        source: "mindfulness",
        type: "positive",
        icon: "🎉",
        title: "Excellent Self-Control!",
        message:
          "You're making conscious food choices. Your digital twin is impressed!",
      });
    }

    // Update data with insights
    if (insights.length > 0) {
      const newData = { ...data, crossFeatureInsights: insights };
      setData(newData);

      const updatedUser = { ...user, nutritionData: newData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [data?.weeklyPattern, data?.lastUpdated]);

  // ============= HELPER FUNCTIONS =============

  const getPatternStatus = (logged: number, limit: number) => {
    const percentage = (logged / limit) * 100;
    if (percentage < 100) return { color: "green", text: "Good", emoji: "🟢" };
    if (percentage === 100)
      return { color: "yellow", text: "Limit", emoji: "🟡" };
    return { color: "red", text: "Over", emoji: "🔴" };
  };

  const calculateProjectedWeight = () => {
    if (!data) return 63;
    const avgCalories = data.weeklyCalories.reduce((a, b) => a + b, 0) / 7;
    const calorieDeficit =
      (data.idealRange.min + data.idealRange.max) / 2 - avgCalories;
    const weeklyWeightChange = calorieDeficit / 7700;
    return data.currentWeight + weeklyWeightChange * 8;
  };

  // ============= ACTION HANDLERS =============

  const logPattern = (type: keyof WeeklyPattern) => {
    if (!data) return;

    const newData = { ...data };
    newData.weeklyPattern[type].logged += 1;
    newData.lastUpdated = new Date().toISOString();
    setData(newData);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...user, nutritionData: newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const toggleHabitDay = (habitId: string, day: number) => {
    if (!data) return;

    const newData = { ...data };
    const habit = newData.microHabits.find((h) => h.id === habitId);
    if (!habit) return;

    if (habit.completedDays.includes(day)) {
      habit.completedDays = habit.completedDays.filter((d) => d !== day);
    } else {
      habit.completedDays.push(day);
    }

    setData(newData);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...user, nutritionData: newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addMicroHabit = (
    habit: Omit<MicroHabit, "id" | "completedDays" | "startDate">
  ) => {
    if (!data) return;

    const newHabit: MicroHabit = {
      ...habit,
      id: Date.now().toString(),
      completedDays: [],
      startDate: new Date().toISOString(),
    };

    const newData = { ...data };
    newData.microHabits.push(newHabit);
    setData(newData);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...user, nutritionData: newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowHabitModal(false);
  };

  const joinChallenge = (challengeId: string) => {
    if (!data) return;

    const newData = { ...data };
    const challenge = newData.challenges.find((c) => c.id === challengeId);
    if (challenge) {
      challenge.type = "solo"; // Simulate joining
    }

    setData(newData);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...user, nutritionData: newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateChallengeProgress = (challengeId: string, increment: number) => {
    if (!data) return;

    const newData = { ...data };
    const challenge = newData.challenges.find((c) => c.id === challengeId);
    if (challenge) {
      challenge.progress = Math.min(
        challenge.progress + increment,
        challenge.target
      );
    }

    setData(newData);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...user, nutritionData: newData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleResetNutritionData = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allergies =
      user.optionalAnswers?.nutrition?.allergies?.split(",") || [];

    const resetData: NutritionData = {
      weeklyPattern: {
        fastFood: { limit: 2, logged: 0 },
        sugaryDrinks: { limit: 3, logged: 0 },
        lateNight: { limit: 2, logged: 0 },
      },
      weeklyCalories: [0, 0, 0, 0, 0, 0, 0],
      idealRange: { min: 1800, max: 2200 },
      goalWeight: user.weight ? parseFloat(user.weight) - 3 : 60,
      currentWeight: user.weight ? parseFloat(user.weight) : 63,
      avatarHealth: 85,
      allergies: allergies,
      microHabits: generateDefaultHabits(),
      challenges: generateDefaultChallenges(),
      crossFeatureInsights: [],
      lastUpdated: new Date().toISOString(),
    };

    setData(resetData);
    const updatedUser = { ...user, nutritionData: resetData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowResetConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleUpdateOnboardingAnswers = (
    newAnswers: Record<string, string>
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = {
      ...user,
      optionalAnswers: {
        ...user.optionalAnswers,
        nutrition: newAnswers,
      },
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update allergies in nutrition data
    if (data && newAnswers.allergies) {
      const newData = {
        ...data,
        allergies: newAnswers.allergies.split(",").filter(Boolean),
      };
      setData(newData);
      updatedUser.nutritionData = newData;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setShowOnboardingModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const generateProTips = () => {
    if (!data) return [];
    const tips = [];

    // Fast food tips
    if (
      data.weeklyPattern.fastFood.logged >= data.weeklyPattern.fastFood.limit
    ) {
      tips.push({
        icon: "🍔",
        title: "Fast Food Alert",
        message:
          "Try meal prepping on Sundays to avoid last-minute fast food temptations. It saves money and calories!",
        color: "red",
      });
    }

    // Sugary drinks tips
    if (data.weeklyPattern.sugaryDrinks.logged >= 2) {
      tips.push({
        icon: "🥤",
        title: "Hydration Hack",
        message:
          "Replace sugary drinks with sparkling water + lemon. You'll save 500+ calories per week!",
        color: "yellow",
      });
    }

    // Late night eating tips
    if (data.weeklyPattern.lateNight.logged >= 2) {
      tips.push({
        icon: "🌙",
        title: "Late Night Snacking",
        message:
          "Eating 3+ hours before bed improves sleep quality and metabolism. Try herbal tea instead!",
        color: "purple",
      });
    }

    // General tips
    if (tips.length === 0) {
      tips.push({
        icon: "💡",
        title: "Pro Tip",
        message:
          "Drink a glass of water before each meal. It helps with portion control and keeps you hydrated!",
        color: "blue",
      });
    }

    return tips;
  };

  // ============= LOADING STATE =============

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

  // ============= RENDER =============

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const projectedWeight = calculateProjectedWeight();

  return (
    <AppLayout>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-500/90 backdrop-blur-lg text-white px-6 py-4 rounded-2xl shadow-lg animate-fade-in flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span className="font-medium">Logged successfully!</span>
        </div>
      )}

      <div className="min-h-screen pb-20">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold gradient-text-animated">
                Nutrition Hub
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Track patterns, build habits, join challenges
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="px-3 py-2 md:px-4 md:py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center gap-2"
              >
                <span>⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-2 md:px-4 md:py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center gap-2"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar */}
          <div className="grid grid-cols-3 gap-3 px-4 md:px-6 pb-4">
            {/* Current Weight */}
            <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">⚖️</span>
                <span className="text-xs text-gray-400">Weight</span>
              </div>
              <p className="text-lg font-bold text-white">
                {data.currentWeight.toFixed(1)} kg
              </p>
              <p className="text-xs text-gray-400">
                Goal: {data.goalWeight.toFixed(1)} kg
              </p>
            </div>

            {/* Avatar Health */}
            <div className="p-3 rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">💚</span>
                <span className="text-xs text-gray-400">Health Score</span>
              </div>
              <p className="text-lg font-bold text-white">
                {data.avatarHealth}/100
              </p>
              <p className="text-xs text-gray-400">Digital Twin</p>
            </div>

            {/* Weekly Patterns */}
            <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">📊</span>
                <span className="text-xs text-gray-400">Pattern</span>
              </div>
              <p className="text-lg font-bold text-white">
                {data.weeklyPattern.fastFood.logged +
                  data.weeklyPattern.sugaryDrinks.logged +
                  data.weeklyPattern.lateNight.logged}
              </p>
              <p className="text-xs text-gray-400">Logged this week</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 px-4 md:px-6 pb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("habits")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "habits"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Micro-Habits
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "challenges"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Challenges
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          {/* Allergies Badge */}
          {data.allergies.length > 0 && (
            <div className="bg-dark-card border border-white/5 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400 font-medium">
                ⚠️ Allergies:
              </span>
              {data.allergies.map((allergy, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-sm font-medium"
                >
                  🚫 {allergy}
                </span>
              ))}
            </div>
          )}

          {/* Pro Tips */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h3 className="text-lg font-bold text-white">Pro Tips</h3>
            </div>
            <div className="space-y-2">
              {generateProTips().map((tip, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border animate-fade-in ${
                    tip.color === "red"
                      ? "bg-red-500/10 border-red-500/30"
                      : tip.color === "yellow"
                      ? "bg-yellow-500/10 border-yellow-500/30"
                      : tip.color === "purple"
                      ? "bg-purple-500/10 border-purple-500/30"
                      : "bg-blue-500/10 border-blue-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div className="flex-1">
                      <h4
                        className={`font-medium text-sm mb-1 ${
                          tip.color === "red"
                            ? "text-red-400"
                            : tip.color === "yellow"
                            ? "text-yellow-400"
                            : tip.color === "purple"
                            ? "text-purple-400"
                            : "text-blue-400"
                        }`}
                      >
                        {tip.title}
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        {tip.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Cross-Feature Insights */}
              {data.crossFeatureInsights.length > 0 && (
                <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    🔗 Cross-Feature Intelligence
                  </h2>
                  <div className="space-y-3">
                    {data.crossFeatureInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border animate-fade-in ${
                          insight.type === "warning"
                            ? "bg-red-500/10 border-red-500/30"
                            : insight.type === "positive"
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-blue-500/10 border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{insight.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-medium ${
                                  insight.type === "warning"
                                    ? "text-red-400"
                                    : insight.type === "positive"
                                    ? "text-green-400"
                                    : "text-blue-400"
                                }`}
                              >
                                {insight.title}
                              </h3>
                              <span className="text-xs text-gray-500 uppercase">
                                from {insight.source}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {insight.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food Photo Analysis (Phase 2/3) */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    📸 Meal Recognition
                  </h2>
                  <span className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-primary text-xs font-medium">
                    AI Powered
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">📷</span>
                      </div>
                      <h3 className="text-white font-medium mb-1">
                        Take Photo
                      </h3>
                      <p className="text-gray-400 text-xs mb-3">
                        Snap a picture of your meal
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <span>•</span>
                        <span>Instant nutrition analysis</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Analysis */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍕</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm mb-1">
                          Last Analysis
                        </h4>
                        <p className="text-gray-400 text-xs">
                          Pizza detected - 850 cal
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <button className="w-full px-3 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg text-xs font-medium transition-all duration-300">
                        View Full History
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time & Place Patterns (Phase 2/3) */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  🕐 Time & Place Patterns
                </h2>

                <div className="space-y-4">
                  {/* Pattern Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Friday Pattern */}
                    <div className="bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🍔</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-orange-400 font-medium">
                              Friday Pattern
                            </h3>
                            <span className="px-2 py-0.5 bg-orange-500/20 rounded text-orange-400 text-xs">
                              Weekly
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">
                            You tend to eat 40% more on Fridays, especially fast
                            food
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="px-2 py-1 bg-white/5 rounded">
                              📍 Usually near work
                            </span>
                            <span className="px-2 py-1 bg-white/5 rounded">
                              🕐 6-8 PM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-orange-500/20">
                        <p className="text-orange-400 text-xs font-medium">
                          💡 Suggestion:
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Have a high-protein snack at 5 PM to reduce cravings
                        </p>
                      </div>
                    </div>

                    {/* Stress Period Pattern */}
                    <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">☕</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-purple-400 font-medium">
                              Stress Period
                            </h3>
                            <span className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-400 text-xs">
                              Detected
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">
                            During busy weeks, coffee intake increases by 60%
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="px-2 py-1 bg-white/5 rounded">
                              📍 Office area
                            </span>
                            <span className="px-2 py-1 bg-white/5 rounded">
                              🕐 Morning
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-purple-500/20">
                        <p className="text-purple-400 text-xs font-medium">
                          💡 Suggestion:
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Try green tea - same energy, less crash
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Insight */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div className="flex-1">
                        <h3 className="text-blue-400 font-medium mb-2">
                          Location Analysis
                        </h3>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-2xl font-bold text-white">45%</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Home meals
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-2xl font-bold text-white">35%</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Work area
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-2xl font-bold text-white">20%</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Restaurants
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Patterns */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  📅 Weekly Patterns
                </h2>

                <div className="space-y-6">
                  {/* Fast Food */}
                  <PatternItem
                    icon="🍔"
                    label="Fast Food"
                    logged={data.weeklyPattern.fastFood.logged}
                    limit={data.weeklyPattern.fastFood.limit}
                    onLog={() => logPattern("fastFood")}
                    status={getPatternStatus(
                      data.weeklyPattern.fastFood.logged,
                      data.weeklyPattern.fastFood.limit
                    )}
                  />

                  {/* Sugary Drinks */}
                  <PatternItem
                    icon="🥤"
                    label="Sugary Drinks"
                    logged={data.weeklyPattern.sugaryDrinks.logged}
                    limit={data.weeklyPattern.sugaryDrinks.limit}
                    onLog={() => logPattern("sugaryDrinks")}
                    status={getPatternStatus(
                      data.weeklyPattern.sugaryDrinks.logged,
                      data.weeklyPattern.sugaryDrinks.limit
                    )}
                  />

                  {/* Late Night */}
                  <PatternItem
                    icon="🌙"
                    label="Late Night Eating"
                    logged={data.weeklyPattern.lateNight.logged}
                    limit={data.weeklyPattern.lateNight.limit}
                    onLog={() => logPattern("lateNight")}
                    status={getPatternStatus(
                      data.weeklyPattern.lateNight.logged,
                      data.weeklyPattern.lateNight.limit
                    )}
                  />
                </div>
              </div>

              {/* Weight & Avatar */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Weight Projection */}
                <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-white mb-4">
                    ⚖️ Weight Projection
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current</span>
                      <span className="text-2xl font-bold text-white">
                        {data.currentWeight} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">8-Week Projection</span>
                      <span className="text-2xl font-bold text-primary">
                        {projectedWeight.toFixed(1)} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Goal</span>
                      <span className="text-2xl font-bold text-secondary">
                        {data.goalWeight} kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Avatar Health */}
                <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-white mb-4">
                    🎮 Avatar Health
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {data.avatarHealth}
                      </span>
                      <span className="text-gray-400">/100</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-green-500 to-primary transition-all duration-1000"
                        style={{ width: `${data.avatarHealth}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-400">
                      {data.avatarHealth >= 80
                        ? "🌟 Thriving!"
                        : data.avatarHealth >= 60
                        ? "💪 Doing well"
                        : "⚠️ Needs attention"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MICRO-HABITS TAB */}
          {activeTab === "habits" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    🎯 Micro-Habits
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Small changes, big impact
                  </p>
                </div>
                <button
                  onClick={() => setShowHabitModal(true)}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  + Add Habit
                </button>
              </div>

              <div className="grid gap-4">
                {data.microHabits
                  .filter((h) => h.active)
                  .map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggleDay={toggleHabitDay}
                    />
                  ))}
              </div>

              {data.microHabits.filter((h) => h.active).length === 0 && (
                <div className="bg-dark-card border border-white/5 rounded-2xl p-12 text-center">
                  <span className="text-6xl mb-4 block">🎯</span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No active habits yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Start building better nutrition habits today!
                  </p>
                  <button
                    onClick={() => setShowHabitModal(true)}
                    className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-all duration-300"
                  >
                    Create Your First Habit
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CHALLENGES TAB */}
          {activeTab === "challenges" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  🏆 Nutrition Challenges
                </h2>
                <p className="text-gray-400 text-sm">
                  Join challenges and compete with friends
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {data.challenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onJoin={() => joinChallenge(challenge.id)}
                    onProgress={(inc) =>
                      updateChallengeProgress(challenge.id, inc)
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Habit Modal */}
      {showHabitModal && (
        <HabitModal
          onClose={() => setShowHabitModal(false)}
          onAdd={addMicroHabit}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">⚠️</span>
              <h2 className="text-2xl font-bold text-white mb-2">
                Reset Nutrition Data?
              </h2>
              <p className="text-gray-400 text-sm">
                This will reset all tracking data (patterns, habits, challenges)
                but keep your onboarding preferences.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResetNutritionData}
                className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-medium transition-all duration-300"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Settings Modal */}
      {showOnboardingModal && (
        <OnboardingSettingsModal
          onClose={() => setShowOnboardingModal(false)}
          onSave={handleUpdateOnboardingAnswers}
        />
      )}
    </AppLayout>
  );
}

// ============= CHILD COMPONENTS =============

function PatternItem({
  icon,
  label,
  logged,
  limit,
  onLog,
  status,
}: {
  icon: string;
  label: string;
  logged: number;
  limit: number;
  onLog: () => void;
  status: { color: string; text: string; emoji: string };
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-white font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">
              {logged}/{limit}
            </span>
            <span className="text-lg">{status.emoji}</span>
          </div>
          <button
            onClick={onLog}
            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Log +1
          </button>
        </div>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            status.color === "green"
              ? "bg-green-500"
              : status.color === "yellow"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${Math.min((logged / limit) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

function HabitCard({
  habit,
  onToggleDay,
}: {
  habit: MicroHabit;
  onToggleDay: (habitId: string, day: number) => void;
}) {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const progress = (habit.completedDays.length / habit.targetDays) * 100;

  return (
    <div className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start gap-4">
        <span className="text-4xl">{habit.icon}</span>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {habit.title}
              </h3>
              <p className="text-sm text-gray-400">{habit.description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                habit.category === "reduce"
                  ? "bg-red-500/20 text-red-400"
                  : habit.category === "add"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {habit.category}
            </span>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {habit.completedDays.length}/{habit.targetDays} days this week
              </span>
              <span className="text-sm font-bold text-primary">
                {progress.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex gap-2 justify-between mt-4">
              {daysOfWeek.map((day, idx) => {
                const isCompleted = habit.completedDays.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => onToggleDay(habit.id, idx)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                      isCompleted
                        ? "bg-primary text-white scale-110"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({
  challenge,
  onJoin,
  onProgress,
}: {
  challenge: Challenge;
  onJoin: () => void;
  onProgress: (increment: number) => void;
}) {
  const progressPercent = (challenge.progress / challenge.target) * 100;
  const daysLeft = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{challenge.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">
            {challenge.title}
          </h3>
          <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                challenge.type === "solo"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {challenge.type}
            </span>
            <span className="text-xs text-gray-500">{daysLeft} days left</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-bold text-primary">
            {challenge.progress}/{challenge.target}
          </span>
        </div>

        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {challenge.type === "social" && challenge.participants && (
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-gray-400">With:</span>
            <div className="flex -space-x-2">
              {challenge.participants.map((p, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-primary/40 to-secondary/40 border-2 border-dark-card flex items-center justify-center text-xs font-bold text-white"
                >
                  {p[0]}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => onProgress(1)}
          className="w-full px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          Log Progress +1
        </button>
      </div>
    </div>
  );
}

function HabitModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (
    habit: Omit<MicroHabit, "id" | "completedDays" | "startDate">
  ) => void;
}) {
  const presetHabits = [
    {
      title: "No Soda This Week",
      description: "Cut out all sugary drinks",
      targetDays: 7,
      icon: "🚫🥤",
      category: "reduce" as const,
      active: true,
    },
    {
      title: "Daily Salad",
      description: "Add one serving of salad each day",
      targetDays: 7,
      icon: "🥗",
      category: "add" as const,
      active: true,
    },
    {
      title: "Water Before Coffee",
      description: "Drink water before your morning coffee",
      targetDays: 7,
      icon: "💧",
      category: "replace" as const,
      active: true,
    },
    {
      title: "No Fast Food",
      description: "Skip fast food for the entire week",
      targetDays: 7,
      icon: "🚫🍔",
      category: "reduce" as const,
      active: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-dark-card">
          <h2 className="text-2xl font-bold text-white">
            Choose a Micro-Habit
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid gap-4">
          {presetHabits.map((habit, idx) => (
            <button
              key={idx}
              onClick={() => onAdd(habit)}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/40 rounded-xl text-left transition-all duration-300 hover:scale-102"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{habit.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {habit.title}
                  </h3>
                  <p className="text-sm text-gray-400">{habit.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    habit.category === "reduce"
                      ? "bg-red-500/20 text-red-400"
                      : habit.category === "add"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {habit.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingSettingsModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.optionalAnswers?.nutrition || {};
  });

  const questions = [
    {
      key: "allergies",
      label: "Do you have any food allergies or sensitivities?",
      options: [
        { value: "", label: "None" },
        { value: "dairy", label: "Dairy / Lactose" },
        { value: "gluten", label: "Gluten / Wheat" },
        { value: "nuts", label: "Tree nuts / Peanuts" },
        { value: "shellfish", label: "Shellfish" },
        { value: "eggs", label: "Eggs" },
        { value: "soy", label: "Soy" },
      ],
    },
    {
      key: "diet",
      label: "Do you follow any specific diet or eating style?",
      options: [
        { value: "no", label: "No specific diet" },
        { value: "high-protein", label: "High-protein / gym-focused" },
        { value: "low-carb", label: "Low-carb / keto style" },
        { value: "vegetarian", label: "Vegetarian / vegan" },
        { value: "mediterranean", label: "Mediterranean" },
        { value: "intermittent-fasting", label: "Intermittent fasting" },
      ],
    },
    {
      key: "fastfood",
      label: "How often do you eat fast food or takeout per week?",
      options: [
        { value: "rarely", label: "Rarely / almost never" },
        { value: "1-2", label: "1–2 times per week" },
        { value: "3-4", label: "3–4 times per week" },
        { value: "5+", label: "5+ times per week" },
      ],
    },
    {
      key: "sugary",
      label: "How often do you drink sugary drinks per week?",
      options: [
        { value: "never", label: "Never" },
        { value: "1-2", label: "1–2 times per week" },
        { value: "3-5", label: "3–5 times per week" },
        { value: "daily", label: "Almost every day" },
      ],
    },
    {
      key: "hydration",
      label: "How much water do you drink daily?",
      options: [
        { value: "<4", label: "Less than 4 glasses" },
        { value: "4-6", label: "4-6 glasses" },
        { value: "6-8", label: "6-8 glasses" },
        { value: "8+", label: "More than 8 glasses" },
      ],
    },
    {
      key: "meals",
      label: "How many meals do you usually eat per day?",
      options: [
        { value: "1-2", label: "1-2 meals" },
        { value: "3", label: "3 meals" },
        { value: "4+", label: "More than 3 meals" },
        { value: "varies", label: "Varies day to day" },
      ],
    },
  ];

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(answers);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-dark-card z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Nutrition Preferences
            </h2>
            <p className="text-sm text-gray-400">
              Update your nutrition settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {questions.map((question) => (
            <div key={question.key} className="space-y-3">
              <label className="block text-sm sm:text-base font-medium text-gray-200">
                {question.label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 text-left transition-all duration-300 text-sm sm:text-base ${
                      answers[question.key] === option.value
                        ? "border-primary bg-primary/20 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-primary/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-6 border-t border-white/5 flex gap-3 sticky bottom-0 bg-dark-card">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl font-medium transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= DEFAULT DATA GENERATORS =============

function generateDefaultHabits(): MicroHabit[] {
  return [
    {
      id: "1",
      title: "No Soda This Week",
      description: "Cut out all sugary drinks for 7 days",
      targetDays: 7,
      completedDays: [0, 1], // Sun, Mon completed
      icon: "🚫🥤",
      category: "reduce",
      active: true,
      startDate: new Date().toISOString(),
    },
  ];
}

function generateDefaultChallenges(): Challenge[] {
  const today = new Date();
  const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  return [
    {
      id: "c1",
      title: "7-Day Water Challenge",
      description: "Drink 8 glasses of water every day",
      type: "solo",
      duration: 7,
      progress: 3,
      target: 7,
      startDate: today.toISOString(),
      endDate: weekLater.toISOString(),
      icon: "💧",
    },
    {
      id: "c2",
      title: "No Fast Food February",
      description: "Avoid all fast food for 2 weeks",
      type: "social",
      duration: 14,
      progress: 5,
      target: 14,
      participants: ["Sarah", "Mike", "Alex"],
      startDate: today.toISOString(),
      endDate: twoWeeksLater.toISOString(),
      icon: "🥗",
    },
    {
      id: "c3",
      title: "Veggie Power Week",
      description: "Eat 5+ servings of vegetables daily",
      type: "social",
      duration: 7,
      progress: 2,
      target: 7,
      participants: ["Emma", "John"],
      startDate: today.toISOString(),
      endDate: weekLater.toISOString(),
      icon: "🥦",
    },
  ];
}
