"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

type TabKey = "mirror" | "patterns" | "twin" | "exercises";

interface MentalPattern {
  day: string;
  mood:
    | "energized"
    | "calm"
    | "stressed"
    | "low-energy"
    | "anxious"
    | "neutral";
  stressLevel: number; // 1-10
  energyLevel: number; // 1-10
  sleepHours: number;
  heartRateAvg: number;
  phoneUsageHours: number;
  activityMinutes: number;
  notes: string;
  triggers: string[];
}

interface ConversationMessage {
  id: string;
  role: "user" | "twin";
  message: string;
  timestamp: string;
  emotion?: string;
}

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  icon: string;
  category: "stress" | "focus" | "sleep" | "anxiety" | "balance";
  breathing_pattern: string;
  benefits: string[];
  completed: boolean;
}

interface MindInsight {
  id: string;
  type: "pattern" | "suggestion" | "warning";
  title: string;
  message: string;
  relatedDay?: string;
  icon: string;
  actionable: boolean;
}

// Sample mental patterns data
const mentalPatternsData: MentalPattern[] = [
  {
    day: "Monday",
    mood: "calm",
    stressLevel: 3,
    energyLevel: 8,
    sleepHours: 7.5,
    heartRateAvg: 68,
    phoneUsageHours: 4,
    activityMinutes: 45,
    notes: "Good morning routine, productive work session",
    triggers: [],
  },
  {
    day: "Tuesday",
    mood: "stressed",
    stressLevel: 8,
    energyLevel: 5,
    sleepHours: 6.2,
    heartRateAvg: 82,
    phoneUsageHours: 6.5,
    activityMinutes: 20,
    notes: "Busy afternoon meetings, rushed lunch",
    triggers: ["meetings", "deadline", "low-sleep"],
  },
  {
    day: "Wednesday",
    mood: "calm",
    stressLevel: 4,
    energyLevel: 7,
    sleepHours: 7.8,
    heartRateAvg: 71,
    phoneUsageHours: 3.5,
    activityMinutes: 60,
    notes: "Workout day, relaxed evening",
    triggers: [],
  },
  {
    day: "Thursday",
    mood: "anxious",
    stressLevel: 7,
    energyLevel: 4,
    sleepHours: 5.9,
    heartRateAvg: 85,
    phoneUsageHours: 8,
    activityMinutes: 15,
    notes: "Scrolled social media too much, ended work late",
    triggers: ["social-media", "late-night", "no-exercise"],
  },
  {
    day: "Friday",
    mood: "neutral",
    stressLevel: 5,
    energyLevel: 6,
    sleepHours: 7,
    heartRateAvg: 75,
    phoneUsageHours: 5,
    activityMinutes: 35,
    notes: "Mixed day - productive morning, low energy evening",
    triggers: ["inconsistent-sleep"],
  },
  {
    day: "Saturday",
    mood: "energized",
    stressLevel: 2,
    energyLevel: 9,
    sleepHours: 8.5,
    heartRateAvg: 65,
    phoneUsageHours: 2,
    activityMinutes: 90,
    notes: "Full rest day, outdoor activity, minimal screen time",
    triggers: [],
  },
  {
    day: "Sunday",
    mood: "low-energy",
    stressLevel: 6,
    energyLevel: 3,
    sleepHours: 7.2,
    heartRateAvg: 72,
    phoneUsageHours: 7,
    activityMinutes: 10,
    notes: "Weekend anxiety, planning next week tasks",
    triggers: ["anxiety", "overthinking"],
  },
];

