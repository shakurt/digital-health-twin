"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

type Chronotype = "early" | "intermediate" | "night-owl";

interface SleepDay {
  label: string;
  hours: number;
  quality: number; // 1-5
}

interface SleepData {
  week: SleepDay[]; // Sun - Sat
  idealSleep: number;
  recoveryScore: number;
  sleepDebt: number;
  chronotype: Chronotype;
  stages: {
    rem: number;
    deep: number;
    light: number;
    awake: number;
  };
  bedtime: {
    target: string;
    actual: string;
    adherence: number; // percentage
  };
  wakeTime: {
    target: string;
    actual: string;
    adherence: number; // percentage
  };
  lastNight: {
    hours: number;
    quality: number;
    efficiency: number;
    latency: number; // minutes to fall asleep
    disturbances: number;
  };
  lastUpdated: string;
}

const defaultSleepData: SleepData = {
  week: [
    { label: "Sun", hours: 7.8, quality: 4.3 },
    { label: "Mon", hours: 6.9, quality: 3.7 },
    { label: "Tue", hours: 7.4, quality: 4.1 },
    { label: "Wed", hours: 8.1, quality: 4.6 },
    { label: "Thu", hours: 6.2, quality: 3.1 },
    { label: "Fri", hours: 5.9, quality: 3.0 },
    { label: "Sat", hours: 8.3, quality: 4.7 },
  ],
  idealSleep: 8,
  recoveryScore: 78,
  sleepDebt: 3.6,
  chronotype: "intermediate",
  stages: {
    rem: 23,
    deep: 19,
    light: 49,
    awake: 9,
  },
  bedtime: {
    target: "22:45",
    actual: "23:20",
    adherence: 82,
  },
  wakeTime: {
    target: "06:45",
    actual: "07:05",
    adherence: 88,
  },
  lastNight: {
    hours: 7.2,
    quality: 4.0,
    efficiency: 91,
    latency: 14,
    disturbances: 2,
  },
  lastUpdated: new Date().toISOString(),
};

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
};

const routineAdherence = (actual: string, target: string) => {
  const diff = Math.abs(toMinutes(actual) - toMinutes(target));
  if (diff <= 10) return 100;
  if (diff <= 30) return 88;
  if (diff <= 60) return 76;
  return 64;
};

const consistencyScore = (hours: number[]) => {
  const avg = hours.reduce((sum, h) => sum + h, 0) / hours.length;
  const variance =
    hours.reduce((sum, h) => sum + Math.pow(h - avg, 2), 0) / hours.length;
  const stdDev = Math.sqrt(variance);
  return Math.max(0, 100 - stdDev * 22);
};

