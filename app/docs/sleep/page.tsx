"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function SleepDocs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "onboarding" | "implemented" | "future"
  >("onboarding");
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

  const onboardingQuestions = [
    {
      title: "Typical Sleep Duration",
      description:
        "How many hours you usually sleep helps us establish your baseline and set realistic improvement goals.",
      example:
        "Example: If you sleep 6 hours nightly, we'll help you gradually increase to 7-8 hours with actionable steps.",
    },
    {
      title: "Sleep Quality Rating",
      description:
        "Your perception of sleep quality helps identify if duration alone isn't solving your rest issues.",
      example:
        "Example: You sleep 8 hours but rate quality as 'Poor' - we'll investigate: snoring, room temperature, stress, etc.",
    },
    {
      title: "Bedtime & Wake Time",
      description:
        "Consistent sleep schedule aligns your circadian rhythm for better quality rest and easier waking.",
      example:
        "Example: Bedtime varies 10 PM-1 AM. We'll show how consistency (11 PM nightly) improves sleep quality by 30%.",
    },
    {
      title: "Chronotype Assessment",
      description:
        "Are you a morning person or night owl? Understanding your natural rhythm optimizes your schedule.",
      example:
        "Example: You're a night owl but work at 8 AM. We suggest: gradual bedtime shifts + bright light in morning.",
    },
    {
      title: "Sleep Environment",
      description:
        "Room conditions (dark, quiet, cool) significantly impact sleep quality and duration.",
      example:
        "Example: Your room is bright + warm. We recommend: blackout curtains + AC at 65-68°F for 15% better sleep.",
    },
    {
      title: "Sleep Challenges",
      description:
        "Identifying specific issues (insomnia, night wakings, etc.) helps us provide targeted solutions.",
      example:
        "Example: You wake up 3x nightly. We track patterns: correlates with late caffeine. Solution: no caffeine after 2 PM.",
    },
    {
      title: "Tracking Method",
      description:
        "How you track sleep (smartwatch, phone, manual) determines which features and insights we can provide.",
      example:
        "Example: You use Apple Watch. We auto-import: sleep stages, heart rate, HRV, restlessness - detailed analysis!",
    },
  ];

  const implementedFeatures = [
    {
      title: "😴 Sleep Duration Tracking",
      description:
        "Monitor nightly sleep hours with weekly and monthly averages to spot patterns.",
      example:
        "Last week: Mon 6.5h, Tue 7h, Wed 7.5h, Thu 6h, Fri 8h, Sat 8.5h, Sun 7h. Average: 7.2h (goal: 8h).",
    },
    {
      title: "⭐ Quality Assessment",
      description:
        "Rate your sleep quality 1-5 stars each morning and see how it trends over time.",
      example:
        "This week: 5 nights rated 4⭐, 2 nights rated 3⭐. Quality improving! Tuesday 3⭐ correlated with late dinner.",
    },
    {
      title: "🕐 Schedule Consistency",
      description:
        "Track bedtime and wake time regularity with scores showing circadian rhythm alignment.",
      example:
        "Bedtime consistency: 75% (bed between 10:30-11:30 PM most nights). Improve to 85%+ for better quality.",
    },
    {
      title: "🌙 Chronotype Profile",
      description:
        "Discover if you're a morning lark or night owl with personalized schedule recommendations.",
      example:
        "You're a night owl (peak productivity 8 PM-12 AM). Recommendation: Schedule creative work for evenings.",
    },
    {
      title: "🛏️ Environment Scoring",
      description:
        "Rate your sleep environment (dark, quiet, cool) and get specific improvement suggestions.",
      example:
        "Current score: 6/10. Issue: Room too bright. Add: blackout curtains → predicted score: 8.5/10.",
    },
    {
      title: "⚠️ Challenge Identification",
      description:
        "Track specific sleep problems (insomnia, night wakings) with pattern detection.",
      example:
        "Pattern detected: Difficulty falling asleep on nights with <1h evening wind-down. Solution: 90-min pre-bed routine.",
    },
    {
      title: "📊 Sleep Metrics Dashboard",
      description:
        "View daily sleep score, weekly consistency, and goal progress at a glance.",
      example:
        "Today: Sleep score 82/100 (Good), Weekly consistency 85% ✓, On track for 7.5h average goal.",
    },
    {
      title: "📈 Weekly Trend Charts",
      description:
        "Visual graphs showing sleep duration and quality trends to identify patterns.",
      example:
        "7-day chart shows: Sleep dips on Wednesdays (5.5h avg). Cause: late gym class. Adjust schedule.",
    },
    {
      title: "🎯 Goal Setting",
      description:
        "Set personalized sleep duration goals with progress tracking and achievement celebrations.",
      example:
        "Goal: 7.5h nightly. Progress: 5/7 nights met goal this week (71%). Keep it up - almost there!",
    },
    {
      title: "💤 Sleep Debt Calculator",
      description:
        "Track cumulative sleep deficit and see recovery recommendations.",
      example:
        "Sleep debt: 3 hours accumulated this week. Recovery plan: Add 30 min to next 6 nights to pay off debt.",
    },
  ];

  const futureFeatures = [
    {
      title: "🧠 Sleep Stage Analysis",
      description:
        "Track time spent in light, deep, and REM sleep stages with optimization recommendations.",
      example:
        "Last night: Light 3h, Deep 1.5h, REM 2h. Low deep sleep detected - try: cooler room, magnesium supplement.",
    },
    {
      title: "📱 Smart Alarm",
      description:
        "Wake up during light sleep phase within 30-min window for easier, more refreshed mornings.",
      example:
        "Set alarm for 7:00-7:30 AM. Smart alarm wakes you at 7:12 AM during light sleep (vs deep at 7:00).",
    },
    {
      title: "😴 Sleep Efficiency Score",
      description:
        "Calculate time actually sleeping vs time in bed to optimize sleep quality.",
      example:
        "Sleep efficiency: 82% (6.5h sleeping ÷ 8h in bed). Improve with: consistent bedtime, less phone before bed.",
    },
    {
      title: "🎧 Sleep Sounds Library",
      description:
        "Curated audio library with nature sounds, white noise, guided meditations for better sleep.",
      example:
        "Trouble sleeping? Try: Ocean waves (45 min), White noise (8h loop), Sleep meditation (20 min).",
    },
    {
      title: "🌡️ Environment Sensors",
      description:
        "Connect smart sensors to track room temperature, humidity, noise, and light levels.",
      example:
        "Last night: Room was 74°F (too warm), 65% humidity (good), 45dB noise (moderate). Recommendation: AC to 68°F.",
    },
    {
      title: "☕ Caffeine Impact Tracker",
      description:
        "Log caffeine intake and see exact correlation with sleep quality and time to fall asleep.",
      example:
        "Coffee at 4 PM → took 45 min to fall asleep (vs 15 min avg). Caffeine half-life: 5-6 hours. Cut-off: 2 PM.",
    },
    {
      title: "💊 Sleep Aid Recommendations",
      description:
        "Personalized suggestions for supplements, lifestyle changes, and sleep hygiene improvements.",
      example:
        "Based on your patterns: Try magnesium glycinate 400mg 1h before bed + 10-min meditation. 80% success rate for similar profiles.",
    },
    {
      title: "📖 Sleep Stories",
      description:
        "Professionally narrated bedtime stories designed to help you drift off peacefully.",
      example:
        "Popular tonight: 'Mountain Journey' (35 min), 'Starlit Forest' (40 min), 'Ocean Voyage' (45 min) - 95% fall asleep.",
    },
    {
      title: "🌅 Light Therapy",
      description:
        "Smart light recommendations to optimize circadian rhythm using wake-up lights and sunset simulation.",
      example:
        "Morning: Bright light 7-7:30 AM (10,000 lux) to wake. Evening: Dim warm light after 8 PM (< 50 lux) to prep sleep.",
    },
    {
      title: "🧘 Wind-Down Routines",
      description:
        "Guided pre-bed routines with timing reminders for optimal sleep preparation.",
      example:
        "Your routine starts 9:30 PM: dim lights → 10:00 PM: warm shower → 10:20 PM: reading → 10:45 PM: lights out.",
    },
    {
      title: "😰 Nightmare Tracking",
      description:
        "Log nightmares and identify triggers with stress, diet, and medication correlations.",
      example:
        "Nightmares 3x this week. Pattern: All after high-stress days (8+). Reduce with: evening meditation, stress journal.",
    },
    {
      title: "⏰ Power Nap Optimizer",
      description:
        "Calculate optimal nap timing and duration based on your schedule and sleep debt.",
      example:
        "You're tired at 2 PM. Optimal nap: 20 min (light sleep only) or 90 min (full cycle). Avoid 30-60 min = groggy.",
    },
    {
      title: "🏨 Travel Sleep Planner",
      description:
        "Jet lag prevention plans with light exposure and melatonin timing for time zone changes.",
      example:
        "Flying NYC → Tokyo (13h ahead). Plan: 3 days before, shift sleep 1h earlier daily. Morning light exposure. Melatonin at 10 PM.",
    },
    {
      title: "🤝 Partner Sleep Sync",
      description:
        "Coordinate sleep schedules with partner and track how each affects the other's sleep quality.",
      example:
        "Partner's snoring woke you 2x last night. Their side: 'Allergies detected'. Both: Try HEPA filter + nasal strips.",
    },
    {
      title: "🔮 Sleep Prediction",
      description:
        "AI predicts tonight's sleep quality based on today's activities, stress, and patterns.",
      example:
        "Tonight's prediction: 7.5h, 4⭐ quality. Reasons: Good workout today, low stress, consistent bedtime. High confidence forecast!",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Docs
          </button>

          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl">😴</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Sleep & Recovery Documentation
              </h1>
              <p className="text-gray-400 text-lg mt-1">
                Complete guide to sleep tracking and optimization
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`px-3 sm:px-6 py-3 font-semibold text-xs sm:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "onboarding"
                ? "text-white border-primary"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            📋 Onboarding
          </button>
          <button
            onClick={() => setActiveTab("implemented")}
            className={`px-3 sm:px-6 py-3 font-semibold text-xs sm:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "implemented"
                ? "text-white border-green-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            ✅ Current
          </button>
          <button
            onClick={() => setActiveTab("future")}
            className={`px-3 sm:px-6 py-3 font-semibold text-xs sm:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "future"
                ? "text-white border-purple-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            🚀 Future
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "onboarding" && (
            <>
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Why We Ask These Questions
                </h3>
                <p className="text-gray-300">
                  Sleep assessment questions help us understand your current
                  patterns, identify issues, and create a personalized plan to
                  improve your rest and recovery.
                </p>
              </div>

              {onboardingQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-gray-400">💡 {item.example}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "implemented" && (
            <>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  What You Can Do Right Now
                </h3>
                <p className="text-gray-300">
                  These sleep tracking features are active. Monitor your
                  patterns, optimize your schedule, and improve sleep quality
                  starting tonight.
                </p>
              </div>

              {implementedFeatures.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                    <p className="text-sm text-green-300">✨ {item.example}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "future" && (
            <>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-300">
                  Advanced sleep optimization features with AI predictions,
                  smart alarms, environment tracking, and personalized sleep
                  coaching.
                </p>
              </div>

              {futureFeatures.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
                    <p className="text-sm text-purple-300">🌟 {item.example}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
