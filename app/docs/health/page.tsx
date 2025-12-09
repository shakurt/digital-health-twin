"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function HealthDocs() {
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
      title: "Family Health History",
      description:
        "Understanding your genetic risk factors helps us calculate personalized disease risk and recommend preventive measures.",
      example:
        "Example: If your parent has diabetes, your risk increases 2-3x. We factor this in and suggest lifestyle changes to offset the risk.",
    },
    {
      title: "Current Medications",
      description:
        "Track all medications and supplements to monitor effectiveness and avoid dangerous interactions.",
      example:
        "Example: You take blood pressure medication daily. We track if it keeps BP in normal range (120/80) and alert you to concerning trends.",
    },
    {
      title: "Chronic Conditions",
      description:
        "Managing existing conditions with continuous monitoring and coordinated care between doctors.",
      example:
        "Example: Diagnosed with hypertension in 2020. We track BP daily, remind about medication, and alert you if readings spike.",
    },
    {
      title: "Vital Signs Baseline",
      description:
        "Establish your normal ranges for heart rate, blood pressure, and other metrics to detect changes early.",
      example:
        "Example: Your normal resting heart rate is 65 bpm. If it jumps to 85 bpm for several days, we alert you to investigate.",
    },
    {
      title: "Lab Results",
      description:
        "Import and track lab work over time to spot trends before they become problems.",
      example:
        "Example: Cholesterol was 200 mg/dL last year, now 220. We flag the upward trend and suggest dietary changes.",
    },
  ];

  const implementedFeatures = [
    {
      title: "🎯 Risk Radar",
      description:
        "5-year disease risk projections for diabetes, hypertension, and heart disease with three scenarios.",
      example:
        "Current path: 22% diabetes risk. With improved habits: 14% risk. Aggressive changes: 8% risk. Choose your path!",
    },
    {
      title: "⚠️ Smart Warnings",
      description:
        "Three-tier alert system detects concerning patterns in your vital signs before they become serious.",
      example:
        "Warning: Blood pressure elevated 10 of last 14 days (avg 142/88). Pattern detected - schedule doctor visit.",
    },
    {
      title: "❤️ Core Vitals Dashboard",
      description:
        "Real-time monitoring of 6 key health indicators with color-coded status and trend arrows.",
      example:
        "Dashboard shows: Heart rate 72 bpm ✓, BP 118/76 ✓, Sleep 7.5h ✓, Weight 70kg →, BMI 22.5 ✓, HRV 65ms ✓",
    },
    {
      title: "💊 Medication Tracker",
      description:
        "Manage all medications with dosage schedules, next dose countdowns, and effectiveness tracking.",
      example:
        "Lisinopril 10mg daily - Next dose in 4 hours. Effectiveness: Good (BP controlled 125/80 avg).",
    },
    {
      title: "🧬 Family Risk Integration",
      description:
        "Calculate how family history affects your disease risk and show impact of lifestyle changes.",
      example:
        "Family history adds +8% diabetes risk. But current healthy habits reduce risk by -12%. Net result: lower than average!",
    },
    {
      title: "📊 Lab Results Tracking",
      description:
        "View all lab work in one place with color-coded status and reference ranges for context.",
      example:
        "Recent labs: Cholesterol 185 mg/dL (Normal, <200), Blood sugar 92 mg/dL (Normal, 70-100). All in range ✓",
    },
    {
      title: "👨‍⚕️ Care Team Coordination",
      description:
        "Track appointments and manage health data sharing with your doctors.",
      example:
        "Upcoming: Dr. Smith (Cardiology) on Dec 15. Auto-share: BP trends, HRV data, medication adherence.",
    },
    {
      title: "🔍 Pattern Detection",
      description:
        "AI learns chronic condition triggers by correlating symptoms with lifestyle factors.",
      example:
        "Migraine pattern: 80% occur after poor sleep (<6h) + high stress (8+). Low risk next 7 days (good sleep streak).",
    },
    {
      title: "📈 Behavior Impact Analysis",
      description:
        "See exactly how lifestyle changes affect your disease risk with quantified improvements.",
      example:
        "Adding 30 min exercise 5x/week reduces diabetes risk by 8 points (22% → 14%). Clear cause and effect!",
    },
    {
      title: "🏥 Conditions Overview",
      description:
        "Complete list of managed conditions with status badges and historical tracking.",
      example:
        "Hypertension: Controlled ✓ (since 2020), Prediabetes: Monitoring ⚠️ (borderline), High cholesterol: Controlled ✓",
    },
  ];

  const futureFeatures = [
    {
      title: "🤖 AI Health Assistant",
      description:
        "Chat with AI that knows your complete health history and provides personalized medical guidance.",
      example:
        "Ask: 'Why is my BP higher today?' → AI: 'You had high sodium lunch (2400mg) + only 5h sleep. Both elevate BP temporarily.'",
    },
    {
      title: "🔔 Predictive Health Alerts",
      description:
        "Machine learning predicts health issues days before they happen based on subtle pattern changes.",
      example:
        "Alert: 'HRV trending down + poor sleep 3 days = 75% chance of getting sick within 48h. Rest today!'",
    },
    {
      title: "🩺 Virtual Health Checks",
      description:
        "Smartphone camera measures heart rate, blood oxygen, stress levels, and respiratory rate.",
      example:
        "Hold finger over camera for 30 seconds → Results: HR 68 bpm, SpO2 98%, Stress level: Low, Breathing rate: 14/min.",
    },
    {
      title: "💉 Medication Reminders",
      description:
        "Smart notifications that adapt to your schedule and send refill alerts automatically.",
      example:
        "9 AM: 'Time for Lisinopril!' Snooze for 1 hour. Also: 'Only 5 pills left - reorder now?'",
    },
    {
      title: "🧪 Lab Test Recommendations",
      description:
        "AI suggests which lab tests you need based on age, risk factors, and time since last check.",
      example:
        "Recommendation: 'Due for annual cholesterol check (last: 14 months ago). Book labs this month for 5-year trend analysis.'",
    },
    {
      title: "📱 Doctor Portal Integration",
      description:
        "Automatic health data sharing with your care team for remote monitoring.",
      example:
        "Your cardiologist sees: daily BP readings, HRV trends, medication adherence. They message: 'Looking good! Keep it up.'",
    },
    {
      title: "🎮 Health Gamification",
      description:
        "Earn points for healthy choices, compete with similar health profiles, unlock achievements.",
      example:
        "Quest: 'Keep BP <130/85 for 30 days' - 23/30 days complete. Reward: Health Champion badge + 1000 points!",
    },
    {
      title: "🧬 Genetic Risk Analysis",
      description:
        "Upload DNA test results to get comprehensive genetic health risk report with prevention strategies.",
      example:
        "DNA analysis: 2.5x Alzheimer's risk detected. Preventive plan: Mediterranean diet, brain games, 7+ hours sleep.",
    },
    {
      title: "📊 Health Trends Dashboard",
      description:
        "Interactive visualizations showing 6-month, 1-year, 5-year health metric trends.",
      example:
        "5-year view: Weight -8kg ↓, BP -15/10 ↓, Cholesterol -30 ↓, Fitness +15% ↑. Clear improvement across all metrics!",
    },
    {
      title: "🚨 Emergency Health Card",
      description:
        "Digital card with critical health info accessible by emergency responders even when phone locked.",
      example:
        "Emergency card shows: Allergies (penicillin), Medications (lisinopril), Conditions (hypertension), Blood type (A+), Emergency contact.",
    },
    {
      title: "🧘 Holistic Health Score",
      description:
        "Comprehensive 0-100 score combining physical, mental, sleep, and lifestyle factors.",
      example:
        "Health Score: 78/100 (Good). Breakdown: Physical 82, Mental 75, Sleep 80, Nutrition 72. Focus area: improve nutrition.",
    },
    {
      title: "📅 Preventive Care Planner",
      description:
        "Automatically schedule recommended screenings, vaccines, and check-ups based on age and risk.",
      example:
        "Due this quarter: Flu shot, Annual physical, Cholesterol check. Calendar invites sent - one-click booking.",
    },
    {
      title: "💬 Symptom Checker",
      description:
        "Describe symptoms and get AI triage recommendations for urgency level and next steps.",
      example:
        "Input: 'Chest pain + shortness of breath' → Result: 'URGENT - Call 911. Possible cardiac event. Don't drive yourself.'",
    },
    {
      title: "🏃 Recovery Protocols",
      description:
        "Personalized recovery plans after illness or surgery with day-by-day guidance.",
      example:
        "Post-surgery Day 5: Light walking 10 min ✓, Medication on time ✓, Wound check due ⚠️, Pain level: 3/10 (good).",
    },
    {
      title: "🌡️ Illness Predictor",
      description:
        "Detect early signs of illness from combined data: HRV drop, resting HR increase, sleep disruption.",
      example:
        "Warning: HRV dropped 15%, HR up 10 bpm, restless sleep. 80% chance you're getting sick. Increase vitamin C, rest more.",
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl">❤️</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Health Documentation
              </h1>
              <p className="text-gray-400 text-lg mt-1">
                Complete guide to health monitoring and disease prevention
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
                  Health data helps us build your complete medical profile,
                  calculate personalized risk factors, and coordinate care
                  between all your healthcare providers.
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
                  These health monitoring features are live. Track vitals,
                  manage conditions, calculate disease risk, and coordinate care
                  with your doctors.
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
                  Advanced health features with AI predictions, virtual health
                  checks, and comprehensive disease prevention strategies.
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
