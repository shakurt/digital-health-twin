"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface MindfulnessData {
  weeklyPractice: boolean[]; // Sun-Sat, did meditation?
  weeklyMinutes: number[]; // Sun-Sat, minutes practiced
  weeklyMood: number[]; // Sun-Sat, mood 1-5
  weeklyStress: number[]; // Sun-Sat, stress 1-10
  streak: number; // consecutive days
  mentalScore: number; // 0-100
  avatarMentalHealth: number; // 0-100
  lastUpdated: string;
}

export default function Mindfulness() {
  const router = useRouter();
  const [data, setData] = useState<MindfulnessData | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState(3);
  const [selectedStress, setSelectedStress] = useState(5);
  const [practiceMinutes, setPracticeMinutes] = useState(10);
  const [showSuccess, setShowSuccess] = useState(false);

  const moodEmojis = ["😢", "😟", "😐", "🙂", "😊"];
  const moodLabels = ["Very Bad", "Bad", "Neutral", "Good", "Great"];

  // Initialize or load mindfulness data
  useEffect(() => {
    // Load from localStorage only
    let foundUser = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user_")) {
        foundUser = true;
        break;
      }
    }
    if (!foundUser) {
      router.push("/signin");
      return;
    }

    const storedData = sessionStorage.getItem("mindfulnessData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const initialData: MindfulnessData = {
        weeklyPractice: [true, false, true, true, false, true, true],
        weeklyMinutes: [10, 0, 15, 10, 0, 20, 15],
        weeklyMood: [4, 3, 4, 4, 3, 5, 4],
        weeklyStress: [5, 7, 5, 4, 6, 3, 4],
        streak: 2,
        mentalScore: 78,
        avatarMentalHealth: 82,
        lastUpdated: new Date().toISOString(),
      };
      setData(initialData);
      sessionStorage.setItem("mindfulnessData", JSON.stringify(initialData));
    }
  }, [router]);

  // Calculate metrics
  const calculateMetrics = () => {
    if (!data) return null;

    const practiceDays = data.weeklyPractice.filter(Boolean).length;
    const totalMinutes = data.weeklyMinutes.reduce((a, b) => a + b, 0);
    const avgMood = data.weeklyMood.reduce((a, b) => a + b, 0) / 7;
    const avgStress = data.weeklyStress.reduce((a, b) => a + b, 0) / 7;

    return {
      practiceDays,
      totalMinutes,
      avgMood: avgMood.toFixed(1),
      avgStress: avgStress.toFixed(1),
    };
  };

  // Log mood and stress
  const handleLogMood = () => {
    if (!data) return;

    const today = new Date().getDay();
    const newData = { ...data };
    newData.weeklyMood[today] = selectedMood;
    newData.weeklyStress[today] = selectedStress;

    // Recalculate mental score
    const avgMood = newData.weeklyMood.reduce((a, b) => a + b, 0) / 7;
    const avgStress = newData.weeklyStress.reduce((a, b) => a + b, 0) / 7;
    const practiceDays = newData.weeklyPractice.filter(Boolean).length;

    newData.mentalScore = Math.round(
      avgMood * 15 +
        (10 - avgStress) * 8 +
        practiceDays * 3 +
        newData.streak * 2
    );
    newData.avatarMentalHealth = Math.min(100, newData.mentalScore + 5);

    newData.lastUpdated = new Date().toISOString();

    setData(newData);
    sessionStorage.setItem("mindfulnessData", JSON.stringify(newData));

    // Also update localStorage with mindfulness data
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const updatedUser = {
      ...user,
      mindfulnessData: newData,
    };
    localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    setShowMoodModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Log practice
  const handleLogPractice = () => {
    if (!data) return;

    const today = new Date().getDay();
    const newData = { ...data };
    const wasPracticing = newData.weeklyPractice[today];

    newData.weeklyPractice[today] = true;
    newData.weeklyMinutes[today] =
      (newData.weeklyMinutes[today] || 0) + practiceMinutes;

    // Update streak
    if (!wasPracticing) {
      const yesterday = (today + 6) % 7;
      if (newData.weeklyPractice[yesterday]) {
        newData.streak += 1;
      } else {
        newData.streak = 1;
      }
    }

    // Recalculate mental score
    const avgMood = newData.weeklyMood.reduce((a, b) => a + b, 0) / 7;
    const avgStress = newData.weeklyStress.reduce((a, b) => a + b, 0) / 7;
    const practiceDays = newData.weeklyPractice.filter(Boolean).length;

    newData.mentalScore = Math.round(
      avgMood * 15 +
        (10 - avgStress) * 8 +
        practiceDays * 3 +
        newData.streak * 2
    );
    newData.avatarMentalHealth = Math.min(100, newData.mentalScore + 5);

    newData.lastUpdated = new Date().toISOString();

    setData(newData);
    sessionStorage.setItem("mindfulnessData", JSON.stringify(newData));

    // Also update localStorage with mindfulness data
    const user2 = JSON.parse(sessionStorage.getItem("user") || "{}");
    const updatedUser2 = {
      ...user2,
      mindfulnessData: newData,
    };
    localStorage.setItem(`user_${user2.email}`, JSON.stringify(updatedUser2));
    sessionStorage.setItem("user", JSON.stringify(updatedUser2));

    setShowPracticeModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Generate insights
  const generateInsights = () => {
    if (!data) return [];

    const insights = [];
    const metrics = calculateMetrics();
    if (!metrics) return [];

    // Stress warning
    if (parseFloat(metrics.avgStress) >= 7) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "High Stress Detected",
        message: `Your average stress level is ${metrics.avgStress}/10. This may affect your sleep quality and eating habits. Try 10 minutes of meditation today.`,
      });
    }

    // Low practice warning
    if (metrics.practiceDays < 3) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Low Mindfulness Practice",
        message:
          "You've only practiced mindfulness 2 days this week. Regular practice reduces stress by up to 30%.",
      });
    }

    // Streak milestone
    if (data.streak >= 7) {
      insights.push({
        type: "success",
        icon: "🎉",
        title: `${data.streak}-Day Streak!`,
        message: `Amazing! You've practiced mindfulness for ${data.streak} consecutive days. This boosts your avatar's mental health by +5.`,
      });
    }

    // Positive feedback
    if (data.mentalScore >= 85) {
      insights.push({
        type: "success",
        icon: "🌟",
        title: "Excellent Mental Health!",
        message:
          "Your mindfulness practice is paying off. Keep this balance for optimal well-being.",
      });
    }

    // Mood pattern
    const moodTrend = data.weeklyMood.slice(-3).reduce((a, b) => a + b, 0) / 3;
    if (moodTrend < 3) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Low Mood Pattern",
        message:
          "Your mood has been lower than usual lately. Consider talking to someone or increasing mindfulness practice.",
      });
    }

    // Suggestions
    if (metrics.practiceDays < 5) {
      insights.push({
        type: "suggestion",
        icon: "💡",
        title: "Build a Daily Habit",
        message:
          "Try practicing at the same time each day - morning meditation sets a positive tone for the entire day.",
      });
    }

    return insights;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading mindfulness data...</p>
        </div>
      </div>
    );
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const metrics = calculateMetrics();
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

      {/* Mood Modal */}
      {showMoodModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-6">
              Log Today's Mood & Stress
            </h3>

            <div className="space-y-6">
              {/* Mood Selector */}
              <div>
                <label className="text-gray-300 text-sm mb-3 block">
                  How do you feel today?
                </label>
                <div className="flex justify-between gap-2">
                  {moodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(index + 1)}
                      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedMood === index + 1
                          ? "border-primary bg-primary/20 scale-110"
                          : "border-white/10 hover:border-primary/40"
                      }`}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs text-gray-400">
                        {moodLabels[index]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Slider */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Stress Level
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={selectedStress}
                    onChange={(e) =>
                      setSelectedStress(parseInt(e.target.value))
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-400">High</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-white">
                    {selectedStress}/10
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMoodModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogMood}
                  className="flex-1 px-4 py-3 bg-gradient-animated rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Log Mood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practice Modal */}
      {showPracticeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-6">
              Log Mindfulness Practice
            </h3>

            <div className="space-y-6">
              {/* Quick Practice Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map((min) => (
                  <button
                    key={min}
                    onClick={() => setPracticeMinutes(min)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      practiceMinutes === min
                        ? "border-primary bg-primary/20"
                        : "border-white/10 hover:border-primary/40"
                    }`}
                  >
                    <p className="text-2xl font-bold text-white">{min}</p>
                    <p className="text-xs text-gray-400">min</p>
                  </button>
                ))}
              </div>

              {/* Custom Minutes */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Or enter custom minutes
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={practiceMinutes}
                  onChange={(e) => setPracticeMinutes(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/40 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPracticeModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogPractice}
                  className="flex-1 px-4 py-3 bg-gradient-animated rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Log Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mindfulness</h1>
            <p className="text-gray-400">
              Track your mental wellness and practice
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowMoodModal(true)}
              className="px-6 py-3 bg-secondary/20 border border-secondary/40 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              Log Mood
            </button>
            <button
              onClick={() => setShowPracticeModal(true)}
              className="px-6 py-3 bg-gradient-animated rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              + Log Practice
            </button>
          </div>
        </div>

        {/* Mental Score Card */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Mental Wellness Score
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Gauge */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90" width="192" height="192">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-white/5"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#mentalGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${
                      (data.mentalScore / 100) * 502.4
                    } 502.4`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="mentalGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {data.mentalScore}
                  </span>
                  <span className="text-gray-400 text-sm">/100</span>
                </div>
              </div>
              <p
                className={`mt-4 text-lg font-medium ${
                  data.mentalScore >= 80
                    ? "text-green-400"
                    : data.mentalScore >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {data.mentalScore >= 80
                  ? "Excellent Mental Health"
                  : data.mentalScore >= 60
                  ? "Good Mental Health"
                  : "Needs Attention"}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">
                    🔥 Current Streak
                  </span>
                  <span className="text-white font-bold text-2xl">
                    {data.streak} days
                  </span>
                </div>
                {data.streak >= 7 && (
                  <p className="text-primary text-xs">
                    🎉 Weekly streak bonus: +5 avatar health!
                  </p>
                )}
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    Practice Days This Week
                  </span>
                  <span className="text-white font-bold">
                    {metrics?.practiceDays}/7
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{
                      width: `${((metrics?.practiceDays || 0) / 7) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Minutes</span>
                  <span className="text-white font-bold">
                    {metrics?.totalMinutes} min
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Goal: 100 min/week</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-gray-400 text-xs mb-1">Avg Mood</p>
                  <p className="text-3xl">
                    {
                      moodEmojis[
                        Math.round(parseFloat(metrics?.avgMood || "3")) - 1
                      ]
                    }
                  </p>
                  <p className="text-white text-sm font-medium">
                    {metrics?.avgMood}/5
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-gray-400 text-xs mb-1">Avg Stress</p>
                  <p className="text-3xl">
                    {parseFloat(metrics?.avgStress || "5") >= 7
                      ? "😰"
                      : parseFloat(metrics?.avgStress || "5") >= 4
                      ? "😐"
                      : "😌"}
                  </p>
                  <p className="text-white text-sm font-medium">
                    {metrics?.avgStress}/10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Practice Chart */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Practice</h2>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-400 mb-2">{day}</p>
                <div
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                    data.weeklyPractice[index]
                      ? "bg-linear-to-br from-primary to-secondary"
                      : "bg-white/5"
                  }`}
                >
                  <span className="text-2xl">
                    {data.weeklyPractice[index] ? "✓" : "-"}
                  </span>
                  {data.weeklyMinutes[index] > 0 && (
                    <p className="text-xs text-white mt-1">
                      {data.weeklyMinutes[index]}m
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mood & Stress Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">Mood Trend</h3>
              <div className="flex items-end justify-between gap-1 h-32">
                {data.weeklyMood.map((mood, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="relative w-full bg-white/5 rounded-lg overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-linear-to-t from-green-500 to-green-400 rounded-lg transition-all duration-500"
                        style={{ height: `${(mood / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {daysOfWeek[index].charAt(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Stress Trend</h3>
              <div className="flex items-end justify-between gap-1 h-32">
                {data.weeklyStress.map((stress, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="relative w-full bg-white/5 rounded-lg overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      <div
                        className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                          stress >= 7
                            ? "bg-linear-to-t from-red-500 to-red-400"
                            : stress >= 4
                            ? "bg-linear-to-t from-yellow-500 to-yellow-400"
                            : "bg-linear-to-t from-green-500 to-green-400"
                        }`}
                        style={{ height: `${(stress / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {daysOfWeek[index].charAt(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Mental Health */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Avatar Mental Health
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 border-4 border-secondary/40">
                <span className="text-6xl">🧘</span>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">
                  Mental Health Score
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-white">
                    {data.avatarMentalHealth}
                  </span>
                  <span className="text-gray-400">/100</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto mt-2">
                  <div
                    className="h-full bg-linear-to-r from-secondary to-accent transition-all duration-1000"
                    style={{ width: `${data.avatarMentalHealth}%` }}
                  ></div>
                </div>
              </div>

              <p
                className={`text-sm font-medium ${
                  data.avatarMentalHealth >= 80
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {data.avatarMentalHealth >= 80
                  ? "🌟 Your avatar is mentally balanced and focused!"
                  : "⚠️ Your avatar needs more mindfulness practice"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-400 text-sm font-medium mb-2">
                  💡 Impact Prediction
                </p>
                <p className="text-gray-300 text-sm">
                  {data.streak >= 7
                    ? "Maintain your 7+ day streak to keep your avatar's mental health above 85 for the next month!"
                    : metrics && metrics.practiceDays < 3
                    ? "If you practice less than 3 days/week, your avatar's mental health may drop by 10 points in 2 weeks."
                    : "Practice mindfulness 5+ days/week to boost your avatar's mental health by 8 points!"}
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white text-sm font-medium mb-2">
                  🔗 Connected Effects
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• High stress affects sleep quality (-10% recovery)</li>
                  <li>• Low mood may increase unhealthy food cravings</li>
                  <li>• Regular practice improves overall avatar health</li>
                </ul>
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
