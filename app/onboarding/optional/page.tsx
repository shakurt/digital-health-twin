"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Module =
  | "nutrition"
  | "activity"
  | "health"
  | "sleep"
  | "mindfulness"
  | "avatar";

interface Question {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function OnboardingOptional() {
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState<Module>("nutrition");

  // Load user data from localStorage during initialization
  const [email] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        return parsedUser.email || "";
      }
    }
    return "";
  });

  const [answers, setAnswers] = useState<
    Record<string, Record<string, string>>
  >(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        return (
          parsedUser.optionalAnswers || {
            nutrition: {},
            activity: {},
            health: {},
            sleep: {},
            mindfulness: {},
            avatar: {},
          }
        );
      }
    }
    return {
      nutrition: {},
      activity: {},
      health: {},
      sleep: {},
      mindfulness: {},
      avatar: {},
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Redirect if no user found
  useEffect(() => {
    if (!email) {
      router.push("/signin");
    }
  }, [email, router]);

  const modules: { key: Module; label: string; icon: string }[] = [
    { key: "nutrition", label: "Nutrition", icon: "🍎" },
    { key: "activity", label: "Activity", icon: "🏃" },
    { key: "health", label: "Health", icon: "❤️" },
    { key: "sleep", label: "Sleep", icon: "😴" },
    { key: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { key: "avatar", label: "Avatar", icon: "🎮" },
  ];

  const getQuestions = (module: Module): Question[] => {
    switch (module) {
      case "nutrition":
        return [
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

      case "activity":
        return [
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
              { value: "knee", label: "Knee issues" },
              { value: "shoulder", label: "Shoulder issues" },
              { value: "other", label: "Other" },
            ],
          },
        ];

      case "health":
        return [
          {
            key: "chronicConditions",
            label: "Do you have any chronic health conditions?",
            options: [
              { value: "none", label: "None" },
              { value: "diabetes", label: "Diabetes (Type 1 or 2)" },
              { value: "hypertension", label: "Hypertension (High BP)" },
              { value: "heart-disease", label: "Heart disease" },
              { value: "asthma", label: "Asthma / Respiratory issues" },
              { value: "thyroid", label: "Thyroid disorder" },
              { value: "other", label: "Other chronic condition" },
            ],
          },
          {
            key: "medications",
            label: "Are you currently taking any prescription medications?",
            options: [
              { value: "none", label: "No medications" },
              { value: "vitamins", label: "Only vitamins/supplements" },
              { value: "1-2", label: "1-2 medications" },
              { value: "3+", label: "3 or more medications" },
            ],
          },
          {
            key: "familyHistory",
            label: "Do you have a family history of serious illness?",
            options: [
              { value: "none", label: "No significant history" },
              { value: "heart", label: "Heart disease" },
              { value: "diabetes", label: "Diabetes" },
              { value: "cancer", label: "Cancer" },
              { value: "stroke", label: "Stroke" },
              { value: "multiple", label: "Multiple conditions" },
            ],
          },
          {
            key: "bloodPressure",
            label: "Do you monitor your blood pressure regularly?",
            options: [
              { value: "yes-daily", label: "Yes, daily" },
              { value: "yes-weekly", label: "Yes, weekly" },
              { value: "occasionally", label: "Occasionally" },
              { value: "no", label: "No / Not needed" },
            ],
          },
          {
            key: "cholesterol",
            label: "When was your last cholesterol check?",
            options: [
              { value: "3months", label: "Within 3 months" },
              { value: "6months", label: "Within 6 months" },
              { value: "year", label: "Within a year" },
              { value: "longer", label: "More than a year ago" },
              { value: "never", label: "Never checked" },
            ],
          },
          {
            key: "smoking",
            label: "Do you smoke or use tobacco products?",
            options: [
              { value: "never", label: "Never / Non-smoker" },
              { value: "former", label: "Former smoker (quit)" },
              { value: "occasionally", label: "Occasionally (social)" },
              { value: "daily", label: "Daily smoker" },
            ],
          },
          {
            key: "alcohol",
            label: "How often do you consume alcohol?",
            options: [
              { value: "never", label: "Never / Rarely" },
              { value: "occasional", label: "1-2 times per month" },
              { value: "weekly", label: "1-3 times per week" },
              { value: "daily", label: "Most days / Daily" },
            ],
          },
          {
            key: "doctorVisits",
            label: "How often do you see your doctor for check-ups?",
            options: [
              { value: "regular", label: "Regularly (yearly or more)" },
              { value: "when-needed", label: "Only when needed" },
              { value: "rarely", label: "Rarely / Almost never" },
            ],
          },
        ];

      case "sleep":
        return [
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
              {
                value: "excellent",
                label: "Excellent - always feel refreshed",
              },
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
              {
                value: "smartwatch",
                label: "Yes, with smartwatch/fitness tracker",
              },
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

      case "mindfulness":
        return [
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
              {
                value: "intermediate",
                label: "Intermediate (regular practice)",
              },
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

      case "avatar":
        return [
          {
            key: "style",
            label: "How would you like your avatar style to be?",
            options: [
              { value: "minimal", label: "Simple & minimal" },
              { value: "sporty", label: "Sporty" },
              { value: "casual", label: "Casual" },
              { value: "futuristic", label: "Futuristic" },
            ],
          },
          {
            key: "priority",
            label: "What matters most for your ideal self?",
            options: [
              { value: "body", label: "Healthy body" },
              { value: "mind", label: "Calm mind" },
              { value: "performance", label: "Strong performance" },
              { value: "balance", label: "Balanced lifestyle" },
            ],
          },
          {
            key: "reflect-progress",
            label: "Should your avatar reflect your current progress?",
            options: [
              { value: "yes", label: "Yes, show changes" },
              { value: "no", label: "No, keep it static" },
            ],
          },
          {
            key: "world",
            label: "Want an evolving world around your avatar as you improve?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
        ];

      default:
        return [];
    }
  };

  const currentQuestions = getQuestions(currentModule);
  const currentModuleIndex = modules.findIndex((m) => m.key === currentModule);
  const progressPercent = Math.round(
    ((currentModuleIndex + 1) / modules.length) * 100
  );

  const handleAnswer = (questionKey: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentModule]: {
        ...prev[currentModule],
        [questionKey]: value,
      },
    }));
  };

  const handleNext = async () => {
    const nextIndex = currentModuleIndex + 1;

    // Get user data from localStorage
    if (!email) return;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    // Prepare data for current module - fill with null if not answered
    const moduleData: Record<string, string | null> = {};
    const moduleQuestions = getQuestions(currentModule);
    moduleQuestions.forEach((q) => {
      moduleData[q.key] = answers[currentModule][q.key] || null;
    });

    // Update user object with current module data
    const updatedUserData = {
      ...userData,
      optionalAnswers: {
        ...userData.optionalAnswers,
        [currentModule]: moduleData,
      },
    };

    // Save ONLY to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    if (nextIndex < modules.length) {
      setCurrentModule(modules[nextIndex].key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // All modules complete
      await handleComplete();
    }
  };

  const handleBack = () => {
    const prevIndex = currentModuleIndex - 1;
    if (prevIndex >= 0) {
      setCurrentModule(modules[prevIndex].key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/onboarding");
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get user from localStorage
    if (!email) {
      router.push("/signin");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    // Ensure all modules are in optionalAnswers (fill any missing with null values)
    const completeOptionalAnswers: Record<
      string,
      Record<string, string | null>
    > = userData.optionalAnswers || {};

    modules.forEach((module) => {
      if (!completeOptionalAnswers[module.key]) {
        const moduleData: Record<string, string | null> = {};
        const moduleQuestions = getQuestions(module.key);
        moduleQuestions.forEach((q) => {
          moduleData[q.key] = null;
        });
        completeOptionalAnswers[module.key] = moduleData;
      }
    });

    // Complete user object with all data
    const completedUserData = {
      ...userData,
      optionalAnswers: completeOptionalAnswers,
      lastUpdated: new Date().toISOString(),
    };

    // Save ONLY to localStorage
    localStorage.setItem("user", JSON.stringify(completedUserData));

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute top-60 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-40 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Step 2 of 2 • {modules[currentModuleIndex].label}
            </span>
            <span className="text-sm text-primary font-medium">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="h-2 bg-dark-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-animated transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Module Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {modules.map((module, index) => (
              <div
                key={module.key}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  index < currentModuleIndex
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : index === currentModuleIndex
                    ? "bg-gradient-animated text-white"
                    : "bg-dark-card text-gray-500 border border-dark-border"
                }`}
              >
                <span className="mr-1">{module.icon}</span>
                {module.label}
              </div>
            ))}
          </div>
        </div>

        {/* Questions Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 card-glow animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 animate-bounce-slow">
              <span className="text-3xl">
                {modules[currentModuleIndex].icon}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text-animated">
                {modules[currentModuleIndex].label}
              </span>
            </h1>
            <p className="text-gray-400">All questions are optional</p>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {currentQuestions.map((question, qIndex) => (
              <div
                key={question.key}
                className="space-y-3 animate-fade-in-up"
                style={{ animationDelay: `${qIndex * 100}ms` }}
              >
                <label className="block text-lg font-medium text-gray-200">
                  {question.label}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(question.key, option.value)}
                      className={`px-4 py-3 rounded-xl border-2 text-left transition-all duration-300 hover-lift ${
                        answers[currentModule][question.key] === option.value
                          ? "border-primary bg-primary/20 text-white"
                          : "border-dark-border bg-dark-bg text-gray-400 hover:border-primary/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {currentModuleIndex > 0 && (
              <button
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 px-6 py-4 bg-dark-bg border-2 border-dark-border rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:border-primary/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  Back
                </span>
              </button>
            )}

            {/* Next button - saves null for unanswered questions */}
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-gradient-animated rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : currentModuleIndex === modules.length - 1 ? (
                  <>
                    Complete & Continue
                    <span className="group-hover:scale-125 transition-transform duration-300">
                      ✨
                    </span>
                  </>
                ) : (
                  <>
                    Next
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your answers help us personalize your experience
        </p>
      </div>
    </div>
  );
}
