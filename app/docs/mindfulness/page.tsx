"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function MindfulnessDocs() {
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
      title: "Daily Mood Tracking",
      description:
        "Understanding your emotional patterns helps identify triggers and build better mental health habits.",
      example:
        "Example: Track mood as 'Stressed' with stress level 8/10. Over time, we spot patterns: Tuesdays are consistently high-stress.",
    },
    {
      title: "Stress Levels",
      description:
        "Rating stress 1-10 daily helps correlate high-stress periods with sleep, activity, and other health factors.",
      example:
        "Example: Stress rated 8/10 on days with <6h sleep. We alert you: 'Poor sleep increases stress 40% - prioritize rest tonight.'",
    },
    {
      title: "Energy Levels",
      description:
        "Daily energy tracking reveals how lifestyle choices impact your vitality and mental clarity.",
      example:
        "Example: Energy 9/10 on Saturday after 90-min workout + 8h sleep. Pattern detected: exercise boosts energy significantly.",
    },
    {
      title: "Common Triggers",
      description:
        "Identifying what stresses you (work meetings, deadlines, social media) helps us suggest targeted coping strategies.",
      example:
        "Example: You mark 'back-to-back meetings' as trigger. We suggest: 10-min breathing breaks between calls to reduce stress spikes.",
    },
    {
      title: "Coping Mechanisms",
      description:
        "Tracking what helps you feel better reveals your most effective stress-relief methods.",
      example:
        "Example: You note 'walking' reduces stress. We recommend: 15-min walks when stress hits 7+ for quick relief.",
    },
    {
      title: "Sleep-Mood Connection",
      description:
        "Understanding how sleep quality affects your mood helps us provide integrated wellness recommendations.",
      example:
        "Example: Mood rated 'Low-Energy' after 5h sleep. Pattern: <6.5h sleep correlates with 40% worse mood next day.",
    },
  ];

  const implementedFeatures = [
    {
      title: "🪞 Mind Mirror - Weekly Mood Map",
      description:
        "7-day visual grid showing daily mood, stress levels, and emotional patterns at a glance.",
      example:
        "This week: Mon Calm 😌 (4/10), Tue Stressed 😰 (8/10), Wed Anxious 😟 (7/10), Thu Calm 😌 (3/10)... Pattern spotted!",
    },
    {
      title: "🧩 Pattern Detection",
      description:
        "AI identifies recurring mental patterns like 'Tuesday Afternoon Stress' with specific triggers.",
      example:
        "Insight: 'Tuesday stress 8/10 detected 3 weeks straight. Trigger: back-to-back meetings. Suggestion: block 10-min breaks.'",
    },
    {
      title: "😴 Sleep-Stress Correlation",
      description:
        "See exactly how sleep quality impacts your stress and energy levels the next day.",
      example:
        "Analysis: Days with <6.5h sleep → 40% higher stress next day. Last 3 poor sleep nights all followed by 7+ stress days.",
    },
    {
      title: "📱 Phone Usage Impact",
      description:
        "Track how screen time correlates with anxiety and stress levels.",
      example:
        "Pattern: 8+ hours phone usage = elevated stress (7/10 avg). Days with <4h usage = lower stress (4/10 avg).",
    },
    {
      title: "🏃 Movement-Mood Boost",
      description:
        "Quantify how physical activity improves your mental state and energy.",
      example:
        "Data shows: 60+ min activity days have 50% lower stress (avg 4/10) vs sedentary days (avg 8/10). Move more!",
    },
    {
      title: "🗺️ Pattern Map - Daily Breakdown",
      description:
        "Comprehensive 7-day view with all metrics: mood, stress, energy, sleep, activity, and trigger tags.",
      example:
        "Tuesday details: Stressed 😰, Stress 8/10, Energy 4/10, Sleep 6h, Activity 15min. Tags: meetings, deadline, low-sleep.",
    },
    {
      title: "🎯 Best Day Replication",
      description:
        "Identify your best mental health days and get recommendations to recreate those conditions.",
      example:
        "Saturday: Energized 😊, Stress 2/10, Energy 9/10. Recipe: 90min workout, 8h sleep, low screen time. Replicate this!",
    },
    {
      title: "💬 Digital Twin Conversation",
      description:
        "Chat with AI that learns from YOUR patterns to provide personalized mental health guidance.",
      example:
        "You: 'Feeling stressed today.' Twin: 'I see Tuesday meetings again. Last time, 10-min walk helped. Try that now?'",
    },
    {
      title: "🧠 Contextual Insights",
      description:
        "AI references your personal data to give specific (not generic) mental health advice.",
      example:
        "Twin: 'Your best days have 60+ min activity + <2h phone use. Today try: lunch walk + phone-free evening.'",
    },
    {
      title: "📊 Weekly Summary Stats",
      description:
        "Overview of busiest stress day, best day, and key patterns for the week.",
      example:
        "Week summary: Busiest day Tuesday (8/10), Best day Saturday (2/10), Sleep avg 7.1h, Activity avg 45min.",
    },
    {
      title: "🤖 AI Mindfulness Assistant",
      description:
        "Chat with AI that knows your mental wellness patterns and provides personalized mindfulness guidance.",
      example:
        "Ask: 'I'm feeling anxious about tomorrow.' → AI: 'I see your anxiety peaks before presentations. Last time, 10-min breathing helped. Try that now?'",
    },
  ];

  const futureFeatures = [
    {
      title: "🧘 Guided Meditation Library",
      description:
        "Hundreds of meditation sessions for stress, anxiety, focus, sleep, and specific situations.",
      example:
        "Feeling anxious? Choose: '10-min Anxiety Relief' meditation. Voice guides you: breathe in 4, hold 4, out 6. Instant calm.",
    },
    {
      title: "😮‍💨 Breathing Exercises",
      description:
        "Interactive breathing techniques with visual guides and real-time biofeedback.",
      example:
        "Box breathing: In 4 sec (circle grows), Hold 4 sec, Out 4 sec (circle shrinks), Hold 4 sec. Repeat 5 cycles. Stress drops 30%.",
    },
    {
      title: "📝 Mood Journaling",
      description:
        "Write daily thoughts with AI analysis to identify patterns you might miss.",
      example:
        "Journal: 'Anxious about presentation.' AI: 'This is your 3rd presentation anxiety. Pattern: low confidence. Try power poses before!'",
    },
    {
      title: "🎯 Stress Prediction",
      description:
        "AI predicts tomorrow's stress level based on today's activities and upcoming calendar.",
      example:
        "Tomorrow prediction: High stress (7/10). Reasons: 3 meetings scheduled, poor sleep tonight (5h), no exercise planned. Prepare now!",
    },
    {
      title: "🚨 Real-time Stress Alerts",
      description:
        "Wearable integration detects elevated stress via heart rate and prompts immediate intervention.",
      example:
        "Alert: Heart rate elevated 20 bpm + irregular breathing detected. Stress spike likely. Start 5-min breathing now?",
    },
    {
      title: "🎮 Mindfulness Games",
      description:
        "Gamified meditation and stress relief activities that make mental health practice fun.",
      example:
        "Game: 'Calm the Storm' - Match breathing to on-screen rhythm for points. Level up = harder patterns. 10 min daily = calmer mind.",
    },
    {
      title: "👥 Support Groups",
      description:
        "Connect with others facing similar mental health challenges in moderated safe spaces.",
      example:
        "Join: 'Work Stress Support' group. Share experiences, get advice, weekly video calls. 85% report feeling less alone.",
    },
    {
      title: "🌤️ Mood Weather",
      description:
        "See if weather (rain, cold, dark) affects your mood and get preventive recommendations.",
      example:
        "Rainy week ahead. Your mood drops 30% on rainy days. Plan: extra vitamin D, indoor activities, light therapy lamp.",
    },
    {
      title: "🔔 Check-in Reminders",
      description:
        "Smart notifications prompt mood logging at optimal times based on your patterns.",
      example:
        "3 PM reminder: 'How are you feeling?' (your stress typically peaks now). Log mood → get instant coping suggestion.",
    },
    {
      title: "💪 Resilience Score",
      description:
        "Track your mental resilience over time - how quickly you bounce back from stress.",
      example:
        "Resilience score: 72/100 (Good). Last month high-stress day → recovered in 1 day. Improving! 3 months ago took 3 days.",
    },
    {
      title: "🎭 Emotion Vocabulary Builder",
      description:
        "Expand emotional awareness beyond basic emotions with nuanced feeling words.",
      example:
        "Not just 'Sad' - choose: Melancholic, Disappointed, Discouraged, Grief-stricken. Specific words = better self-understanding.",
    },
    {
      title: "🌙 Evening Wind-Down",
      description:
        "Guided routines to transition from day stress to evening calm and better sleep.",
      example:
        "8 PM: Start wind-down. Dim lights → 10-min stretching → 5-min gratitude journal → 15-min meditation. Sleep quality +35%.",
    },
    {
      title: "📞 Crisis Support",
      description:
        "Immediate access to mental health hotlines and emergency resources when needed.",
      example:
        "Severe anxiety detected. Resources: Crisis Text Line (Text HOME to 741741), Suicide Prevention (988), Chat with counselor now.",
    },
    {
      title: "🎨 Art Therapy",
      description:
        "Express emotions through digital drawing, coloring, and creative activities.",
      example:
        "Feeling angry? Open anger art therapy: scribble on screen, choose colors matching emotion. Release tension creatively. Cathartic!",
    },
    {
      title: "🏆 Mindfulness Streaks",
      description:
        "Build consistency with streak tracking, badges, and celebration of meditation practice.",
      example:
        "30-day meditation streak 🔥! Longest streak yet. Reward: 'Zen Master' badge + access to advanced techniques. Keep going!",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3 sm:mb-4"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
            <span className="text-sm sm:text-base">Back to Docs</span>
          </button>

          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">🧘</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                Mindfulness Documentation
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-1">
                Complete guide to mental wellness and stress management
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 md:mb-12 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "onboarding"
                ? "text-white border-primary"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            📋 Onboarding
          </button>
          <button
            onClick={() => setActiveTab("implemented")}
            className={`px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "implemented"
                ? "text-white border-green-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            ✅ Current
          </button>
          <button
            onClick={() => setActiveTab("future")}
            className={`px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === "future"
                ? "text-white border-purple-500"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            🚀 Future
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {activeTab === "onboarding" && (
            <>
              <div className="bg-primary/10 border border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  Why We Ask These Questions
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Mental wellness questions help us understand your emotional
                  patterns, identify stress triggers, and create personalized
                  strategies for better mental health.
                </p>
              </div>

              {onboardingQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{item.description}</p>
                  <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-400">💡 {item.example}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "implemented" && (
            <>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  What You Can Do Right Now
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  These mindfulness features are live. Track your mental
                  patterns, understand stress triggers, and get AI-powered
                  personalized guidance for better mental health.
                </p>
              </div>

              {implementedFeatures.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-green-500/30 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{item.description}</p>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-green-300">✨ {item.example}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "future" && (
            <>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Advanced mindfulness features with guided meditation,
                  breathing exercises, stress prediction, and comprehensive
                  mental wellness tools.
                </p>
              </div>

              {futureFeatures.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{item.description}</p>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-purple-300">🌟 {item.example}</p>
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