const breathingExercises: BreathingExercise[] = [
  {
    id: "1",
    name: "Making Peace with Today's Mistakes",
    description:
      "A calming 4-7-8 breathing exercise designed to release self-judgment and accept imperfection.",
    duration: 5,
    icon: "🕊️",
    category: "stress",
    breathing_pattern: "4 seconds in, 7 seconds hold, 8 seconds out",
    benefits: [
      "Reduces self-criticism",
      "Promotes acceptance",
      "Calms nervous system",
    ],
    completed: false,
  },
  {
    id: "2",
    name: "Grounding in the Present Moment",
    description:
      "Box breathing combined with 5-4-3-2-1 sensory awareness to anchor you to now.",
    duration: 6,
    icon: "🌍",
    category: "anxiety",
    breathing_pattern: "4 seconds equal hold-breathe cycle",
    benefits: [
      "Reduces anxiety",
      "Increases present awareness",
      "Calms racing thoughts",
    ],
    completed: false,
  },
  {
    id: "3",
    name: "The Stress Release Wave",
    description:
      "Progressive breathing to release tension accumulated during busy afternoons.",
    duration: 7,
    icon: "🌊",
    category: "stress",
    breathing_pattern: "Slow inhale, extended exhale focus",
    benefits: [
      "Releases accumulated tension",
      "Perfect for afternoon slump",
      "Reduces cortisol",
    ],
    completed: false,
  },
  {
    id: "4",
    name: "Finding Your Calm Harbor",
    description:
      "Guided visualization with rhythmic breathing to find your mental safe space.",
    duration: 10,
    icon: "⛵",
    category: "sleep",
    breathing_pattern: "Slow, rhythmic 5-5 pattern",
    benefits: ["Prepares for sleep", "Deep relaxation", "Reduces racing mind"],
    completed: false,
  },
  {
    id: "5",
    name: "Focus Activation Breath",
    description:
      "Energizing breath work to activate your parasympathetic nervous system for deep work.",
    duration: 5,
    icon: "🎯",
    category: "focus",
    breathing_pattern: "Quick inhale, slow exhale, minimum hold",
    benefits: [
      "Enhances focus",
      "Increases alertness",
      "Prepares for deep work",
    ],
    completed: false,
  },
  {
    id: "6",
    name: "Emotional Resilience Builder",
    description:
      "Strengthens your ability to handle stress through controlled breathing and mental rehearsal.",
    duration: 8,
    icon: "💪",
    category: "balance",
    breathing_pattern: "Bilateral breathing with visualization",
    benefits: [
      "Builds emotional strength",
      "Improves stress resilience",
      "Calms overwhelm",
    ],
    completed: false,
  },
];

const mindInsights: MindInsight[] = [
  {
    id: "1",
    type: "pattern",
    title: "Tuesday Afternoon Stress Pattern",
    message:
      "Every Tuesday afternoon you experience peak stress (8/10). This correlates with back-to-back meetings and reduced physical activity. Try a 5-min breathing exercise beforehand.",
    relatedDay: "Tuesday",
    icon: "📊",
    actionable: true,
  },
  {
    id: "2",
    type: "pattern",
    title: "Sleep Impact on Energy",
    message:
      "When you sleep less than 6.5 hours, your energy drops to 3-4/10 the next day. You're 40% more likely to feel stressed.",
    icon: "😴",
    actionable: true,
  },
  {
    id: "3",
    type: "suggestion",
    title: "High Phone Usage Correlation",
    message:
      "On Thursday you had 8 hours of phone usage (highest of week). Your stress increased to 7/10. Consider setting screen time limits during work hours.",
    relatedDay: "Thursday",
    icon: "📱",
    actionable: true,
  },
  {
    id: "4",
    type: "pattern",
    title: "Movement = Mood Boost",
    message:
      "Saturday had 90 minutes of activity and you felt energized (9/10). Even 45 minutes on Monday had positive effects. Exercise is your strongest mood regulator.",
    icon: "🏃",
    actionable: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Sunday Anxiety Pattern",
    message:
      "You typically experience anxiety on Sunday evenings. Planning next week tasks without grounding practices may be triggering overthinking.",
    relatedDay: "Sunday",
    icon: "⚠️",
    actionable: true,
  },
];

