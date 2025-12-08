"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function NutritionDocs() {
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
      title: "Current Weight",
      description:
        "We ask for your current weight to calculate your BMI and track your nutrition goals effectively.",
      example:
        "Example: If you enter 70 kg, we use this to determine your daily caloric needs and track progress.",
    },
    {
      title: "Goal Weight",
      description:
        "Your target weight helps us create a personalized nutrition plan and project your timeline.",
      example:
        "Example: If your goal is 65 kg and you're at 70 kg, we'll calculate a safe weight loss plan over 10-15 weeks.",
    },
    {
      title: "Weekly Fast Food Consumption",
      description:
        "Understanding your fast food habits helps us identify areas for improvement and set realistic limits.",
      example:
        "Example: If you eat fast food 5 times/week, we'll help you gradually reduce it to 2 times/week.",
    },
    {
      title: "Sugary Drinks Frequency",
      description:
        "Tracking sugary drinks helps monitor hidden calorie intake that impacts weight and energy levels.",
      example:
        "Example: If you drink 3 sodas daily, we'll show you're consuming ~450 extra calories and suggest healthier alternatives.",
    },
    {
      title: "Late Night Eating Habits",
      description:
        "Late meals affect sleep quality and digestion. We track this to improve your overall health.",
      example:
        "Example: If you eat after 10 PM frequently, we'll alert you to the impact on sleep and suggest earlier dinner times.",
    },
  ];

  const implementedFeatures = [
    {
      title: "📊 Weekly Pattern Tracking",
      description:
        "Monitor your eating habits with visual progress bars and color-coded status.",
      example:
        "You see a progress bar showing 1/2 fast food meals this week (green status - you're doing great!).",
    },
    {
      title: "➕ Quick Logging",
      description:
        "One-click buttons to instantly log fast food, sugary drinks, or late-night meals.",
      example:
        "Ate a burger? Just click '+1' on the Fast Food card, and your weekly count updates automatically.",
    },
    {
      title: "🎯 Micro-Habits System",
      description:
        "Build healthy habits with daily tracking grid. Choose from preset habits or create your own.",
      example:
        "Start 'Daily Salad' habit - check it off each day on the 7-day calendar to build consistency.",
    },
    {
      title: "🔴 Reduce Habits",
      description: "Track habits where you're cutting out unhealthy foods.",
      example:
        "'No Soda This Week' - Each day you avoid soda, mark it complete. See your progress grow!",
    },
    {
      title: "🟢 Add Habits",
      description: "Track new healthy foods you're introducing to your diet.",
      example:
        "'Eat Fruit Daily' - Check off every day you eat fruit. Build the habit step by step.",
    },
    {
      title: "🔵 Replace Habits",
      description: "Swap unhealthy choices with healthy alternatives.",
      example:
        "'Water Before Coffee' - Replace your morning coffee with water first, track daily compliance.",
    },
    {
      title: "🏆 Challenges System",
      description:
        "Join solo or social challenges to stay motivated with clear goals.",
      example:
        "'7-Day Water Challenge' - Drink 8 glasses daily for a week. Progress bar shows 4/7 days completed.",
    },
    {
      title: "👥 Social Challenges",
      description: "Compete with friends in group nutrition challenges.",
      example:
        "Challenge your friends to avoid fast food for 7 days. See everyone's progress and stay motivated together!",
    },
    {
      title: "📉 Weight Projection",
      description:
        "See your projected weight timeline based on current progress.",
      example:
        "Starting at 70kg with goal of 65kg, you'll see: 'Projected to reach goal in 12 weeks at current rate'.",
    },
    {
      title: "💡 Smart Insights",
      description:
        "Get personalized tips based on your sleep, stress, and eating patterns.",
      example:
        "Notice: 'You ate late 3 times this week + low sleep. Try finishing meals 3 hours before bed.'",
    },
    {
      title: "😴 Sleep-Nutrition Link",
      description:
        "See how poor sleep affects your cravings and eating habits.",
      example:
        "Alert: 'You slept <6h last night. Studies show 30% increased sugar cravings today. Stay mindful!'",
    },
    {
      title: "🧘 Stress-Eating Analysis",
      description:
        "Understand how stress levels correlate with your eating patterns.",
      example:
        "Insight: 'High stress days (7+) linked to 2x more fast food. Try 5-min meditation before meals.'",
    },
  ];

  const futureFeatures = [
    {
      title: "📸 AI Meal Photo Recognition",
      description:
        "Take a photo of your meal and AI automatically logs calories, macros, and nutritional content.",
      example:
        "Snap a photo of your lunch → AI identifies: Chicken salad, 450 cal, 35g protein, 12g fat, 25g carbs.",
    },
    {
      title: "🤖 Personal AI Nutritionist",
      description:
        "Chat with an AI that answers nutrition questions and provides meal suggestions.",
      example:
        "Ask: 'What should I eat pre-workout?' → AI suggests: '30g carbs + 15g protein 1-2h before, like banana + Greek yogurt.'",
    },
    {
      title: "🛒 Smart Grocery Lists",
      description:
        "Auto-generate shopping lists based on your meal plans, goals, and preferences.",
      example:
        "Your weekly plan generates: 'Buy: spinach, chicken breast, quinoa, berries' with quantities calculated.",
    },
    {
      title: "🍽️ Meal Prep Assistant",
      description:
        "Get step-by-step meal prep guides for the week with time-saving tips.",
      example:
        "Sunday prep: 'Cook 3 chicken breasts, chop veggies, portion into 5 containers - saves 45min daily.'",
    },
    {
      title: "📱 Restaurant Menu Scanner",
      description:
        "Scan restaurant menus to see nutritional info and get healthy recommendations.",
      example:
        "Scan menu at restaurant → See: 'Caesar Salad: 800 cal. Try: Grilled Chicken Salad: 400 cal (same taste!)'",
    },
    {
      title: "🔔 Smart Meal Reminders",
      description:
        "AI learns your schedule and reminds you to eat at optimal times for your goals.",
      example:
        "3 PM notification: 'Time for a protein snack! You haven't eaten in 5h. Try: almonds or protein shake.'",
    },
    {
      title: "📊 Macro Tracking",
      description:
        "Detailed tracking of protein, carbs, fats with visual breakdown and daily targets.",
      example:
        "Daily view: Protein 120/150g (80%), Carbs 180/200g (90%), Fat 45/60g (75%) - colored progress rings.",
    },
    {
      title: "🌟 Recipe Recommendations",
      description:
        "Get personalized recipe suggestions based on your goals, preferences, and available ingredients.",
      example:
        "Based on your weight loss goal: 'Try High-Protein Stir-Fry: 400 cal, 40g protein, ready in 15min.'",
    },
    {
      title: "🎮 Gamification System",
      description:
        "Earn points, badges, and unlock achievements for hitting nutrition goals.",
      example:
        "Achievement unlocked: 'Meal Prep Master' - Prepared meals 3 weeks straight! Reward: 500 points.",
    },
    {
      title: "👨‍👩‍👧 Family Meal Planning",
      description:
        "Create meal plans that accommodate multiple family members with different dietary needs.",
      example:
        "Plan meals for 4: Dad (muscle gain), Mom (weight loss), Kids (growth) - shared recipes, adjusted portions.",
    },
    {
      title: "💰 Cost Tracking",
      description:
        "Track food expenses and get budget-friendly meal suggestions.",
      example:
        "This week: $85 spent on food. Suggestion: 'Swap salmon for chicken 2x/week → Save $15/week.'",
    },
    {
      title: "🌍 Cultural Cuisine Library",
      description:
        "Explore healthy versions of dishes from different cultures with authentic flavors.",
      example:
        "Craving Italian? Try: 'Healthier Pasta Carbonara: 450 cal vs 850 cal traditional, same great taste!'",
    },
    {
      title: "⚡ Energy-Based Eating",
      description:
        "Meal suggestions based on your energy levels throughout the day.",
      example:
        "3 PM energy dip detected → Suggest: 'Quick energy boost: Apple + peanut butter (200 cal, sustained energy).'",
    },
    {
      title: "🔄 Nutrient Deficiency Alerts",
      description:
        "AI detects potential vitamin/mineral deficiencies and suggests foods to fill gaps.",
      example:
        "Alert: 'Low vitamin D this week. Add: salmon, eggs, or fortified milk to your next 3 meals.'",
    },
    {
      title: "📈 Long-term Trend Analysis",
      description:
        "Visualize 3, 6, 12-month nutrition patterns with predictive insights.",
      example:
        "6-month view: 'Fast food reduced 75%, weight loss steady. Keep this pace for goal in 8 more weeks!'",
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
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <span className="text-4xl">🍎</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Nutrition Documentation
              </h1>
              <p className="text-gray-400 text-lg mt-1">
                Complete guide to nutrition tracking and meal planning
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
                  During onboarding, we collect essential information to
                  personalize your nutrition experience. Each question helps us
                  understand your current habits and create a tailored plan for
                  your goals.
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
                  These features are fully functional in the app. You can start
                  using them today to track your nutrition, build healthy
                  habits, and achieve your wellness goals.
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
                  These advanced features represent the future of personalized
                  nutrition. They showcase what&apos;s possible with AI, machine
                  learning, and deeper integration with your health data.
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