export default function Sleep() {
  const router = useRouter();

  // Initialize state with lazy function
  const [data, setData] = useState<SleepData>(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return (user.sleepData as SleepData) || defaultSleepData;
      }
    }
    return defaultSleepData;
  });

  const [showLogModal, setShowLogModal] = useState(false);
  const [logHours, setLogHours] = useState(() => data?.lastNight?.hours || 7);
  const [logQuality, setLogQuality] = useState(() =>
    Math.round(data?.lastNight?.quality || 4)
  );
  const [logBedtime, setLogBedtime] = useState(
    () => data?.bedtime?.actual || "23:00"
  );
  const [logWake, setLogWake] = useState(
    () => data?.wakeTime?.actual || "07:00"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
  }, [router]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showLogModal || showSettingsModal || showResetConfirm) {
      // Prevent scrolling on mobile when modal is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    } else {
      // Restore scrolling when modal is closed
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [showLogModal, showSettingsModal, showResetConfirm]);

  const metrics = useMemo(() => {
    const totalHours = data.week.reduce((sum, day) => sum + day.hours, 0);
    const avgHours = totalHours / data.week.length;
    const avgQuality =
      data.week.reduce((sum, day) => sum + day.quality, 0) / data.week.length;
    const consistency = consistencyScore(data.week.map((d) => d.hours));
    const efficiency = Math.min(
      100,
      Math.round((avgQuality / 5) * 50 + (avgHours / data.idealSleep) * 50)
    );
    const optimalNights = data.week.filter(
      (d) => d.hours >= data.idealSleep && d.quality >= 4
    ).length;
    const poorNights = data.week.filter((d) => d.hours < 6).length;

    return {
      totalHours,
      avgHours,
      avgQuality,
      consistency,
      efficiency,
      optimalNights,
      poorNights,
    };
  }, [data]);

  const saveSleepData = (updated: SleepData) => {
    setData(updated);
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, sleepData: updated })
      );
    }
  };

  const handleLogSleep = () => {
    const today = new Date().getDay();
    const updatedWeek = data.week.map((day, idx) =>
      idx === today ? { ...day, hours: logHours, quality: logQuality } : day
    );

    const totalHours = updatedWeek.reduce((sum, day) => sum + day.hours, 0);
    const newSleepDebt = Math.max(0, data.idealSleep * 7 - totalHours);
    const newConsistency = consistencyScore(updatedWeek.map((d) => d.hours));

    const updated: SleepData = {
      ...data,
      week: updatedWeek,
      sleepDebt: parseFloat(newSleepDebt.toFixed(1)),
      recoveryScore: Math.min(
        100,
        Math.round(
          (logQuality / 5) * 38 +
            (logHours / data.idealSleep) * 38 +
            newConsistency * 0.18
        )
      ),
      bedtime: {
        ...data.bedtime,
        actual: logBedtime,
        adherence: routineAdherence(logBedtime, data.bedtime.target),
      },
      wakeTime: {
        ...data.wakeTime,
        actual: logWake,
        adherence: routineAdherence(logWake, data.wakeTime.target),
      },
      lastNight: {
        ...data.lastNight,
        hours: logHours,
        quality: logQuality,
        efficiency: Math.min(
          100,
          Math.round((logQuality / 5) * 60 + (logHours / data.idealSleep) * 40)
        ),
        latency: Math.max(6, 24 - Math.round(logQuality * 3)),
        disturbances: Math.max(0, 5 - Math.round(logQuality)),
      },
      lastUpdated: new Date().toISOString(),
    };

    saveSleepData(updated);
    setShowLogModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1800);
  };

  const insights = useMemo(() => {
    const rows = [] as {
      type: "warning" | "success" | "info";
      icon: string;
      title: string;
      message: string;
    }[];

    if (data.sleepDebt > 4) {
      rows.push({
        type: "warning",
        icon: "⚠️",
        title: "Sleep debt is stacking",
        message: `You're ${data.sleepDebt.toFixed(
          1
        )}h behind this week. Aim for two 30-minute top-up naps or a 9h night in the next 48h.`,
      });
    }

    if (metrics.consistency < 70) {
      rows.push({
        type: "warning",
        icon: "⏰",
        title: "Schedule is drifting",
        message:
          "Bed and wake times vary a lot. Keep them within a 45-minute window to stabilize your circadian rhythm.",
      });
    }

    if (metrics.avgHours < 7) {
      rows.push({
        type: "info",
        icon: "🌙",
        title: "Duration is light",
        message:
          "Add 25 minutes to tonight's sleep window to hit 7.5h average.",
      });
    }

    if (metrics.optimalNights >= 4) {
      rows.push({
        type: "success",
        icon: "🎉",
        title: "Recovery-friendly streak",
        message: `${metrics.optimalNights} nights met both quality and duration. Keep the same wind-down routine to extend the streak.`,
      });
    }

    if (data.lastNight.latency > 20) {
      rows.push({
        type: "info",
        icon: "💤",
        title: "Long sleep latency",
        message:
          "Falling asleep took over 20 minutes. Dim screens 60 minutes before bed and keep bedroom temp near 19C.",
      });
    }

    return rows;
  }, [data, metrics]);

  const handleUpdateSleepSettings = (newSettings: Record<string, string>) => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = {
        ...user,
        sleepSettings: newSettings,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setShowSettingsModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleResetSleepData = () => {
    setData(defaultSleepData);
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = {
        ...user,
        sleepData: defaultSleepData,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setShowResetConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const stageTotal =
    data.stages.rem + data.stages.deep + data.stages.light + data.stages.awake;

  return (
    <AppLayout>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-500/90 backdrop-blur-lg text-white px-4 sm:px-6 py-2 sm:py-4 rounded-2xl shadow-lg animate-fade-in flex items-center gap-2 sm:gap-3">
          <span className="text-2xl">✅</span>
          <span className="text-sm sm:text-base font-medium">Updated successfully!</span>
        </div>
      )}

      <div className="min-h-screen pb-20">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold gradient-text-animated">
                Sleep & Recovery
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Next-level sleep intelligence with personalized insights
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="px-3 py-2 md:px-4 md:py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center gap-2"
              >
                <span className="text-lg">⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-2 md:px-4 md:py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center gap-2"
              >
                <span className="text-lg">🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
            {/* Recovery Score */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg">💤</span>
                <span className="text-[10px] sm:text-xs text-blue-400 font-medium">
                  Recovery
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">
                {data.recoveryScore}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {data.recoveryScore >= 80
                  ? "Excellent"
                  : data.recoveryScore >= 65
                  ? "Good"
                  : "Poor"}
              </p>
            </div>

            {/* Last Night */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg">🌙</span>
                <span className="text-[10px] sm:text-xs text-green-400 font-medium">
                  Last Night
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">
                {data.lastNight.hours}h
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Quality {data.lastNight.quality}/5
              </p>
            </div>

            {/* Sleep Debt */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg">⏰</span>
                <span className="text-[10px] sm:text-xs text-orange-400 font-medium">
                  Sleep Debt
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">
                {data.sleepDebt.toFixed(1)}h
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">This week</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Recovery Score Section */}
            <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 hover:border-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Sleep Intelligence
                </h2>
                <button
                  onClick={() => setShowLogModal(true)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
                >
                  <span className="text-base sm:text-lg">📝</span>
                  <span className="hidden sm:inline">Log Sleep</span>
                  <span className="sm:hidden">Log</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-gray-400">
                      Recovery score
                    </p>
                    <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      {data.recoveryScore >= 80
                        ? "High"
                        : data.recoveryScore >= 65
                        ? "Moderate"
                        : "Low"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                      <svg
                        className="transform -rotate-90"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="none"
                          className="text-white/10"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="url(#sleepGradient)"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${
                            (data.recoveryScore / 100) * 314
                          } 314`}
                          className="transition-all duration-700"
                        />
                        <defs>
                          <linearGradient
                            id="sleepGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {data.recoveryScore}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400">
                          / 100
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                      <p>Efficiency {metrics.efficiency}%</p>
                      <p>Consistency {metrics.consistency.toFixed(0)}%</p>
                      <p>Optimal nights {metrics.optimalNights}/7</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-400">
                      Sleep debt
                    </p>
                    <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/30">
                      {data.sleepDebt.toFixed(1)}h
                    </span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (data.sleepDebt / 8) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Recover with one 30-minute nap today and a{" "}
                    {data.idealSleep + 1}h window tonight.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-400">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
                      Bedtime target {data.bedtime.target}
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
                      Wake target {data.wakeTime.target}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-400">
                      Routine adherence
                    </p>
                    <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                      {Math.round(
                        (data.bedtime.adherence + data.wakeTime.adherence) / 2
                      )}
                      %
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-200">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px] sm:text-xs">
                        Bedtime
                      </p>
                      <p className="font-semibold text-sm sm:text-base">
                        {data.bedtime.actual}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Target {data.bedtime.target}
                      </p>
                      <p className="text-[10px] sm:text-xs text-green-300 mt-1">
                        {data.bedtime.adherence}% on target
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px] sm:text-xs">
                        Wake time
                      </p>
                      <p className="font-semibold text-sm sm:text-base">
                        {data.wakeTime.actual}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Target {data.wakeTime.target}
                      </p>
                      <p className="text-[10px] sm:text-xs text-green-300 mt-1">
                        {data.wakeTime.adherence}% on target
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-accent/10 to-accent/20 border border-accent/30 text-accent hover:bg-accent/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
                  >
                    Update routine
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="xl:col-span-2 bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    Weekly rhythm
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Ideal {data.idealSleep}h
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-end gap-1.5 sm:gap-2 md:gap-3 h-40 sm:h-48 md:h-56">
                    {data.week.map((day) => (
                      <div
                        key={day.label}
                        className="relative flex-1 h-full bg-white/5 rounded-t-lg overflow-hidden"
                      >
                        <div
                          className="absolute w-full border-t border-dashed border-green-400/60"
                          style={{ bottom: `${(data.idealSleep / 11) * 100}%` }}
                        />
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
                            day.hours >= data.idealSleep
                              ? "bg-linear-to-t from-green-500 to-green-400"
                              : day.hours >= 6.5
                              ? "bg-linear-to-t from-yellow-500 to-yellow-400"
                              : "bg-linear-to-t from-red-500 to-red-400"
                          }`}
                          style={{ height: `${(day.hours / 11) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                    {data.week.map((day) => (
                      <div key={day.label} className="flex-1 text-center">
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          {day.label}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-white font-medium">
                          {day.hours.toFixed(1)}h
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-400">
                  <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    Avg {metrics.avgHours.toFixed(1)}h
                  </span>
                  <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    Quality {metrics.avgQuality.toFixed(1)}/5
                  </span>
                  <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    Poor nights {metrics.poorNights}/7
                  </span>
                  <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    Optimal {metrics.optimalNights}/7
                  </span>
                </div>
              </div>

              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Sleep stages
                </h2>
                {(
                  [
                    { key: "rem", label: "REM", color: "bg-accent" },
                    { key: "deep", label: "Deep", color: "bg-primary" },
                    { key: "light", label: "Light", color: "bg-secondary" },
                    { key: "awake", label: "Awake", color: "bg-white/30" },
                  ] as const
                ).map((stage) => {
                  const value = data.stages[stage.key];
                  return (
                    <div key={stage.key} className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
                        <span>{stage.label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stage.color}`}
                          style={{ width: `${(value / stageTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  More deep sleep boosts growth hormone release. Keep room at
                  19-20C and limit heavy meals 3h before bed.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="xl:col-span-2 bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    Digital twin insights
                  </h2>
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    Personalized actions
                  </span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {insights.map((insight, index) => (
                    <div
                      key={`${insight.title}-${index}`}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border animate-fade-in ${
                        insight.type === "warning"
                          ? "bg-red-500/10 border-red-500/30"
                          : insight.type === "success"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-blue-500/10 border-blue-500/30"
                      }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">
                          {insight.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm sm:text-base">
                            {insight.title}
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            {insight.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {insights.length === 0 && (
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Everything looks balanced. Keep the routine steady.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Tonight&apos;s playbook
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-200">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg">🧘</span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        10-minute wind-down
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Box breathing + dim lights one hour before bed.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg">💧</span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        Caffeine cutoff hit?
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        No caffeine after 2pm to improve sleep latency.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg">📵</span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        Blue light guard
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Screens off or blue-light filter 60 minutes pre-bed.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg">🥥</span>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        Light snack only
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Avoid heavy meals 3h before bedtime.
                      </p>
                    </div>
                  </li>
                </ul>
                <button
                  onClick={() => setShowLogModal(true)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-white/10 text-white hover:bg-white/10 transition-colors text-xs sm:text-sm md:text-base"
                >
                  Log tonight&apos;s sleep
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Log Modal */}
        {showLogModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 max-w-xl w-full animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Log last night&apos;s sleep
              </h3>

              <div className="grid gap-3 sm:gap-4">
                <div className="grid gap-2">
                  <label className="text-gray-300 text-xs sm:text-sm">
                    Hours slept
                  </label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="range"
                      min="4"
                      max="10"
                      step="0.1"
                      value={logHours}
                      onChange={(e) => setLogHours(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xl sm:text-2xl font-bold text-white w-14 sm:w-16 text-right">
                      {logHours.toFixed(1)}h
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-gray-300 text-xs sm:text-sm">
                    Sleep quality
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setLogQuality(star)}
                        className={`text-2xl sm:text-3xl transition-all ${
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

                <div className="grid gap-2 md:grid-cols-2">
                  <label className="text-gray-300 text-xs sm:text-sm">
                    Bedtime (actual)
                    <input
                      type="time"
                      value={logBedtime}
                      onChange={(e) => setLogBedtime(e.target.value)}
                      className="mt-2 w-full rounded-lg sm:rounded-xl bg-white/5 border border-white/10 px-2 sm:px-3 py-2 text-white text-sm sm:text-base"
                    />
                  </label>
                  <label className="text-gray-300 text-xs sm:text-sm">
                    Wake time (actual)
                    <input
                      type="time"
                      value={logWake}
                      onChange={(e) => setLogWake(e.target.value)}
                      className="mt-2 w-full rounded-lg sm:rounded-xl bg-white/5 border border-white/10 px-2 sm:px-3 py-2 text-white text-sm sm:text-base"
                    />
                  </label>
                </div>

                <div className="flex gap-2 sm:gap-3 pt-2">
                  <button
                    onClick={() => setShowLogModal(false)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white hover:bg-white/10 transition-all text-xs sm:text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogSleep}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-animated rounded-lg sm:rounded-xl text-white font-semibold hover:scale-105 transition-transform text-xs sm:text-sm md:text-base"
                  >
                    Save log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Reset Sleep Data
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                Are you sure you want to reset all sleep data? This will restore
                default values and cannot be undone.
              </p>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetSleepData}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm md:text-base"
                >
                  Reset Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sleep Settings Modal */}
        {showSettingsModal && (
          <SleepSettingsModal
            onClose={() => setShowSettingsModal(false)}
            onSave={handleUpdateSleepSettings}
          />
        )}
      </div>
    </AppLayout>
  );
}

// ============= SLEEP SETTINGS MODAL COMPONENT =============

function SleepSettingsModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (settings: Record<string, string>) => void;
}) {
  const [settings, setSettings] = useState<Record<string, string>>(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.sleepSettings || {};
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Prevent scrolling on mobile when modal is open
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";

    return () => {
      // Restore scrolling when modal is closed
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, []);

  const questions = [
    {
      key: "bedtime",
      label: "What time do you usually go to bed?",
      options: [
        { value: "before-21", label: "Before 9:00 PM" },
        { value: "21-22", label: "9:00 PM - 10:00 PM" },
        { value: "22-23", label: "10:00 PM - 11:00 PM" },
        { value: "23-24", label: "11:00 PM - 12:00 AM" },
        { value: "after-24", label: "After 12:00 AM" },
      ],
    },
    {
      key: "wakeTime",
      label: "What time do you usually wake up?",
      options: [
        { value: "before-6", label: "Before 6:00 AM" },
        { value: "6-7", label: "6:00 AM - 7:00 AM" },
        { value: "7-8", label: "7:00 AM - 8:00 AM" },
        { value: "8-9", label: "8:00 AM - 9:00 AM" },
        { value: "after-9", label: "After 9:00 AM" },
      ],
    },
    {
      key: "sleepGoal",
      label: "How many hours of sleep do you aim for?",
      options: [
        { value: "6", label: "6 hours" },
        { value: "7", label: "7 hours" },
        { value: "8", label: "8 hours" },
        { value: "9", label: "9 hours" },
        { value: "10+", label: "10+ hours" },
      ],
    },
    {
      key: "sleepQuality",
      label: "How would you rate your overall sleep quality?",
      options: [
        { value: "very-poor", label: "Very poor - often wake up tired" },
        { value: "poor", label: "Poor - sometimes wake up tired" },
        { value: "fair", label: "Fair - mixed quality" },
        { value: "good", label: "Good - usually feel rested" },
        { value: "excellent", label: "Excellent - always feel refreshed" },
      ],
    },
    {
      key: "environment",
      label: "How is your sleep environment?",
      options: [
        { value: "perfect", label: "Perfect - dark, quiet, cool" },
        { value: "good", label: "Good - mostly comfortable" },
        { value: "fair", label: "Fair - some issues" },
        { value: "poor", label: "Poor - noise/light problems" },
        { value: "very-poor", label: "Very poor - major disruptions" },
      ],
    },
    {
      key: "challenges",
      label: "What are your main sleep challenges?",
      options: [
        { value: "falling-asleep", label: "Difficulty falling asleep" },
        { value: "staying-asleep", label: "Waking up during the night" },
        { value: "early-waking", label: "Waking up too early" },
        { value: "restless", label: "Restless or poor quality sleep" },
        { value: "schedule", label: "Irregular sleep schedule" },
        { value: "stress", label: "Stress affecting sleep" },
        { value: "none", label: "No major challenges" },
      ],
    },
    {
      key: "tracking",
      label: "Do you currently track your sleep?",
      options: [
        { value: "smartwatch", label: "Yes, with smartwatch/fitness tracker" },
        { value: "phone-app", label: "Yes, with phone app" },
        { value: "manual", label: "Yes, manually (journal/diary)" },
        { value: "no", label: "No, I don't track sleep" },
      ],
    },
    {
      key: "chronotype",
      label: "Are you naturally a morning person or night owl?",
      options: [
        { value: "extreme-morning", label: "Extreme morning person" },
        { value: "morning", label: "Morning person" },
        { value: "neutral", label: "Somewhere in between" },
        { value: "evening", label: "Evening person" },
        { value: "extreme-evening", label: "Extreme night owl" },
      ],
    },
  ];

  const handleAnswer = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="p-3 sm:p-4 md:p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-dark-card z-10">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Sleep Settings
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Customize your sleep tracking preferences and goals
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all duration-300 text-sm sm:text-base"
          >
            ✕
          </button>
        </div>

        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {questions.map((question) => (
            <div key={question.key}>
              <label className="text-white font-medium mb-2 sm:mb-3 block text-sm sm:text-base">
                {question.label}
              </label>
              <div className="grid gap-1.5 sm:gap-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl text-left transition-all duration-300 text-xs sm:text-sm md:text-base ${
                      settings[question.key] === option.value
                        ? "bg-primary/20 border border-primary/40 text-primary"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 sm:p-4 md:p-6 border-t border-white/5 flex gap-2 sm:gap-3 sticky bottom-0 bg-dark-card">
          <button
            onClick={onClose}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-linear-to-r from-primary to-secondary text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