export default function Mindfulness() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("mirror");
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<BreathingExercise | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationMessage[]
  >([
    {
      id: "1",
      role: "twin",
      message:
        "Hey! I&apos;ve been watching your patterns this week. I noticed something interesting about your stress levels on Tuesday afternoons. Want to talk about it?",
      timestamp: new Date().toISOString(),
      emotion: "curious",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showExerciseModal || showSettings || showResetConfirm || showChatModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showExerciseModal, showSettings, showResetConfirm, showChatModal]);

  // Check session
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/signin");
      return;
    }
    const user = JSON.parse(userData);
    if (!user.session) {
      router.push("/signin");
    }
  }, [router]);

  const handleStartExercise = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setShowExerciseModal(false);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: "user",
      message: userInput,
      timestamp: new Date().toISOString(),
    };

    setConversationHistory((prev) => [...prev, newUserMessage]);

    // Simulate twin response
    setTimeout(() => {
      const twinResponses = [
        "That makes sense. I noticed you had similar feelings last Thursday when your phone usage went up. Have you thought about what triggers these feelings?",
        "I hear you. Looking at your data, your energy levels tend to drop when you skip exercise. Maybe starting with just 20 minutes tomorrow could help shift things?",
        "That's really insightful self-awareness. From your patterns, I can see that when you get enough sleep (8+ hours), your stress naturally drops by 40%. What if we worked on that first?",
        "I've been analyzing your week. Tuesday afternoons are consistently your stress peak. It correlates with back-to-back meetings. What if we built in 5 minutes of breathing before those meetings?",
        "I notice when you slow down and take time for yourself, your overall mood improves significantly. You're 70% more likely to feel calm after activities like the workout you did on Saturday.",
      ];
      const randomResponse =
        twinResponses[Math.floor(Math.random() * twinResponses.length)];

      const newTwinMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: "twin",
        message: randomResponse,
        timestamp: new Date().toISOString(),
        emotion: "supportive",
      };

      setConversationHistory((prev) => [...prev, newTwinMessage]);
    }, 800);

    setUserInput("");
  };

  const handleResetMindfulnessData = () => {
    setShowResetConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleUpdateMindfulnessSettings = (
    newAnswers: Record<string, string>
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = {
      ...user,
      optionalAnswers: {
        ...user.optionalAnswers,
        mindfulness: newAnswers,
      },
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowSettings(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const getMoodColor = (mood: MentalPattern["mood"]): string => {
    switch (mood) {
      case "energized":
        return "from-amber-500/20 to-amber-600/20 border-amber-500/40";
      case "calm":
        return "from-emerald-500/20 to-emerald-600/20 border-emerald-500/40";
      case "stressed":
        return "from-red-500/20 to-red-600/20 border-red-500/40";
      case "low-energy":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/40";
      case "anxious":
        return "from-purple-500/20 to-purple-600/20 border-purple-500/40";
      case "neutral":
        return "from-gray-500/20 to-gray-600/20 border-gray-500/40";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/40";
    }
  };

  const getMoodEmoji = (mood: MentalPattern["mood"]): string => {
    switch (mood) {
      case "energized":
        return "⚡";
      case "calm":
        return "😌";
      case "stressed":
        return "😰";
      case "low-energy":
        return "😔";
      case "anxious":
        return "😟";
      case "neutral":
        return "😐";
      default:
        return "😐";
    }
  };

  const getCategoryColor = (
    category: BreathingExercise["category"]
  ): string => {
    switch (category) {
      case "stress":
        return "from-red-500/10 to-red-600/10 border-red-500/20";
      case "focus":
        return "from-blue-500/10 to-blue-600/10 border-blue-500/20";
      case "sleep":
        return "from-indigo-500/10 to-indigo-600/10 border-indigo-500/20";
      case "anxiety":
        return "from-purple-500/10 to-purple-600/10 border-purple-500/20";
      case "balance":
        return "from-emerald-500/10 to-emerald-600/10 border-emerald-500/20";
      default:
        return "from-gray-500/10 to-gray-600/10 border-gray-500/20";
    }
  };

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
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold gradient-text-animated">
                Mindfulness Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Your mental pattern map and digital twin companion
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="px-3 sm:px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3 sm:px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar */}
          <div className="grid grid-cols-3 gap-3 px-4 md:px-6 pb-4">
            {/* Weekly Average Stress */}
            <div className="p-3 rounded-xl bg-linear-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl">😰</span>
                <span className="text-[10px] sm:text-xs text-gray-400">Avg Stress</span>
              </div>
              <p className="text-base sm:text-lg md:text-left text-center font-bold text-white">
                {(
                  mentalPatternsData.reduce((a, b) => a + b.stressLevel, 0) /
                  mentalPatternsData.length
                ).toFixed(1)}
                /10
              </p>
              <p className="text-[10px] text-center md:text-left sm:text-xs text-gray-400">This week</p>
            </div>

            {/* Weekly Average Energy */}
            <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl">⚡</span>
                <span className="text-[10px] sm:text-xs text-gray-400">Avg Energy</span>
              </div>
              <p className="text-base text-center md:text-left sm:text-lg font-bold text-white">
                {(
                  mentalPatternsData.reduce((a, b) => a + b.energyLevel, 0) /
                  mentalPatternsData.length
                ).toFixed(1)}
                /10
              </p>
              <p className="text-[10px] text-center md:text-left sm:text-xs text-gray-400">This week</p>
            </div>

            {/* Best Day */}
            <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <span className="text-lg sm:text-xl">🌟</span>
                <span className="text-[10px] sm:text-xs text-gray-400">Best Day</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-center md:text-left text-white">Saturday</p>
              <p className="text-[10px] text-center md:text-left sm:text-xs text-gray-400">Energized & Calm</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 px-4 sm:px-6 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("mirror")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                activeTab === "mirror"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Mind Mirror
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                activeTab === "patterns"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Pattern Map
            </button>
            <button
              onClick={() => setActiveTab("twin")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                activeTab === "twin"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Digital Twin
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                activeTab === "exercises"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Exercises
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          {/* MIND MIRROR TAB */}
          {activeTab === "mirror" && (
            <div className="space-y-6">
              {/* Weekly Overview */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-2xl">
                    🪞
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Mind Mirror
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      See your mental state across the week
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                  {mentalPatternsData.map((pattern, idx) => (
                    <div
                      key={idx}
                      className={`p-2 sm:p-3 rounded-xl border bg-linear-to-br ${getMoodColor(
                        pattern.mood
                      )} hover:scale-105 transition-all duration-300 ${
                        idx === 6 ? 'col-span-3 md:col-span-1' : ''
                      }`}
                    >
                      <div className="text-center">
                        <p className="text-lg sm:text-xl md:text-2xl mb-1">
                          {getMoodEmoji(pattern.mood)}
                        </p>
                        <p className="text-[10px] sm:text-xs font-bold text-white mb-1">
                          {pattern.day.slice(0, 3)}
                        </p>
                        <div className="flex justify-center gap-1">
                          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-white/10 text-white">
                            {pattern.stressLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs sm:text-sm text-gray-300">
                    <span className="font-semibold">How to read:</span> Each day
                    shows your mood, stress level (number), and emotional state.
                    Click any day to see detailed insights and suggested
                    interventions for that day&apos;s mental patterns.
                  </p>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-2xl">
                    💡
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Your Mental Insights
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Patterns detected from your data this week
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {mindInsights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">
                          {insight.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-sm sm:font-semibold text-white mb-1">
                            {insight.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 mb-2">
                            {insight.message}
                          </p>
                          {insight.actionable && (
                            <button className="text-[10px] sm:text-xs px-3 py-1 rounded-lg bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition">
                              Explore This Pattern
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PATTERN MAP TAB */}
          {activeTab === "patterns" && (
            <div className="space-y-6">
              {/* Stress vs Energy Chart */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center text-2xl">
                    🗺️
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Mental Pattern Map
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Your stress, energy, and activity correlation
                    </p>
                  </div>
                </div>

                {/* Grid View */}
                <div className="space-y-4">
                  {mentalPatternsData.map((pattern, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              {pattern.day}
                            </h3>
                            <span className="text-xl sm:text-2xl">
                              {getMoodEmoji(pattern.mood)}
                            </span>
                            <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/10 text-white font-medium capitalize">
                              {pattern.mood.replace("-", " ")}
                            </span>
                          </div>

                          {/* Pattern details */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                              <p className="text-[10px] sm:text-xs text-gray-400">
                                Stress Level
                              </p>
                              <p className="text-base sm:text-lg font-bold text-red-200">
                                {pattern.stressLevel}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                              <p className="text-[10px] sm:text-xs text-gray-400">Energy</p>
                              <p className="text-base sm:text-lg font-bold text-amber-200">
                                {pattern.energyLevel}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                              <p className="text-[10px] sm:text-xs text-gray-400">Sleep</p>
                              <p className="text-base sm:text-lg font-bold text-blue-200">
                                {pattern.sleepHours}h
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                              <p className="text-[10px] sm:text-xs text-gray-400">Activity</p>
                              <p className="text-base sm:text-lg font-bold text-emerald-200">
                                {pattern.activityMinutes}m
                              </p>
                            </div>
                          </div>

                          {/* Notes */}
                          <p className="text-xs sm:text-sm text-gray-300 mb-2">
                            <span className="font-semibold">Notes:</span>{" "}
                            {pattern.notes}
                          </p>

                          {/* Triggers */}
                          {pattern.triggers.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {pattern.triggers.map((trigger, tidx) => (
                                <span
                                  key={tidx}
                                  className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-500/30"
                                >
                                  🚩 {trigger}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pattern Summary */}
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <h3 className="text-sm sm:font-semibold text-white mb-3">
                    📊 Pattern Summary
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <p>
                      • <span className="font-semibold">Busiest Day:</span>{" "}
                      Tuesday - high stress, low activity. Consider a 5-min
                      breathing exercise before meetings.
                    </p>
                    <p>
                      • <span className="font-semibold">Best Day:</span>{" "}
                      Saturday - high activity, low stress. Replicate this on
                      weekdays if possible.
                    </p>
                    <p>
                      • <span className="font-semibold">Sleep Insight:</span>{" "}
                      Your energy correlates strongly with sleep. Prioritize 7-8
                      hours nightly.
                    </p>
                    <p>
                      • <span className="font-semibold">Activity Impact:</span>{" "}
                      Days with 60+ minutes of activity show 50% lower stress
                      levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* All Insights */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  All Detected Patterns
                </h2>
                <div className="space-y-3">
                  {mindInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-xl border ${
                        insight.type === "warning"
                          ? "bg-red-500/10 border-red-500/30"
                          : insight.type === "pattern"
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-green-500/10 border-green-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl sm:text-2xl shrink-0">
                          {insight.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-sm sm:font-semibold text-white mb-1">
                            {insight.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-300">
                            {insight.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DIGITAL TWIN TAB */}
          {activeTab === "twin" && (
            <div className="space-y-6">
              {/* Twin Intro */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Conversation with Your Digital Twin
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Real-time mental health insights and personalized guidance
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 mb-6">
                  <p className="text-xs sm:text-sm text-indigo-100">
                    💡 <span className="font-semibold">About Your Twin:</span>{" "}
                    Your digital twin learns from your patterns - sleep,
                    exercise, emotional responses, stress triggers, and recovery
                    times. It provides contextual advice based on what actually
                    works for YOU, not generic meditation tips. Share your
                    thoughts, feelings, and experiences.
                  </p>
                </div>

                {/* Conversation Area */}
                <div className="h-96 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col mb-4">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {conversationHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary/20 text-white border border-primary/40"
                              : "bg-white/10 text-gray-200 border border-white/20"
                          }`}
                        >
                          <p className="text-xs sm:text-sm">{msg.message}</p>
                          <p
                            className={`text-[10px] sm:text-xs mt-1 ${
                              msg.role === "user"
                                ? "text-primary/70"
                                : "text-gray-400"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Tell me what's on your mind..."
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 text-xs sm:text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Twin Insights */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-[10px] sm:text-xs font-semibold text-emerald-100 mb-1">
                      ✅ What&apos;s Working for You
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100/80">
                      Saturday routines: high activity + low screen time = peak
                      energy & calmness
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="text-[10px] sm:text-xs font-semibold text-amber-100 mb-1">
                      ⚠️ Pattern to Watch
                    </p>
                    <p className="text-xs sm:text-sm text-amber-100/80">
                      Sunday evenings trigger overthinking. Try grounding
                      exercises before bed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXERCISES TAB */}
          {activeTab === "exercises" && (
            <div className="space-y-6">
              {/* Exercise Library */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🌬️
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Meaningful Mental Exercises
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Breathing techniques with purposeful names
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {breathingExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`p-4 rounded-xl border bg-linear-to-br ${getCategoryColor(
                        exercise.category
                      )} hover:scale-105 transition-all duration-300 cursor-pointer group`}
                      onClick={() => handleStartExercise(exercise)}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl sm:text-3xl">{exercise.icon}</span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
                            {exercise.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-400 capitalize">
                            {exercise.category} • {exercise.duration} min
                          </p>
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs text-gray-300 mb-3">
                        {exercise.description}
                      </p>

                      <div className="mb-3">
                        <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-1">
                          Breathing Pattern:
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-300">
                          {exercise.breathing_pattern}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {exercise.benefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>

                      <button className="w-full px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-medium transition group-hover:bg-primary/30 group-hover:text-primary">
                        Start Exercise
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercise Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-dark-card border border-white/5 rounded-2xl p-4">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">Total Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">12</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">This month</p>
                </div>
                <div className="bg-dark-card border border-white/5 rounded-2xl p-4">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                    Minutes Practiced
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">237</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    Total time invested
                  </p>
                </div>
                <div className="bg-dark-card border border-white/5 rounded-2xl p-4">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                    Favorite Exercise
                  </p>
                  <p className="text-lg sm:text-lg font-bold text-white">🌊</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    Stress Release Wave
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Modal */}
      {showExerciseModal && selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setShowExerciseModal(false)}
          onComplete={handleCompleteExercise}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl sm:text-4xl">⚠️</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Reset Mindfulness Data?
              </h2>
              <p className="text-xs sm:text-gray-400">
                This will reset all your mindfulness data and conversations.
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleResetMindfulnessData}
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <MindfulnessSettingsModal
          onClose={() => setShowSettings(false)}
          onSave={handleUpdateMindfulnessSettings}
        />
      )}

      {/* AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          onClick={() => setShowChatModal(true)}
          className="w-14 h-14 bg-linear-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white text-xl group-hover:animate-pulse"
          title="Ask AI about your mental patterns and mindfulness"
        >
          🤖
        </button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-dark-card border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="text-xs text-gray-300">Mindfulness AI Assistant</div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-card"></div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} />
      )}

    </AppLayout>
  );
}

// ============= EXERCISE MODAL =============

function ExerciseModal({
  exercise,
  onClose,
  onComplete,
}: {
  exercise: BreathingExercise;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(exercise.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress =
    ((exercise.duration * 60 - timeLeft) / (exercise.duration * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500/30 to-emerald-600/30 flex items-center justify-center mx-auto mb-4 text-4xl sm:text-5xl">
            {exercise.icon}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {exercise.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">{exercise.description}</p>
        </div>

        {/* Exercise Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-2">Breathing Pattern</p>
            <p className="text-base sm:text-lg font-semibold text-white">
              {exercise.breathing_pattern}
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-2">Duration</p>
            <p className="text-base sm:text-lg font-semibold text-white">
              {exercise.duration} minutes
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-semibold text-white mb-3">Benefits:</p>
          <div className="space-y-2">
            {exercise.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-primary text-xs sm:text-sm">✓</span>
                <span className="text-xs sm:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <p className="text-5xl sm:text-6xl font-bold text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text mb-2">
              {formatTime(timeLeft)}
            </p>
            <p className="text-xs sm:text-gray-400">
              {isRunning ? "Keep breathing..." : "Ready to start?"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-bold transition-all duration-300 text-xs sm:text-sm"
          >
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </button>
          <button
            onClick={() => setTimeLeft(exercise.duration * 60)}
            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-all duration-300 text-xs sm:text-sm"
          >
            Reset
          </button>
        </div>

        {/* Complete Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
          >
            Close
          </button>
          <button
            onClick={onComplete}
            className="flex-1 px-3 sm:px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
          >
            ✓ Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= MINDFULNESS SETTINGS MODAL =============

function MindfulnessSettingsModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.optionalAnswers?.mindfulness || {};
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
      key: "stressLevel",
      label: "How would you rate your typical daily stress level?",
      options: [
        { value: "low", label: "Low (1-3/10)" },
        { value: "moderate", label: "Moderate (4-6/10)" },
        { value: "high", label: "High (7-8/10)" },
        { value: "very-high", label: "Very High (9-10/10)" },
      ],
    },
    {
      key: "primaryStressors",
      label: "What are your main sources of stress?",
      options: [
        { value: "work", label: "Work / Career" },
        { value: "relationships", label: "Relationships" },
        { value: "health", label: "Health concerns" },
        { value: "finances", label: "Financial pressure" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "meditationExperience",
      label: "Do you have experience with meditation?",
      options: [
        { value: "none", label: "No experience" },
        { value: "beginner", label: "Beginner (tried a few times)" },
        { value: "intermediate", label: "Intermediate (regular practice)" },
        { value: "advanced", label: "Advanced (daily practice)" },
      ],
    },
    {
      key: "preferredTime",
      label: "When do you prefer to practice mindfulness?",
      options: [
        { value: "morning", label: "Morning (before work)" },
        { value: "midday", label: "Midday (lunch break)" },
        { value: "evening", label: "Evening (after work)" },
        { value: "before-bed", label: "Before bed" },
        { value: "anytime", label: "Anytime is fine" },
      ],
    },
    {
      key: "preferredDuration",
      label: "How long can you typically dedicate to practice?",
      options: [
        { value: "5min", label: "5 minutes or less" },
        { value: "5-15min", label: "5-15 minutes" },
        { value: "15-30min", label: "15-30 minutes" },
        { value: "30+min", label: "30+ minutes" },
      ],
    },
    {
      key: "mainGoal",
      label: "What is your primary goal for mindfulness?",
      options: [
        { value: "stress-relief", label: "Stress relief" },
        { value: "better-sleep", label: "Better sleep" },
        { value: "focus", label: "Improve focus" },
        { value: "emotional", label: "Emotional balance" },
        { value: "general", label: "General wellbeing" },
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
              Mindfulness Settings
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Personalize your mindfulness experience
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
              <h3 className="text-sm sm:text-white font-medium">{question.label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 text-xs sm:text-sm ${
                      answers[question.key] === option.value
                        ? "bg-primary/20 border-primary/40 text-white"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
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
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= CHAT MODAL COMPONENT =============

function ChatModal({ onClose }: { onClose: () => void }) {
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-white/10 rounded-2xl w-full max-w-md h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white text-lg">
              🧘
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Mindfulness AI Assistant</h3>
              <p className="text-xs text-gray-400">Mental wellness & mindfulness guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* AI Welcome Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white text-sm flex-shrink-0">
              🧘
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm text-gray-300">
                Hello! I'm your Mindfulness AI assistant. I can help you understand your mental patterns, interpret your emotional data, and provide personalized mindfulness strategies. What would you like to explore about your mental wellness?
              </p>
            </div>
          </div>

          {/* Sample User Question */}
          <div className="flex gap-3 justify-end">
            <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm text-white">
                Why do I get stressed on Tuesday afternoons?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm flex-shrink-0">
              👤
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white text-sm flex-shrink-0">
              🧘
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm text-gray-300 mb-2">
                Based on your patterns, Tuesday afternoons consistently show your highest stress levels (8/10). This correlates with:
              </p>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                <li>• <strong>Back-to-back meetings:</strong> 3+ consecutive meetings</li>
                <li>• <strong>Reduced activity:</strong> Only 20 minutes of movement</li>
                <li>• <strong>Phone usage spike:</strong> 6.5 hours (highest of week)</li>
              </ul>
              <p className="text-sm text-gray-300 mt-2">
                Try a 5-minute breathing exercise before your first afternoon meeting. Your data shows this reduces stress by 40% in similar situations.
              </p>
            </div>
          </div>

          {/* Another Sample Question */}
          <div className="flex gap-3 justify-end">
            <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm text-white">
                How can I improve my focus?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm flex-shrink-0">
              👤
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white text-sm flex-shrink-0">
              🧘
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm text-gray-300 mb-2">
                Your focus patterns show clear correlations with lifestyle factors. Here are evidence-based strategies based on your data:
              </p>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                <li>• <strong>Sleep priority:</strong> 8+ hours reduces stress by 40%, improving focus</li>
                <li>• <strong>Morning routine:</strong> Your calm Wednesdays follow consistent morning practices</li>
                <li>• <strong>Movement breaks:</strong> Even 45 minutes of activity (like Monday) boosts energy</li>
                <li>• <strong>Screen boundaries:</strong> Limit phone usage during work hours</li>
              </ul>
              <p className="text-sm text-amber-300 mt-2">
                💡 Start with the "Focus Activation Breath" exercise - just 5 minutes can increase alertness by 25% according to your patterns.
              </p>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white text-sm flex-shrink-0">
              🧘
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about your mental patterns..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            <button className="px-4 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-transform">
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is a prototype. Real AI integration coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
