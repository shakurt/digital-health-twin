"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import HealthAvatar from "@/components/HealthAvatar";
import { UserHealthData } from "@/components/AvatarCalculations";

interface UserData {
  username: string;
  email: string;
  sex?: string;
  birthdate?: string;
  height?: string;
  weight?: string;
  job?: string;
  goal?: string;
  activityLevel?: string;
  sleepData?: any;
  activityData?: any;
  nutritionData?: any;
  mindfulnessData?: any;
  optionalAnswers?: {
    sleep?: any;
    nutrition?: any;
    mindfulness?: any;
    activity?: any;
  };
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState<"basic" | "optional">("basic");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [selectedPrivacyModule, setSelectedPrivacyModule] = useState<
    string | null
  >(null);

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      healthAlerts: true,
      dailyReminders: true,
      weeklyReports: false,
      achievements: true,
      emailNotifications: false,
      pushNotifications: true,
    };
  });

  // Form state for editing
  const [formData, setFormData] = useState({
    sex: "",
    birthdate: "",
    height: "",
    weight: "",
    job: "",
    goal: "",
    activityLevel: "",
  });

  // Check session and load user data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/signin");
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (!parsedUser.session) {
      router.push("/signin");
      return;
    }
    setUser(parsedUser);
    setFormData({
      sex: parsedUser.sex || "",
      birthdate: parsedUser.birthdate || "",
      height: parsedUser.height || "",
      weight: parsedUser.weight || "",
      job: parsedUser.job || "",
      goal: parsedUser.goal || "",
      activityLevel: parsedUser.activityLevel || "",
    });
  }, [router]);

  // Disable body scroll when modals are open
  useEffect(() => {
    if (showEditModal || showPrivacyModal) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
      window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
    };
  }, [showEditModal, showPrivacyModal]);

  // Prepare user health data for avatar
  const getUserHealthData = (): UserHealthData => {
    if (!user) return {};

    return {
      height: user.height,
      weight: user.weight,
      age: user.birthdate ? getAge() : undefined,
      sleepData: user.sleepData,
      activityData: user.activityData,
      nutritionData: user.nutritionData,
      mindfulnessData: user.mindfulnessData,
    };
  };

  const getAge = () => {
    if (!user?.birthdate) return undefined;
    const birthDate = new Date(user.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSaveBasicInfo = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      ...formData,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEditModal(false);
  };

  const privacyModules = [
    {
      id: "nutrition",
      name: "Nutrition",
      icon: "🍎",
      description: "Food tracking, meal patterns, allergies",
      dataTypes: [
        "Meal logs",
        "Calorie data",
        "Dietary preferences",
        "Allergies",
      ],
    },
    {
      id: "sleep",
      name: "Sleep & Recovery",
      icon: "😴",
      description: "Sleep hours, quality, bedtime patterns",
      dataTypes: ["Sleep duration", "Bedtime", "Wake time", "Sleep quality"],
    },
    {
      id: "mindfulness",
      name: "Mindfulness",
      icon: "🧘",
      description: "Mood logs, stress levels, meditation",
      dataTypes: [
        "Mood entries",
        "Stress levels",
        "Meditation logs",
        "Gratitude notes",
      ],
    },
    {
      id: "activity",
      name: "Activity",
      icon: "⚡",
      description: "Steps, workouts, exercise data",
      dataTypes: [
        "Step count",
        "Workout logs",
        "Calories burned",
        "Activity minutes",
      ],
    },
    {
      id: "health",
      name: "Health Metrics",
      icon: "❤️",
      description: "Heart rate, blood pressure, vitals",
      dataTypes: [
        "Heart rate",
        "Blood pressure",
        "Body temperature",
        "Oxygen levels",
      ],
    },
  ];

  if (!user) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen pb-20">
        {/* Header with Avatar */}
        <div className="relative">
          {/* Cover Background */}
          <div className="h-32 md:h-40 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 border-b border-white/10"></div>

          {/* Profile Info Overlay */}
          <div className="px-4 md:px-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-6">
              {/* Health Avatar */}
              <div className="relative">
                <HealthAvatar
                  userData={getUserHealthData()}
                  gender={user.sex as "male" | "female" | "neutral"}
                  size={128}
                  context="profile"
                  showStatus={true}
                  showHealthScore={true}
                  showInsights={true}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left mb-4">
                <h1 className="text-3xl md:text-4xl font-bold gradient-text-animated mb-1">
                  {user.username}
                </h1>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {user.sex === "male"
                      ? "Male"
                      : user.sex === "female"
                      ? "Female"
                      : "Not specified"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                    {getAge()} years old
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                    {user.goal || "No goal set"}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => {
                  setEditSection("basic");
                  setShowEditModal(true);
                }}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                <div className="flex items-center gap-2">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information Card */}
            <div className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  Basic Information
                </h2>
                <button
                  onClick={() => {
                    setEditSection("basic");
                    setShowEditModal(true);
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Sex</p>
                    <p className="text-white font-medium">
                      {user.sex === "male"
                        ? "Male"
                        : user.sex === "female"
                        ? "Female"
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Birthdate</p>
                    <p className="text-white font-medium">
                      {user.birthdate || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">Height</p>
                      <p className="text-white font-medium">
                        {user.height ? `${user.height} cm` : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg">⚖️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">Weight</p>
                      <p className="text-white font-medium">
                        {user.weight ? `${user.weight} kg` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Job</p>
                    <p className="text-white font-medium">
                      {user.job || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Activity Level</p>
                    <p className="text-white font-medium">
                      {user.activityLevel || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Stats Card */}
            <div className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5">
              <h2 className="text-xl font-bold text-white mb-4">
                Health Stats
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">BMI</span>
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {user.height && user.weight
                      ? (
                          parseFloat(user.weight) /
                          Math.pow(parseFloat(user.height) / 100, 2)
                        ).toFixed(1)
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Body Mass Index</p>
                </div>

                <div className="p-4 rounded-xl bg-linear-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Goal</span>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {user.goal || "Not set"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Health objective</p>
                </div>

                <div className="p-4 rounded-xl bg-linear-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Member Since</span>
                    <span className="text-2xl">📅</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Account created</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Data Control Section */}
          <div className="mt-6">
            <div className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Privacy & Data Control
                  </h2>
                  <p className="text-sm text-gray-400">
                    Manage your data privacy for each module
                  </p>
                </div>
              </div>

              {/* Privacy Status Banner */}
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">
                      Your Data is Protected
                    </h3>
                    <p className="text-xs text-gray-400">
                      All data is encrypted and stored locally on your device
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Modules Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {privacyModules.map((module) => (
                  <div
                    key={module.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      setSelectedPrivacyModule(module.id);
                      setShowPrivacyModal(true);
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">{module.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">
                          {module.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {module.description}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {module.dataTypes.slice(0, 2).map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400"
                        >
                          {type}
                        </span>
                      ))}
                      {module.dataTypes.length > 2 && (
                        <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400">
                          +{module.dataTypes.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Global Privacy Actions */}
              <div className="grid md:grid-cols-4 gap-3">
                <button className="p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 transition-all group">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="text-sm font-medium text-blue-400">
                      Export All Data
                    </span>
                  </div>
                </button>

                <button className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 transition-all group">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-purple-400">
                      Data Sharing
                    </span>
                  </div>
                </button>

                <button className="p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 transition-all group">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="text-sm font-medium text-red-400">
                      Delete All Data
                    </span>
                  </div>
                </button>

                <button className="p-4 rounded-xl bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 hover:border-gray-500/30 transition-all group">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-400">
                      Privacy Policy
                    </span>
                  </div>
                </button>
              </div>

              {/* Data Usage Info */}
              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <h4 className="font-semibold text-white mb-2">
                  How we protect your data
                </h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Stored locally on your device</li>
                  <li>• Used only for personalization</li>
                  <li>• Never shared with third parties</li>
                  <li>• You can export or delete anytime</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mt-6">
            <div className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-3xl">🔔</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Notifications</h2>
                  <p className="text-sm text-gray-400">Manage your notification preferences</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Health Alerts</h3>
                    <p className="text-sm text-gray-400">Get notified about important health changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.healthAlerts}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, healthAlerts: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Daily Reminders</h3>
                    <p className="text-sm text-gray-400">Daily check-ins and habit reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.dailyReminders}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, dailyReminders: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Weekly Reports</h3>
                    <p className="text-sm text-gray-400">Weekly health summaries and insights</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, weeklyReports: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Achievements</h3>
                    <p className="text-sm text-gray-400">Celebrate your health milestones</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.achievements}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, achievements: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, emailNotifications: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => {
                        const newSettings = {...notificationSettings, pushNotifications: e.target.checked};
                        setNotificationSettings(newSettings);
                        localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Account Section */}
          <div className="mt-6">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/20 p-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <span className="text-2xl">👑</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Upgrade to Premium</h2>
                    <p className="text-sm text-gray-300">Unlock your full health potential</p>
                  </div>
                </div>

                <p className="text-gray-200 mb-6 leading-relaxed">
                  Take your health journey to the next level with premium features designed to give you deeper insights,
                  personalized guidance, and unlimited access to all tools.
                </p>

                {/* Premium Features Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Advanced AI Insights</h4>
                      <p className="text-xs text-gray-400">Get personalized health predictions and detailed analytics</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">📊</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Unlimited Data Storage</h4>
                      <p className="text-xs text-gray-400">Store years of health data with no limits</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">🎯</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Personalized Coaching</h4>
                      <p className="text-xs text-gray-400">1-on-1 health coaching with certified experts</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">📱</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Family Accounts</h4>
                      <p className="text-xs text-gray-400">Manage health for up to 5 family members</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">📈</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Advanced Reports</h4>
                      <p className="text-xs text-gray-400">Detailed PDF reports and data export</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">⚡</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Priority Support</h4>
                      <p className="text-xs text-gray-400">24/7 priority customer support</p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-white mb-1">$9.99<span className="text-sm font-normal text-gray-400">/month</span></div>
                    <p className="text-xs text-gray-400">Cancel anytime • 30-day free trial</p>
                  </div>
                  <button className="px-8 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-card rounded-2xl border border-white/10 p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
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

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                Edit Profile Information
              </h2>

              <div className="space-y-4">
                {/* Sex */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                    Sex
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["male", "female"].map((sex) => (
                      <button
                        key={sex}
                        onClick={() => setFormData({ ...formData, sex })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.sex === sex
                            ? "border-primary bg-primary/20"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="text-3xl mb-2">
                          {sex === "male" ? "👨" : "👩"}
                        </div>
                        <p className="font-medium text-white capitalize">
                          {sex}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Birthdate */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthdate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
                      placeholder="170"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      placeholder="70"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Job */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                    Job
                  </label>
                  <select
                    value={formData.job}
                    onChange={(e) =>
                      setFormData({ ...formData, job: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option className="text-black" value="">Select job</option>
                    <option className="text-black" value="student">Student</option>
                    <option className="text-black" value="office-worker">Office Worker</option>
                    <option className="text-black" value="software-developer">
                      Software Developer
                    </option>
                    <option className="text-black" value="teacher">Teacher</option>
                    <option className="text-black" value="healthcare-worker">Healthcare Worker</option>
                    <option className="text-black" value="retail-service">
                      Retail / Service Worker
                    </option>
                    <option className="text-black" value="manual-labor">Manual Labor Worker</option>
                    <option className="text-black" value="entrepreneur">
                      Entrepreneur / Business Owner
                    </option>
                    <option className="text-black" value="freelancer">
                      Freelancer / Self-Employed
                    </option>
                    <option className="text-black" value="retired">Retired</option>
                    <option className="text-black" value="unemployed">
                      Unemployed / Between Jobs
                    </option>
                    <option className="text-black" value="other">Other</option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                    Health Goal
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option className="text-black" value="">Select goal</option>
                    <option className="text-black" value="lose-weight">Lose Weight</option>
                    <option className="text-black" value="gain-muscle">Gain Muscle</option>
                    <option className="text-black" value="improve-fitness">
                      Improve Overall Fitness
                    </option>
                    <option className="text-black" value="better-sleep">Better Sleep Quality</option>
                    <option className="text-black" value="reduce-stress">Reduce Stress</option>
                    <option className="text-black" value="maintain-health">
                      Maintain Current Health
                    </option>
                    <option className="text-black" value="manage-condition">
                      Manage Health Condition
                    </option>
                    <option className="text-black" value="increase-energy">
                      Increase Energy Levels
                    </option>
                  </select>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-300 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={formData.activityLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activityLevel: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option className="text-black" value="">Select activity level</option>
                    <option className="text-black" value="sedentary">
                      Sedentary (Little/No Exercise)
                    </option>
                    <option className="text-black" value="lightly-active">
                      Lightly Active (1-3 days/week)
                    </option>
                    <option className="text-black" value="moderately-active">
                      Moderately Active (3-5 days/week)
                    </option>
                    <option className="text-black" value="very-active">
                      Very Active (6-7 days/week)
                    </option>
                    <option className="text-black" value="extremely-active">
                      Extremely Active (Athlete)
                    </option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => router.push('/onboarding/optional')}
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium transition-colors border border-blue-500/40"
                >
                  Re-run Onboarding
                </button>
                <button
                  onClick={handleSaveBasicInfo}
                  className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Detail Modal */}
        {showPrivacyModal && selectedPrivacyModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-card rounded-2xl border border-white/10 p-4 sm:p-6 w-full max-w-lg relative">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
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

              {(() => {
                const selectedModule = privacyModules.find(
                  (m) => m.id === selectedPrivacyModule
                );
                if (!selectedModule) return null;

                return (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-4xl">{selectedModule.icon}</div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {selectedModule.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {selectedModule.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Data Types */}
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          Data Collected
                        </h3>
                        <div className="space-y-2">
                          {selectedModule.dataTypes.map((type: string) => (
                            <div
                              key={type}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                            >
                              <span className="text-gray-300">{type}</span>
                              <span className="text-xs text-green-400">
                                ✓ Protected
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Privacy Controls */}
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          Privacy Controls
                        </h3>
                        <div className="space-y-2">
                          <button className="w-full p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-left transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">
                                Export {selectedModule.name} Data
                              </span>
                              <svg
                                className="w-5 h-5 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </div>
                          </button>

                          <button className="w-full p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-left transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">
                                Delete {selectedModule.name} Data
                              </span>
                              <svg
                                className="w-5 h-5 text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-xs text-gray-400">
                          <strong className="text-green-400">Protected:</strong>{" "}
                          Your {selectedModule.name.toLowerCase()} data is encrypted and
                          stored locally on your device. It&apos;s never sent to
                          external servers.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowPrivacyModal(false)}
                      className="w-full mt-6 px-4 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
