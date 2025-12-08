"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface SleepData {
  weeklyHours: number[]; // Sun-Sat
  weeklyQuality: number[]; // 1-5 stars, Sun-Sat
  idealSleep: number; // hours
  recoveryScore: number; // 0-100
  sleepDebt: number; // hours behind
  avatarImpact: number; // -10 to +10
  lastUpdated: string;
}

export default function Sleep() {
  const router = useRouter();
  const [data, setData] = useState<SleepData | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logHours, setLogHours] = useState(7);
  const [logQuality, setLogQuality] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize or load sleep data
  useEffect(() => {
    // Load from localStorage and check session
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

    const initialData: SleepData = {
      weeklyHours: [7, 6.5, 8, 7.5, 6, 5.5, 7.5],
      weeklyQuality: [4, 3, 4, 4, 3, 2, 4],
      idealSleep: 8,
      recoveryScore: 75,
      sleepDebt: 4.5,
      avatarImpact: 0,
      lastUpdated: new Date().toISOString(),
    };
    setData(initialData);
  }, [router]);

  // Calculate metrics
  const calculateMetrics = () => {
    if (!data) return null;

    const avgSleep = data.weeklyHours.reduce((a, b) => a + b, 0) / 7;
    const avgQuality = data.weeklyQuality.reduce((a, b) => a + b, 0) / 7;
    const consistency = calculateConsistency(data.weeklyHours);
    const poorSleepDays = data.weeklyHours.filter((h) => h < 6).length;

    return {
      avgSleep: avgSleep.toFixed(1),
      avgQuality: avgQuality.toFixed(1),
      consistency: consistency.toFixed(0),
      poorSleepDays,
    };
  };

  const calculateConsistency = (hours: number[]) => {
    const avg = hours.reduce((a, b) => a + b, 0) / hours.length;
    const variance =
      hours.reduce((sum, h) => sum + Math.pow(h - avg, 2), 0) / hours.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, 100 - stdDev * 20);
  };

  // Log sleep
  const handleLogSleep = () => {
    if (!data) return;

    const today = new Date().getDay();
    const newData = { ...data };
    newData.weeklyHours[today] = logHours;
    newData.weeklyQuality[today] = logQuality;

    // Recalculate recovery score
    const avgSleep = newData.weeklyHours.reduce((a, b) => a + b, 0) / 7;
    const avgQuality = newData.weeklyQuality.reduce((a, b) => a + b, 0) / 7;
    const consistency = calculateConsistency(newData.weeklyHours);

    newData.recoveryScore = Math.round(
      (avgSleep / newData.idealSleep) * 40 + avgQuality * 12 + consistency * 0.2
    );

    // Calculate sleep debt
    const totalNeeded = newData.idealSleep * 7;
    const totalSlept = newData.weeklyHours.reduce((a, b) => a + b, 0);
    newData.sleepDebt = Math.max(0, totalNeeded - totalSlept);

    // Avatar impact
    newData.avatarImpact =
      newData.recoveryScore >= 80 ? 5 : newData.recoveryScore < 60 ? -5 : 0;

    newData.lastUpdated = new Date().toISOString();

    setData(newData);

    // Update localStorage with sleep data
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = {
        ...user,
        sleepData: newData,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setShowLogModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Generate insights
  const generateInsights = () => {
    if (!data) return [];

    const insights = [];
    const metrics = calculateMetrics();
    if (!metrics) return [];

    // Poor sleep warning
    if (metrics.poorSleepDays >= 3) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Sleep Deprivation Alert",
        message: `You've slept <6 hours for ${metrics.poorSleepDays} days this week. This may weaken your immune system and cognitive function.`,
      });
    }

    // Consistency warning
    if (parseInt(metrics.consistency) < 70) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Inconsistent Sleep Schedule",
        message:
          "Your bedtime varies too much. Inconsistent sleep affects your circadian rhythm and recovery quality.",
      });
    }

    // Sleep debt
    if (data.sleepDebt > 5) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "High Sleep Debt",
        message: `You're ${data.sleepDebt.toFixed(
          1
        )}h behind this week. This accumulates and may cause burnout.`,
      });
    }

    // Positive feedback
    if (data.recoveryScore >= 85) {
      insights.push({
        type: "success",
        icon: "🎉",
        title: "Excellent Recovery!",
        message:
          "Your sleep pattern is optimal. Keep this up for peak performance!",
      });
    }

    // Suggestions
    if (parseFloat(metrics.avgSleep) < 7) {
      insights.push({
        type: "suggestion",
        icon: "💡",
        title: "Improve Sleep Duration",
        message:
          "Try going to bed 30 minutes earlier. Even small increases boost recovery significantly.",
      });
    }

    return insights;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading sleep data...</p>
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
          <span className="font-medium">Sleep logged successfully!</span>
        </div>
      )}

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-6">
              Log Last Night's Sleep
            </h3>

            <div className="space-y-6">
              {/* Hours Slider */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Hours Slept
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="0.5"
                    value={logHours}
                    onChange={(e) => setLogHours(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-white w-16">
                    {logHours}h
                  </span>
                </div>
              </div>

              {/* Quality Rating */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Sleep Quality
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setLogQuality(star)}
                      className={`text-3xl transition-all ${
                        star <= logQuality
                          ? "scale-110"
                          : "opacity-30 grayscale"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogSleep}
                  className="flex-1 px-4 py-3 bg-gradient-animated rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Log Sleep
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Sleep & Recovery
            </h1>
            <p className="text-gray-400">
              Track your sleep patterns and recovery
            </p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-6 py-3 bg-gradient-animated rounded-xl text-white font-semibold hover:scale-105 transition-transform"
          >
            + Log Sleep
          </button>
        </div>

        {/* Recovery Score Card */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recovery Score</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Circle */}
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
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${
                      (data.recoveryScore / 100) * 502.4
                    } 502.4`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {data.recoveryScore}
                  </span>
                  <span className="text-gray-400 text-sm">/100</span>
                </div>
              </div>
              <p
                className={`mt-4 text-lg font-medium ${
                  data.recoveryScore >= 80
                    ? "text-green-400"
                    : data.recoveryScore >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {data.recoveryScore >= 80
                  ? "Excellent Recovery"
                  : data.recoveryScore >= 60
                  ? "Moderate Recovery"
                  : "Poor Recovery"}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    Avg Sleep Duration
                  </span>
                  <span className="text-white font-bold">
                    {metrics?.avgSleep}h
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${
                        (parseFloat(metrics?.avgSleep || "0") /
                          data.idealSleep) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Sleep Quality</span>
                  <span className="text-white font-bold">
                    {metrics?.avgQuality}/5
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= parseFloat(metrics?.avgQuality || "0")
                          ? ""
                          : "opacity-30"
                      }
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    Schedule Consistency
                  </span>
                  <span className="text-white font-bold">
                    {metrics?.consistency}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${metrics?.consistency}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 text-sm">
                    Sleep Debt This Week
                  </span>
                  <span className="text-red-400 font-bold">
                    {data.sleepDebt.toFixed(1)}h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Sleep Chart */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Weekly Sleep Pattern
          </h2>

          <div className="flex items-end justify-between gap-2 h-64">
            {data.weeklyHours.map((hours, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="relative w-full bg-white/5 rounded-lg overflow-hidden"
                  style={{ height: "200px" }}
                >
                  {/* Ideal line */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-green-500/50"
                    style={{ bottom: `${(data.idealSleep / 12) * 100}%` }}
                  ></div>
                  {/* Actual sleep */}
                  <div
                    className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                      hours >= data.idealSleep
                        ? "bg-linear-to-t from-green-500 to-green-400"
                        : hours >= 6
                        ? "bg-linear-to-t from-yellow-500 to-yellow-400"
                        : "bg-linear-to-t from-red-500 to-red-400"
                    }`}
                    style={{ height: `${(hours / 12) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">{daysOfWeek[index]}</p>
                <p className="text-xs text-white font-medium">{hours}h</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-gray-400">Optimal (≥8h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-gray-400">Adequate (6-8h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-gray-400">Poor (&lt;6h)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Avatar Impact */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Avatar Impact</h2>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/40">
                <span className="text-6xl">😴</span>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">
                  Sleep affects your avatar health
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`text-2xl font-bold ${
                      data.avatarImpact > 0
                        ? "text-green-400"
                        : data.avatarImpact < 0
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {data.avatarImpact > 0 ? "+" : ""}
                    {data.avatarImpact}
                  </span>
                  <span className="text-gray-400">health points</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  data.recoveryScore >= 80
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-yellow-500/10 border border-yellow-500/30"
                }`}
              >
                <p
                  className={`text-sm ${
                    data.recoveryScore >= 80
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {data.recoveryScore >= 80
                    ? "🌟 Your avatar is well-rested and energized!"
                    : "⚠️ Poor sleep may reduce your avatar's energy and performance"}
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-left">
                <p className="text-blue-400 text-sm font-medium mb-2">
                  💡 Prediction
                </p>
                <p className="text-gray-300 text-sm">
                  {data.recoveryScore >= 80
                    ? "Maintain this sleep pattern to keep your avatar at peak health for 30+ days."
                    : metrics && metrics.poorSleepDays >= 3
                    ? "If you continue sleeping <6h, your avatar's health may drop by 10 points in 2 weeks."
                    : "Improve your sleep to 8h/night to boost your avatar's health by 5 points."}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Stats</h2>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <div>
                      <p className="text-white font-medium">Best Sleep Day</p>
                      <p className="text-gray-400 text-sm">
                        {
                          daysOfWeek[
                            data.weeklyHours.indexOf(
                              Math.max(...data.weeklyHours)
                            )
                          ]
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-white font-bold">
                    {Math.max(...data.weeklyHours)}h
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-white font-medium">Worst Sleep Day</p>
                      <p className="text-gray-400 text-sm">
                        {
                          daysOfWeek[
                            data.weeklyHours.indexOf(
                              Math.min(...data.weeklyHours)
                            )
                          ]
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-white font-bold">
                    {Math.min(...data.weeklyHours)}h
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-white font-medium">Sleep Efficiency</p>
                      <p className="text-gray-400 text-sm">
                        Quality × Duration
                      </p>
                    </div>
                  </div>
                  <span className="text-white font-bold">
                    {(
                      ((parseFloat(metrics?.avgSleep || "0") *
                        parseFloat(metrics?.avgQuality || "0")) /
                        40) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="text-white font-medium">Poor Sleep Days</p>
                      <p className="text-gray-400 text-sm">Less than 6 hours</p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      (metrics?.poorSleepDays || 0) >= 3
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {metrics?.poorSleepDays}/7
                  </span>
                </div>
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
