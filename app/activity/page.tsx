"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface MovementProfile {
  vo2Max: number;
  vo2MaxCategory: string;
  physicalCondition: number;
  strength: {
    pushUps: number;
    squats: number;
    pullUps: number;
  };
  flexibility: number;
  posturalIssues: string[];
}

interface TodayActivity {
  steps: number;
  calories: number;
  activeMinutes: number;
  hrv: number;
  exerciseIntensity: {
    light: number;
    moderate: number;
    vigorous: number;
  };
}

interface ActivityBreakdown {
  type: string;
  calories: number;
  duration: number;
  icon: string;
}

interface WorkoutDay {
  day: string;
  date: string;
  type: string;
  intensity: "Rest" | "Light" | "Moderate" | "High";
  completed: boolean;
  scheduled: boolean;
  exercises?: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  equipment: string;
  completed: boolean;
  icon: string;
}

interface SmartInsight {
  type: "recovery" | "motivation" | "warning" | "success";
  title: string;
  message: string;
  icon: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export default function Activity() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "plan" | "progress">(
    "overview"
  );
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showExerciseModal || showOnboardingModal || showResetConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showExerciseModal, showOnboardingModal, showResetConfirm]);

  // Hardcoded movement profile
  const movementProfile: MovementProfile = {
    vo2Max: 42,
    vo2MaxCategory: "Good",
    physicalCondition: 78,
    strength: {
      pushUps: 25,
      squats: 40,
      pullUps: 8,
    },
    flexibility: 65,
    posturalIssues: ["Rounded shoulders", "Forward head"],
  };

  // Today's activity
  const todayActivity: TodayActivity = {
    steps: 12547,
    calories: 1250,
    activeMinutes: 45,
    hrv: 68,
    exerciseIntensity: {
      light: 15,
      moderate: 25,
      vigorous: 5,
    },
  };

  // Activity breakdown
  const activityBreakdown: ActivityBreakdown[] = [
    { type: "Running", calories: 450, duration: 30, icon: "🏃" },
    { type: "Cycling", calories: 320, duration: 25, icon: "🚴" },
    { type: "Gym", calories: 280, duration: 40, icon: "🏋️" },
    { type: "Walking", calories: 200, duration: 60, icon: "🚶" },
  ];

  // Smart insights
  const smartInsights: SmartInsight[] = [
    {
      type: "recovery",
      title: "Recovery Status: Good",
      message: "Your HRV is 68ms - Ready for moderate intensity workout",
      icon: "💚",
    },
    {
      type: "warning",
      title: "Watch Your Posture",
      message:
        "Rounded shoulders detected. Added corrective exercises to your plan.",
      icon: "⚠️",
    },
    {
      type: "motivation",
      title: "Friend Activity",
      message:
        "Sarah completed a 10K run today! Challenge her to beat her time? 🏃",
      icon: "🔥",
    },
    {
      type: "success",
      title: "Great Progress!",
      message: "You've increased your push-up count by 15% this month!",
      icon: "🎉",
    },
  ];

  // Week workout plan
  const [weekPlan, setWeekPlan] = useState<WorkoutDay[]>([
    {
      day: "Mon",
      date: "Dec 8",
      type: "Upper Body",
      intensity: "Moderate",
      completed: true,
      scheduled: true,
      exercises: [
        {
          name: "Push-ups",
          sets: 3,
          reps: "12-15",
          rest: "60s",
          equipment: "None",
          completed: true,
          icon: "💪",
        },
        {
          name: "Dumbbell Rows",
          sets: 3,
          reps: "10-12",
          rest: "60s",
          equipment: "Dumbbells",
          completed: true,
          icon: "🏋️",
        },
        {
          name: "Shoulder Press",
          sets: 3,
          reps: "10-12",
          rest: "60s",
          equipment: "Dumbbells",
          completed: true,
          icon: "💪",
        },
        {
          name: "Bicep Curls",
          sets: 3,
          reps: "12-15",
          rest: "45s",
          equipment: "Dumbbells",
          completed: true,
          icon: "💪",
        },
      ],
    },
    {
      day: "Tue",
      date: "Dec 9",
      type: "Cardio",
      intensity: "Light",
      completed: true,
      scheduled: true,
      exercises: [
        {
          name: "Light Jogging",
          sets: 1,
          reps: "20 min",
          rest: "N/A",
          equipment: "None",
          completed: true,
          icon: "🏃",
        },
        {
          name: "Cycling",
          sets: 1,
          reps: "15 min",
          rest: "N/A",
          equipment: "Bike",
          completed: true,
          icon: "🚴",
        },
      ],
    },
    {
      day: "Wed",
      date: "Dec 10",
      type: "Rest Day",
      intensity: "Rest",
      completed: true,
      scheduled: true,
    },
    {
      day: "Thu",
      date: "Dec 11",
      type: "Lower Body",
      intensity: "High",
      completed: false,
      scheduled: true,
      exercises: [
        {
          name: "Squats",
          sets: 4,
          reps: "12-15",
          rest: "90s",
          equipment: "Barbell",
          completed: false,
          icon: "🦵",
        },
        {
          name: "Lunges",
          sets: 3,
          reps: "10 each",
          rest: "60s",
          equipment: "Dumbbells",
          completed: false,
          icon: "🦵",
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: "12-15",
          rest: "75s",
          equipment: "Machine",
          completed: false,
          icon: "🏋️",
        },
        {
          name: "Calf Raises",
          sets: 3,
          reps: "15-20",
          rest: "45s",
          equipment: "None",
          completed: false,
          icon: "🦵",
        },
      ],
    },
    {
      day: "Fri",
      date: "Dec 12",
      type: "Core & Flexibility",
      intensity: "Light",
      completed: false,
      scheduled: true,
      exercises: [
        {
          name: "Plank",
          sets: 3,
          reps: "45s",
          rest: "30s",
          equipment: "None",
          completed: false,
          icon: "🧘",
        },
        {
          name: "Russian Twists",
          sets: 3,
          reps: "20",
          rest: "30s",
          equipment: "None",
          completed: false,
          icon: "🧘",
        },
        {
          name: "Stretching",
          sets: 1,
          reps: "15 min",
          rest: "N/A",
          equipment: "Mat",
          completed: false,
          icon: "🧘",
        },
      ],
    },
    {
      day: "Sat",
      date: "Dec 13",
      type: "Full Body",
      intensity: "Moderate",
      completed: false,
      scheduled: true,
      exercises: [
        {
          name: "Burpees",
          sets: 3,
          reps: "10",
          rest: "60s",
          equipment: "None",
          completed: false,
          icon: "💪",
        },
        {
          name: "Pull-ups",
          sets: 3,
          reps: "8-10",
          rest: "90s",
          equipment: "Bar",
          completed: false,
          icon: "💪",
        },
        {
          name: "Deadlifts",
          sets: 3,
          reps: "10-12",
          rest: "90s",
          equipment: "Barbell",
          completed: false,
          icon: "🏋️",
        },
      ],
    },
    {
      day: "Sun",
      date: "Dec 14",
      type: "Active Recovery",
      intensity: "Light",
      completed: false,
      scheduled: true,
      exercises: [
        {
          name: "Yoga",
          sets: 1,
          reps: "30 min",
          rest: "N/A",
          equipment: "Mat",
          completed: false,
          icon: "🧘",
        },
        {
          name: "Light Walk",
          sets: 1,
          reps: "20 min",
          rest: "N/A",
          equipment: "None",
          completed: false,
          icon: "🚶",
        },
      ],
    },
  ]);

  // Achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Workout",
      description: "Complete your first workout",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "Complete 5 workouts in a week",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: "3",
      title: "Month Master",
      description: "Train for 30 consecutive days",
      icon: "👑",
      unlocked: false,
      progress: 8,
      target: 30,
    },
    {
      id: "4",
      title: "Push-up Pro",
      description: "Do 50 push-ups in one session",
      icon: "💪",
      unlocked: false,
      progress: 25,
      target: 50,
    },
    {
      id: "5",
      title: "Cardio King",
      description: "Burn 3000 calories in a week",
      icon: "🏃",
      unlocked: true,
    },
    {
      id: "6",
      title: "Strength Beast",
      description: "Lift 1000kg total volume",
      icon: "🏋️",
      unlocked: false,
      progress: 650,
      target: 1000,
    },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Rest":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "Light":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "recovery":
        return "from-green-500/10 to-green-600/10 border-green-500/20";
      case "motivation":
        return "from-orange-500/10 to-orange-600/10 border-orange-500/20";
      case "warning":
        return "from-yellow-500/10 to-yellow-600/10 border-yellow-500/20";
      case "success":
        return "from-blue-500/10 to-blue-600/10 border-blue-500/20";
      default:
        return "from-gray-500/10 to-gray-600/10 border-gray-500/20";
    }
  };

  const handleCompleteExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedPlan = [...weekPlan];
    if (updatedPlan[dayIndex].exercises) {
      updatedPlan[dayIndex].exercises![exerciseIndex].completed =
        !updatedPlan[dayIndex].exercises![exerciseIndex].completed;
      setWeekPlan(updatedPlan);
    }
  };

  const handleCompleteDay = (dayIndex: number) => {
    const updatedPlan = [...weekPlan];
    updatedPlan[dayIndex].completed = !updatedPlan[dayIndex].completed;
    setWeekPlan(updatedPlan);
  };

  const handleResetActivityData = () => {
    // Reset to default state
    const defaultPlan: WorkoutDay[] = [
      {
        day: "Mon",
        date: "Dec 8",
        type: "Upper Body",
        intensity: "Moderate",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: "12-15",
            rest: "60s",
            equipment: "None",
            completed: false,
            icon: "💪",
          },
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: "10-12",
            rest: "60s",
            equipment: "Dumbbells",
            completed: false,
            icon: "🏋️",
          },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: "10-12",
            rest: "60s",
            equipment: "Dumbbells",
            completed: false,
            icon: "💪",
          },
          {
            name: "Bicep Curls",
            sets: 3,
            reps: "12-15",
            rest: "45s",
            equipment: "Dumbbells",
            completed: false,
            icon: "💪",
          },
        ],
      },
      {
        day: "Tue",
        date: "Dec 9",
        type: "Cardio",
        intensity: "Light",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Light Jogging",
            sets: 1,
            reps: "20 min",
            rest: "N/A",
            equipment: "None",
            completed: false,
            icon: "🏃",
          },
          {
            name: "Cycling",
            sets: 1,
            reps: "15 min",
            rest: "N/A",
            equipment: "Bike",
            completed: false,
            icon: "🚴",
          },
        ],
      },
      {
        day: "Wed",
        date: "Dec 10",
        type: "Rest Day",
        intensity: "Rest",
        completed: false,
        scheduled: true,
      },
      {
        day: "Thu",
        date: "Dec 11",
        type: "Lower Body",
        intensity: "High",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: "12-15",
            rest: "90s",
            equipment: "Barbell",
            completed: false,
            icon: "🦵",
          },
          {
            name: "Lunges",
            sets: 3,
            reps: "10 each",
            rest: "60s",
            equipment: "Dumbbells",
            completed: false,
            icon: "🦵",
          },
          {
            name: "Leg Press",
            sets: 3,
            reps: "12-15",
            rest: "75s",
            equipment: "Machine",
            completed: false,
            icon: "🏋️",
          },
          {
            name: "Calf Raises",
            sets: 3,
            reps: "15-20",
            rest: "45s",
            equipment: "None",
            completed: false,
            icon: "🦵",
          },
        ],
      },
      {
        day: "Fri",
        date: "Dec 12",
        type: "Core & Flexibility",
        intensity: "Light",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Plank",
            sets: 3,
            reps: "45s",
            rest: "30s",
            equipment: "None",
            completed: false,
            icon: "🧘",
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: "20",
            rest: "30s",
            equipment: "None",
            completed: false,
            icon: "🧘",
          },
          {
            name: "Stretching",
            sets: 1,
            reps: "15 min",
            rest: "N/A",
            equipment: "Mat",
            completed: false,
            icon: "🧘",
          },
        ],
      },
      {
        day: "Sat",
        date: "Dec 13",
        type: "Full Body",
        intensity: "Moderate",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Burpees",
            sets: 3,
            reps: "10",
            rest: "60s",
            equipment: "None",
            completed: false,
            icon: "💪",
          },
          {
            name: "Pull-ups",
            sets: 3,
            reps: "8-10",
            rest: "90s",
            equipment: "Bar",
            completed: false,
            icon: "💪",
          },
          {
            name: "Deadlifts",
            sets: 3,
            reps: "10-12",
            rest: "90s",
            equipment: "Barbell",
            completed: false,
            icon: "🏋️",
          },
        ],
      },
      {
        day: "Sun",
        date: "Dec 14",
        type: "Active Recovery",
        intensity: "Light",
        completed: false,
        scheduled: true,
        exercises: [
          {
            name: "Yoga",
            sets: 1,
            reps: "30 min",
            rest: "N/A",
            equipment: "Mat",
            completed: false,
            icon: "🧘",
          },
          {
            name: "Light Walk",
            sets: 1,
            reps: "20 min",
            rest: "N/A",
            equipment: "None",
            completed: false,
            icon: "🚶",
          },
        ],
      },
    ];

    setWeekPlan(defaultPlan);
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
        activity: newAnswers,
      },
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowOnboardingModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <AppLayout>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 bg-green-500/90 backdrop-blur-lg text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg animate-fade-in flex items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-2xl">✅</span>
          <span className="font-medium text-sm sm:text-base">
            Updated successfully!
          </span>
        </div>
      )}

      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text-animated">
                Activity Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Track your workouts and reach your fitness goals
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-base">⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-base">🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
            {/* Connected Device */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg md:text-xl">⌚</span>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  Device
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Apple Watch
              </p>
              <p className="text-[10px] sm:text-xs text-green-400">
                ● Connected
              </p>
            </div>

            {/* Today's Steps */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg md:text-xl">👟</span>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  Steps
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-white">
                {todayActivity.steps.toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Goal: 10,000
              </p>
            </div>

            {/* Calories Burned */}
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <span className="text-base sm:text-lg md:text-xl">🔥</span>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  Calories
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-white">
                {todayActivity.calories}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">Today</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeTab === "plan"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Workout Plan
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeTab === "progress"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Progress
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Movement Profile Card */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl sm:text-2xl">
                    🏃
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Movement Profile
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Your fitness baseline assessment
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  {/* VO2 Max */}
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        VO2 Max
                      </span>
                      <span className="text-xl sm:text-2xl">🫁</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {movementProfile.vo2Max}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-400">
                      ml/kg/min • {movementProfile.vo2MaxCategory}
                    </p>
                  </div>

                  {/* Physical Condition */}
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Physical Condition
                      </span>
                      <span className="text-xl sm:text-2xl">💪</span>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {movementProfile.physicalCondition}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">
                        /100
                      </p>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-green-500 to-green-400"
                        style={{
                          width: `${movementProfile.physicalCondition}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Strength Metrics */}
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Relative Strength
                      </span>
                      <span className="text-xl sm:text-2xl">🏋️</span>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-300">
                          Push-ups
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white">
                          {movementProfile.strength.pushUps}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-300">
                          Squats
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white">
                          {movementProfile.strength.squats}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-300">
                          Pull-ups
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white">
                          {movementProfile.strength.pullUps}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flexibility & Posture */}
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Flexibility & Posture
                      </span>
                      <span className="text-xl sm:text-2xl">🧘</span>
                    </div>
                    <div className="mb-2 sm:mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm text-gray-300">
                          Flexibility Score
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white">
                          {movementProfile.flexibility}/100
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-orange-500 to-orange-400"
                          style={{ width: `${movementProfile.flexibility}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Postural Issues:
                      </p>
                      {movementProfile.posturalIssues.map((issue, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 mr-1"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Activity Details */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Today's Activity
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2">
                      <span className="text-base sm:text-lg md:text-xl">
                        ⏱️
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        Active Minutes
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {todayActivity.activeMinutes}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                      Goal: 30 min
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2">
                      <span className="text-base sm:text-lg md:text-xl">
                        ❤️
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        HRV
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {todayActivity.hrv} ms
                    </p>
                    <p className="text-[10px] sm:text-xs text-green-400 mt-1">
                      Good recovery
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 col-span-2">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-base sm:text-lg md:text-xl">
                        📊
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        Exercise Intensity
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                          <span className="text-gray-400">Light</span>
                          <span className="text-white">
                            {todayActivity.exerciseIntensity.light} min
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${
                                (todayActivity.exerciseIntensity.light / 45) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                          <span className="text-gray-400">Moderate</span>
                          <span className="text-white">
                            {todayActivity.exerciseIntensity.moderate} min
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{
                              width: `${
                                (todayActivity.exerciseIntensity.moderate /
                                  45) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                          <span className="text-gray-400">Vigorous</span>
                          <span className="text-white">
                            {todayActivity.exerciseIntensity.vigorous} min
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500"
                            style={{
                              width: `${
                                (todayActivity.exerciseIntensity.vigorous /
                                  45) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Type Breakdown */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-1">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    Activity Breakdown
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-400">
                    Calories burned by type
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  {activityBreakdown.map((activity, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl">
                            {activity.icon}
                          </span>
                          <div>
                            <h3 className="font-bold text-white text-sm sm:text-base">
                              {activity.type}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-gray-400">
                              {activity.duration} min
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                            {activity.calories}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400">
                            calories
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-primary to-secondary"
                          style={{
                            width: `${(activity.calories / 450) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-xs sm:text-sm text-primary">
                    💡 <strong>Insight:</strong> Running burns the most calories
                    for you! Consider adding more cardio sessions.
                  </p>
                </div>
              </div>

              {/* Smart Insights */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">
                  Smart Insights
                </h2>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  {smartInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br border ${getInsightColor(
                        insight.type
                      )}`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">
                          {insight.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-white mb-1 text-sm sm:text-base">
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

          {/* WORKOUT PLAN TAB */}
          {activeTab === "plan" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Week Overview */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      This Week's Plan
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Personalized based on your fitness level
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                      3/7
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Completed
                    </p>
                  </div>
                </div>

                {/* 7-Day Calendar */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {weekPlan.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDay(day);
                        if (day.type !== "Rest Day") {
                          setShowExerciseModal(true);
                        }
                      }}
                      className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        day.completed
                          ? "bg-green-500/20 border-green-500/40"
                          : day.scheduled
                          ? "bg-white/5 border-white/10 hover:border-primary/40"
                          : "bg-white/5 border-white/10 opacity-50"
                      }`}
                    >
                      <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">
                        {day.day}
                      </p>
                      <p className="text-[10px] sm:text-xs font-bold text-white mb-0.5 sm:mb-1">
                        {day.date}
                      </p>
                      <div className="text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">
                        {day.completed
                          ? "✓"
                          : day.type === "Rest Day"
                          ? "😴"
                          : "💪"}
                      </div>
                      <span
                        className={`text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full ${getIntensityColor(
                          day.intensity
                        )}`}
                      >
                        {day.intensity}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Week Statistics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                      Total Workouts
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      6
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                      Est. Calories
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      2,400
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                      Rest Days
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      1
                    </p>
                  </div>
                </div>
              </div>

              {/* Daily Workout Cards */}
              {weekPlan
                .filter((day) => day.type !== "Rest Day")
                .map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl ${
                            day.completed ? "bg-green-500/20" : "bg-primary/20"
                          }`}
                        >
                          {day.completed ? "✓" : "💪"}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {day.day} - {day.type}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {day.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${getIntensityColor(
                            day.intensity
                          )}`}
                        >
                          {day.intensity}
                        </span>
                        <button
                          onClick={() =>
                            handleCompleteDay(weekPlan.indexOf(day))
                          }
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                            day.completed
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                          }`}
                        >
                          {day.completed ? "Completed" : "Mark Complete"}
                        </button>
                      </div>
                    </div>

                    {/* Exercises List */}
                    {day.exercises && (
                      <div className="space-y-2 sm:space-y-3">
                        {day.exercises.map((exercise, exIdx) => (
                          <div
                            key={exIdx}
                            className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                              exercise.completed
                                ? "bg-green-500/10 border-green-500/20"
                                : "bg-white/5 border-white/10 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                              <button
                                onClick={() =>
                                  handleCompleteExercise(
                                    weekPlan.indexOf(day),
                                    exIdx
                                  )
                                }
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${
                                  exercise.completed
                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                    : "border-white/20 hover:border-primary"
                                }`}
                              >
                                {exercise.completed && "✓"}
                              </button>
                              <span className="text-xl sm:text-2xl">
                                {exercise.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm sm:text-base">
                                  {exercise.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-1">
                                  <span className="text-xs sm:text-sm text-gray-400">
                                    {exercise.sets} sets × {exercise.reps}
                                  </span>
                                  <span className="text-xs sm:text-sm text-gray-400">
                                    Rest: {exercise.rest}
                                  </span>
                                  <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs bg-primary/20 text-primary">
                                    {exercise.equipment}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              {/* Equipment & Location Info */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Workout Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-xl sm:text-2xl">🏠</span>
                      <span className="font-medium text-white text-sm sm:text-base">
                        Location
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Home & Gym hybrid plan
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-xl sm:text-2xl">🏋️</span>
                      <span className="font-medium text-white text-sm sm:text-base">
                        Equipment
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Dumbbells, Barbell, Resistance bands
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRESS TAB */}
          {activeTab === "progress" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Strength Progress */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Strength Progress
                </h2>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Push-ups
                      </span>
                      <span className="text-xl sm:text-2xl">💪</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {movementProfile.strength.pushUps}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-green-400">↑ +15%</span>
                      <span className="text-gray-400">this month</span>
                    </div>
                    <div className="mt-2 sm:mt-3 h-16 sm:h-20 flex items-end gap-1">
                      {[18, 20, 22, 23, 25].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-blue-500/30 rounded-t"
                          style={{ height: `${(val / 25) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Squats
                      </span>
                      <span className="text-xl sm:text-2xl">🦵</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {movementProfile.strength.squats}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-green-400">↑ +25%</span>
                      <span className="text-gray-400">this month</span>
                    </div>
                    <div className="mt-2 sm:mt-3 h-16 sm:h-20 flex items-end gap-1">
                      {[28, 32, 35, 38, 40].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-purple-500/30 rounded-t"
                          style={{ height: `${(val / 40) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        Pull-ups
                      </span>
                      <span className="text-xl sm:text-2xl">🏋️</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {movementProfile.strength.pullUps}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-green-400">↑ +60%</span>
                      <span className="text-gray-400">this month</span>
                    </div>
                    <div className="mt-2 sm:mt-3 h-16 sm:h-20 flex items-end gap-1">
                      {[3, 5, 6, 7, 8].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-green-500/30 rounded-t"
                          style={{ height: `${(val / 8) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Weekly Activity
                </h2>
                <div className="h-48 sm:h-56 md:h-64 flex items-end gap-2 sm:gap-3">
                  {[
                    { day: "Mon", calories: 450, active: 45 },
                    { day: "Tue", calories: 320, active: 30 },
                    { day: "Wed", calories: 0, active: 0 },
                    { day: "Thu", calories: 500, active: 50 },
                    { day: "Fri", calories: 380, active: 40 },
                    { day: "Sat", calories: 420, active: 42 },
                    { day: "Sun", calories: 180, active: 25 },
                  ].map((day, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full flex flex-col gap-1">
                        <div
                          className="w-full bg-linear-to-t from-primary to-primary/50 rounded-t-lg transition-all duration-500 hover:scale-105"
                          style={{ height: `${(day.calories / 500) * 200}px` }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs font-bold text-white">
                          {day.day}
                        </p>
                        <p className="text-[9px] sm:text-xs text-gray-400">
                          {day.calories}cal
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Achievements
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-linear-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/40"
                          : "bg-white/5 border-white/10 opacity-60"
                      }`}
                    >
                      <div className="text-center mb-2 sm:mb-3">
                        <span className="text-3xl sm:text-4xl md:text-5xl">
                          {achievement.icon}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-center mb-1 text-sm sm:text-base">
                        {achievement.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 text-center mb-2 sm:mb-3">
                        {achievement.description}
                      </p>
                      {!achievement.unlocked &&
                        achievement.progress &&
                        achievement.target && (
                          <div>
                            <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">
                                {achievement.progress}/{achievement.target}
                              </span>
                            </div>
                            <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-linear-to-r from-primary to-secondary"
                                style={{
                                  width: `${
                                    (achievement.progress /
                                      achievement.target) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      {achievement.unlocked && (
                        <div className="text-center">
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            ✓ Unlocked
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Streaks & Milestones */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                    Current Streak
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">
                      🔥
                    </div>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">
                      8
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      days in a row
                    </p>
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <p className="text-xs sm:text-sm text-orange-400">
                        Keep going! 2 more days for a new record 🎯
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-card border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                    Milestones
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20">
                      <span className="text-xl sm:text-2xl">✓</span>
                      <div>
                        <p className="font-medium text-white text-sm sm:text-base">
                          100 Workouts
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          Completed on Nov 15
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20">
                      <span className="text-xl sm:text-2xl">✓</span>
                      <div>
                        <p className="font-medium text-white text-sm sm:text-base">
                          50,000 Calories Burned
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          Completed on Nov 28
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 opacity-60">
                      <span className="text-xl sm:text-2xl">🔒</span>
                      <div>
                        <p className="font-medium text-white text-sm sm:text-base">
                          150 Workouts
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          42 more to unlock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercise Detail Modal */}
        {showExerciseModal && selectedDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-card rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowExerciseModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl sm:text-3xl">
                  💪
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {selectedDay.day} - {selectedDay.type}
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {selectedDay.date}
                  </p>
                </div>
              </div>

              {selectedDay.exercises && (
                <div className="space-y-3 sm:space-y-4">
                  {selectedDay.exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="text-2xl sm:text-3xl md:text-4xl">
                          {exercise.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                            {exercise.name}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 mb-2 sm:mb-3">
                            <div className="p-2 rounded bg-white/5">
                              <p className="text-[10px] sm:text-xs text-gray-400">
                                Sets × Reps
                              </p>
                              <p className="text-xs sm:text-sm font-bold text-white">
                                {exercise.sets} × {exercise.reps}
                              </p>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <p className="text-[10px] sm:text-xs text-gray-400">
                                Rest
                              </p>
                              <p className="text-xs sm:text-sm font-bold text-white">
                                {exercise.rest}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-primary/20 text-primary border border-primary/30">
                            {exercise.equipment}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleCompleteExercise(
                              weekPlan.indexOf(selectedDay),
                              idx
                            )
                          }
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${
                            exercise.completed
                              ? "bg-green-500/20 border-green-500 text-green-400"
                              : "border-white/20 hover:border-primary"
                          }`}
                        >
                          {exercise.completed && "✓"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowExerciseModal(false)}
                className="w-full mt-6 px-4 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-dark-card border border-white/10 rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">⚠️</span>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Reset Activity Data?
                </h2>
                <p className="text-gray-400">
                  This will reset all your workout progress. This action cannot
                  be undone.
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
                  onClick={handleResetActivityData}
                  className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-medium transition-all duration-300"
                >
                  Reset
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
      </div>
    </AppLayout>
  );
}

// ============= ONBOARDING SETTINGS MODAL COMPONENT =============

function OnboardingSettingsModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.optionalAnswers?.activity || {};
  });

  const questions = [
    {
      key: "frequency",
      label: "How many days per week do you usually exercise?",
      options: [
        { value: "0", label: "0 days" },
        { value: "1-2", label: "1–2 days" },
        { value: "3-4", label: "3–4 days" },
        { value: "5+", label: "5 or more days" },
      ],
    },
    {
      key: "duration",
      label: "On a typical workout day, how long are you active?",
      options: [
        { value: "<20", label: "Less than 20 minutes" },
        { value: "20-40", label: "20–40 minutes" },
        { value: "40-60", label: "40–60 minutes" },
        { value: "60+", label: "More than 60 minutes" },
      ],
    },
    {
      key: "type",
      label: "What type of activity do you do most often?",
      options: [
        { value: "walking", label: "Walking / running" },
        { value: "gym", label: "Gym / strength training" },
        { value: "sports", label: "Team sports" },
        { value: "home", label: "Home workouts" },
        { value: "cycling", label: "Cycling" },
        { value: "yoga", label: "Yoga / Pilates" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "intensity",
      label: "How would you describe your usual workout intensity?",
      options: [
        { value: "light", label: "Light (easy pace, can talk easily)" },
        {
          value: "moderate",
          label: "Moderate (somewhat hard, can still talk)",
        },
        { value: "intense", label: "Intense (hard, difficult to talk)" },
        { value: "varies", label: "Varies day to day" },
      ],
    },
    {
      key: "tracker",
      label: "Do you use any fitness tracker or smartwatch?",
      options: [
        { value: "yes", label: "Yes, regularly" },
        { value: "sometimes", label: "Sometimes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "goals",
      label: "What are your main fitness goals?",
      options: [
        { value: "weight-loss", label: "Weight loss" },
        { value: "muscle", label: "Build muscle / strength" },
        { value: "endurance", label: "Improve endurance / cardio" },
        { value: "flexibility", label: "Increase flexibility" },
        { value: "general", label: "General health & wellness" },
        { value: "sports", label: "Sports performance" },
      ],
    },
    {
      key: "equipment",
      label: "What equipment do you have access to?",
      options: [
        { value: "none", label: "None / bodyweight only" },
        { value: "basic", label: "Basic (dumbbells, resistance bands)" },
        { value: "gym", label: "Full gym access" },
        { value: "home-gym", label: "Home gym setup" },
      ],
    },
    {
      key: "injuries",
      label: "Do you have any injuries or physical limitations?",
      options: [
        { value: "none", label: "None" },
        { value: "back", label: "Back issues" },
        { value: "knee", label: "Knee problems" },
        { value: "shoulder", label: "Shoulder problems" },
        { value: "other", label: "Other limitations" },
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
            <h2 className="text-2xl font-bold text-white">Activity Settings</h2>
            <p className="text-sm text-gray-400 mt-1">
              Customize your fitness tracking preferences
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
            <div key={question.key}>
              <label className="block text-sm font-medium text-white mb-3">
                {question.label}
              </label>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                      answers[question.key] === option.value
                        ? "bg-primary/20 border-primary/40 text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
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
            className="flex-1 px-4 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
