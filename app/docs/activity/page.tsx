"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function ActivityDocs() {
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
      title: "VO2 Max",
      description:
        "Your aerobic fitness capacity - how efficiently your body uses oxygen during exercise.",
      example:
        "Example: If you have a VO2 Max of 42 ml/kg/min, you're in the 'Good' fitness category for your age and can sustain moderate exercise comfortably.",
    },
    {
      title: "Physical Condition Score",
      description:
        "Overall fitness rating from 0-100 based on your current activity levels and capabilities.",
      example:
        "Example: Score of 65 means 'Moderate fitness' - you can handle daily activities well but have room to improve endurance and strength.",
    },
    {
      title: "Strength Metrics",
      description:
        "We track push-ups, squats, and pull-ups to assess upper body, lower body, and back strength.",
      example:
        "Example: If you can do 15 push-ups, 20 squats, 5 pull-ups - we create workouts targeting your weaker areas while maintaining strengths.",
    },
    {
      title: "Flexibility Score",
      description:
        "Measures your range of motion and mobility, crucial for injury prevention and recovery.",
      example:
        "Example: Score of 45/100 means you have limited flexibility. We'll recommend daily stretching routines to improve gradually.",
    },
    {
      title: "Postural Issues",
      description:
        "Identifies common posture problems from daily habits that can lead to pain or injury.",
      example:
        "Example: If you have 'Rounded shoulders' from desk work, we add corrective exercises like wall angels to your routine.",
    },
    {
      title: "Connected Devices",
      description:
        "Link your smartwatch or fitness tracker to automatically sync steps, heart rate, and workout data.",
      example:
        "Example: Connect Apple Watch - automatically track your 8,432 daily steps, 245 active minutes, and HRV without manual logging.",
    },
  ];

  const implementedFeatures = [
    {
      title: "💪 Movement Profile",
      description:
        "Complete fitness assessment showing your VO2 Max, physical condition, strength metrics, and flexibility.",
      example:
        "See all your fitness stats in one place: VO2 Max 42 (Good), Condition 65%, Push-ups 15, Flexibility 45%.",
    },
    {
      title: "⌚ Device Integration",
      description:
        "Connect smartwatch to automatically sync daily activity data in real-time.",
      example:
        "Apple Watch connected → Auto-tracks: 8,432 steps, 342 calories burned, 45 active minutes, HRV 62ms.",
    },
    {
      title: "📊 Daily Activity Tracking",
      description:
        "Monitor steps, calories, active minutes, and heart rate variability throughout the day.",
      example:
        "Dashboard shows: Steps 8,432/10,000 (84%), Calories 342, Active mins 45, HRV 62ms (good recovery).",
    },
    {
      title: "🎯 Intensity Zones",
      description:
        "Track time spent in light, moderate, and vigorous exercise intensities.",
      example:
        "Today: Light 20 min (green), Moderate 15 min (yellow), Vigorous 10 min (red) - balanced workout!",
    },
    {
      title: "🏃 Activity Breakdown",
      description:
        "See calories burned by activity type - running, cycling, gym, walking.",
      example:
        "This week: Running 450 cal (2h), Cycling 320 cal (1.5h), Gym 280 cal (1h), Walking 150 cal (3h).",
    },
    {
      title: "💡 Smart Insights",
      description:
        "AI analyzes your data to provide personalized workout recommendations and recovery guidance.",
      example:
        "Insight: 'HRV is high today (78ms) - your body is well-recovered. Good day for intense training!'",
    },
    {
      title: "⚠️ Posture Warnings",
      description:
        "Get alerts about detected postural issues with corrective exercise suggestions.",
      example:
        "Warning: 'Rounded shoulders detected. Added 3 corrective exercises to today's plan: wall angels, band pull-aparts.'",
    },
    {
      title: "📈 Progress Bars",
      description:
        "Visual tracking for all metrics with goal targets and percentage completion.",
      example:
        "Steps progress bar: 8,432/10,000 (84% - almost there!). Active minutes: 45/60 (75% complete).",
    },
    {
      title: "🔥 Calorie Insights",
      description:
        "Identify which activities burn the most calories for efficient workouts.",
      example:
        "Insight: 'Running burns the most calories for you (225 cal/hour). Optimize your time with 3x weekly runs.'",
    },
    {
      title: "💚 Recovery Status",
      description:
        "HRV-based recovery assessment tells you if you're ready for intense workouts.",
      example:
        "Recovery Status: Good ✓ - HRV 68ms, rested heart rate 58 bpm. Ready for high-intensity training today!",
    },
  ];

  const futureFeatures = [
    {
      title: "🎯 AI Workout Generator",
      description:
        "Personalized workout plans created by AI based on your goals, fitness level, and available equipment.",
      example:
        "AI creates: '30-min home workout for muscle gain - 4 exercises targeting weak areas, no equipment needed.'",
    },
    {
      title: "📹 Exercise Form Checker",
      description:
        "Use your phone camera to analyze exercise form in real-time and prevent injury.",
      example:
        "During squats: 'Knees tracking over toes ✓, Back straight ✓, Depth good ✓' - real-time feedback as you move.",
    },
    {
      title: "🏅 Achievement System",
      description:
        "Earn badges, streaks, and rewards for consistency and hitting milestones.",
      example:
        "Achievement unlocked: '7-Day Streak' 🔥 - Worked out every day this week! Reward: 500 XP points.",
    },
    {
      title: "👥 Social Challenges",
      description:
        "Compete with friends in step challenges, workout competitions, and fitness goals.",
      example:
        "Challenge: 'Steps Battle with Mike' - You: 9,432 steps, Mike: 8,891. You're winning by 541 steps!",
    },
    {
      title: "🎮 Gamified Workouts",
      description:
        "Turn exercises into games with points, levels, and interactive challenges.",
      example:
        "Workout Game: Complete 50 squats to defeat the boss! 32/50 done - keep going to level up!",
    },
    {
      title: "📱 Video Library",
      description:
        "Access thousands of exercise videos with step-by-step instructions and modifications.",
      example:
        "Search 'chest workout' → 50+ videos: beginner to advanced, equipment/no-equipment, 10-45 min options.",
    },
    {
      title: "⏱️ Rest Timer & Tracker",
      description:
        "Smart rest periods between sets with countdown timers and workout logging.",
      example:
        "Set complete! Rest 60 seconds... [countdown]. Auto-log: Bench Press, 3x10, 60kg. Ready for set 2!",
    },
    {
      title: "📊 Performance Analytics",
      description:
        "Track strength gains, endurance improvements, and fitness progression over time.",
      example:
        "12-week trend: Bench press +15kg, Running pace -30 sec/km, VO2 Max +4 points. Clear progress!",
    },
    {
      title: "🏥 Injury Prevention",
      description:
        "AI detects movement patterns that could lead to injury and suggests preventive measures.",
      example:
        "Alert: 'Running volume up 40% this week. Risk of overuse injury. Recommend: add rest day, foam rolling.'",
    },
    {
      title: "🎵 Workout Music Sync",
      description:
        "Music that matches your workout intensity and automatically adjusts tempo.",
      example:
        "Warm-up: chill beats 90 BPM → Intense set: high-energy 140 BPM → Cool-down: calm 80 BPM.",
    },
    {
      title: "🗓️ Smart Workout Scheduling",
      description:
        "AI schedules workouts based on your calendar, recovery status, and goals.",
      example:
        "AI suggests: 'Free slot Tuesday 6 PM, good recovery status → Schedule: Upper body strength (45 min).'",
    },
    {
      title: "🏃 Running Coach",
      description:
        "Real-time audio coaching for running with pace guidance and form tips.",
      example:
        "Audio: 'Current pace 5:45/km - slightly fast for recovery run. Slow to 6:00/km. Good cadence!'",
    },
    {
      title: "💪 Strength Training Programs",
      description:
        "Structured 12-week programs for muscle building, strength gains, or toning.",
      example:
        "Week 1/12 of 'Muscle Builder': 4 workouts done ✓. Progressive overload: add 2.5kg next week.",
    },
    {
      title: "🧘 Active Recovery Plans",
      description:
        "Guided recovery routines with stretching, foam rolling, and mobility work.",
      example:
        "Recovery Day Plan: 10-min foam roll (quads, hamstrings), 15-min yoga flow, 5-min breathing.",
    },
    {
      title: "📈 Fitness Age Calculator",
      description:
        "Compare your fitness metrics to calculate your biological fitness age.",
      example:
        "Your fitness age: 25 years (actual age: 30). VO2 Max and strength match someone 5 years younger!",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
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

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <span className="text-4xl">💪</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Activity Documentation
              </h1>
              <p className="text-gray-400 text-lg mt-1">
                Complete guide to fitness tracking and workout planning
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "onboarding"
                ? "text-white border-primary"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            📋 Onboarding Questions
          </button>
          <button
            onClick={() => setActiveTab("implemented")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "implemented"
                ? "text-white border-green-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            ✅ Current Features
          </button>
          <button
            onClick={() => setActiveTab("future")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "future"
                ? "text-white border-purple-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            🚀 Future Features
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "onboarding" && (
            <>
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Why We Ask These Questions
                </h3>
                <p className="text-gray-300">
                  We collect fitness baseline data to create your personalized
                  movement profile and design workouts that match your current
                  capabilities and goals.
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
                  These features are active in the app. Track your daily
                  activity, monitor progress, and get personalized insights to
                  optimize your fitness journey.
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
                  These advanced features will transform your fitness experience
                  with AI coaching, gamification, and smart workout
                  optimization.
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
