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
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("user_")) {
          const userData = localStorage.getItem(key);
          if (userData) {
            const parsedUser = JSON.parse(userData);
            return parsedUser.email || "";
          }
        }
      }
    }
    return "";
  });

  const [answers, setAnswers] = useState<
    Record<string, Record<string, string>>
  >(() => {
    if (typeof window !== "undefined" && email) {
      const userData = localStorage.getItem(`user_${email}`);
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
            key: "meals",
            label: "How many meals do you usually eat per day?",
            options: [
              { value: "1", label: "1 meal" },
              { value: "2", label: "2 meals" },
              { value: "3", label: "3 meals" },
              { value: "4+", label: "More than 3 meals" },
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
            key: "latenight",
            label: "How often do you eat late at night (after 10 PM)?",
            options: [
              { value: "rarely", label: "Rarely / never" },
              { value: "1-2", label: "1–2 times per week" },
              { value: "3-4", label: "3–4 times per week" },
              { value: "almost-every", label: "Almost every night" },
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
              { value: "other", label: "Other" },
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
              { value: "other", label: "Other" },
            ],
          },
          {
            key: "intensity",
            label: "How would you describe your usual workout intensity?",
            options: [
              { value: "light", label: "Light" },
              { value: "moderate", label: "Moderate" },
              { value: "intense", label: "Intense" },
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
        ];

      case "health":
        return [
          {
            key: "conditions",
            label: "Have you been diagnosed with any health conditions?",
            options: [
              { value: "none", label: "None of the above" },
              { value: "diabetes", label: "Diabetes" },
              { value: "blood-pressure", label: "High blood pressure" },
              { value: "cholesterol", label: "High cholesterol" },
              { value: "heart", label: "Heart condition" },
              { value: "thyroid", label: "Thyroid problem" },
            ],
          },
          {
            key: "medication",
            label: "Do you currently take any long-term medication?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            key: "smoking",
            label: "Do you smoke (cigarettes, vapes, hookah)?",
            options: [
              { value: "no", label: "No" },
              { value: "occasionally", label: "Occasionally" },
              { value: "daily", label: "Daily" },
            ],
          },
          {
            key: "weight-advice",
            label:
              "Has a doctor told you to change your weight for health reasons?",
            options: [
              { value: "lose", label: "Yes, I should lose weight" },
              { value: "gain", label: "Yes, I should gain weight" },
              { value: "no", label: "No" },
            ],
          },
        ];

      case "sleep":
        return [
          {
            key: "hours",
            label: "How many hours do you sleep per night on average?",
            options: [
              { value: "<5", label: "Less than 5 hours" },
              { value: "5-7", label: "5–7 hours" },
              { value: "7-9", label: "7–9 hours" },
              { value: "9+", label: "More than 9 hours" },
            ],
          },
          {
            key: "quality",
            label: "How would you rate your overall sleep quality?",
            options: [
              { value: "good", label: "Good" },
              { value: "okay", label: "Okay" },
              { value: "poor", label: "Poor" },
            ],
          },
          {
            key: "rested",
            label: "Do you usually wake up feeling rested?",
            options: [
              { value: "yes", label: "Yes, most days" },
              { value: "sometimes", label: "Sometimes" },
              { value: "rarely", label: "Rarely" },
            ],
          },
          {
            key: "screens",
            label: "Do you use screens before sleeping?",
            options: [
              { value: "always", label: "Almost always" },
              { value: "sometimes", label: "Sometimes" },
              { value: "rarely", label: "Rarely" },
              { value: "never", label: "Never" },
            ],
          },
          {
            key: "naps",
            label: "Do you take daytime naps?",
            options: [
              { value: "never", label: "Never" },
              { value: "sometimes", label: "Sometimes" },
              { value: "daily", label: "Almost every day" },
            ],
          },
        ];

      case "mindfulness":
        return [
          {
            key: "stress",
            label: "How would you rate your average stress level?",
            options: [
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ],
          },
          {
            key: "source",
            label: "What is your biggest source of stress right now?",
            options: [
              { value: "work", label: "Work / job" },
              { value: "studies", label: "Studies" },
              { value: "family", label: "Family / relationships" },
              { value: "money", label: "Money / finances" },
              { value: "health", label: "Health" },
              { value: "other", label: "Other" },
            ],
          },
          {
            key: "burnout",
            label: "How often do you feel mentally exhausted or burned out?",
            options: [
              { value: "rarely", label: "Rarely" },
              { value: "sometimes", label: "Sometimes" },
              { value: "often", label: "Often" },
            ],
          },
          {
            key: "techniques",
            label: "Do you use any techniques to relax or focus?",
            options: [
              { value: "meditation", label: "Meditation" },
              { value: "breathing", label: "Breathing exercises" },
              { value: "prayer", label: "Prayer / spiritual practices" },
              { value: "music", label: "Listening to music" },
              { value: "exercise", label: "Exercise" },
              { value: "none", label: "None of these" },
            ],
          },
          {
            key: "reminders",
            label:
              "Would you like reminders for breaks or breathing exercises?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "maybe", label: "Maybe later" },
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
    const userData = JSON.parse(localStorage.getItem(`user_${email}`) || "{}");

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
    localStorage.setItem(`user_${email}`, JSON.stringify(updatedUserData));

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

    // Get user from localStorage using email state
    if (!email) {
      router.push("/signin");
      return;
    }

    const userData = JSON.parse(localStorage.getItem(`user_${email}`) || "{}");

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
    localStorage.setItem(`user_${email}`, JSON.stringify(completedUserData));

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
