"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";

type TabKey = "overview" | "risk" | "manager";

interface VitalSign {
  name: string;
  value: string;
  unit?: string;
  status: "normal" | "elevated" | "high" | "low";
  trend: "up" | "down" | "stable";
  reference: string;
}

interface DiseaseRisk {
  name: string;
  category: "Metabolic" | "Cardiovascular" | "Neurological";
  current5y: number;
  improved5y: number;
  aggressive5y: number;
  mainDrivers: string[];
}

interface Scenario {
  id: "current" | "improved" | "aggressive";
  label: string;
  description: string;
}

interface HealthWarning {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  relatedTo: string[];
}

interface Condition {
  name: string;
  status: "controlled" | "borderline" | "monitoring";
  since: string;
  notes: string;
}

interface Medication {
  name: string;
  dose: string;
  schedule: string;
  nextDose: string;
  changedRecently: boolean;
  effectSummary: string;
}

interface LabResult {
  name: string;
  value: string;
  unit: string;
  reference: string;
  status: "normal" | "borderline" | "high" | "low";
  lastChecked: string;
}

interface Appointment {
  date: string;
  time: string;
  type: string;
  with: string;
  focus: string;
}

const vitals: VitalSign[] = [
  {
    name: "Resting heart rate",
    value: "64",
    unit: "bpm",
    status: "normal",
    trend: "stable",
    reference: "60–80 bpm",
  },
  {
    name: "Blood pressure",
    value: "132/86",
    status: "elevated",
    trend: "up",
    reference: "< 120/80",
  },
  {
    name: "Sleep duration (last night)",
    value: "6.1",
    unit: "h",
    status: "low",
    trend: "down",
    reference: "7–9 h",
  },
  {
    name: "Weight",
    value: "78.4",
    unit: "kg",
    status: "elevated",
    trend: "up",
    reference: "Goal: 74 kg",
  },
  {
    name: "BMI",
    value: "26.3",
    status: "elevated",
    trend: "stable",
    reference: "18.5–24.9",
  },
  {
    name: "HRV (morning)",
    value: "51",
    unit: "ms",
    status: "normal",
    trend: "down",
    reference: "> 45 ms (your baseline)",
  },
];

const diseaseRisks: DiseaseRisk[] = [
  {
    name: "Type 2 diabetes",
    category: "Metabolic",
    current5y: 22,
    improved5y: 12,
    aggressive5y: 6,
    mainDrivers: ["Family history", "Elevated BMI", "Evening snacking"],
  },
  {
    name: "Hypertension",
    category: "Cardiovascular",
    current5y: 28,
    improved5y: 16,
    aggressive5y: 9,
    mainDrivers: ["Stress load", "Low sleep", "High sodium intake"],
  },
  {
    name: "Coronary artery disease",
    category: "Cardiovascular",
    current5y: 14,
    improved5y: 9,
    aggressive5y: 4,
    mainDrivers: ["LDL cholesterol", "Family history", "Activity volume"],
  },
];

const scenarios: Scenario[] = [
  {
    id: "current",
    label: "If you continue like this",
    description:
      "Keeps your current mix of nutrition, activity, sleep and stress.",
  },
  {
    id: "improved",
    label: "Small sustainable changes",
    description:
      "+2k steps/day, +45min sleep, slightly better food choices 4 days/week.",
  },
  {
    id: "aggressive",
    label: "Aggressive optimisation",
    description:
      "Structured training, tight nutrition, consistent sleep and stress hygiene.",
  },
];

const warnings: HealthWarning[] = [
  {
    id: "bp-1",
    title: "Blood pressure trending high",
    message:
      "Your average blood pressure has been in the elevated range for 10 of the last 14 days.",
    severity: "warning",
    relatedTo: ["Blood pressure", "Hypertension"],
  },
  {
    id: "sleep-1",
    title: "Sleep debt building",
    message:
      "You averaged 6.2 hours of sleep over the last week. Your baseline is 7.4 hours.",
    severity: "info",
    relatedTo: ["Sleep", "Stress"],
  },
  {
    id: "metabolic-1",
    title: "Metabolic risk creeping up",
    message:
      "Weight and waist measurements are creeping up. Tiny daily changes now can avoid medication later.",
    severity: "critical",
    relatedTo: ["Weight", "Type 2 diabetes"],
  },
];

const conditions: Condition[] = [
  {
    name: "Borderline hypertension",
    status: "borderline",
    since: "Apr 2024",
    notes: "Lifestyle-first management. No medication yet.",
  },
  {
    name: "Family history of early heart disease",
    status: "monitoring",
    since: "Baseline",
    notes: "Parent diagnosed at 52. Focus on LDL, BP and activity.",
  },
  {
    name: "Migraine (episodic)",
    status: "controlled",
    since: "2019",
    notes: "Linked to poor sleep and high stress weeks.",
  },
];

const medications: Medication[] = [
  {
    name: "Vitamin D3",
    dose: "2000 IU",
    schedule: "Once daily with breakfast",
    nextDose: "Tomorrow · 08:15",
    changedRecently: false,
    effectSummary: "Helps keep levels in optimal range over winter.",
  },
  {
    name: "Magnesium glycinate",
    dose: "300 mg",
    schedule: "Once daily in the evening",
    nextDose: "Tonight · 21:30",
    changedRecently: true,
    effectSummary: "Sleep quality improved ~12% since starting.",
  },
];

const labResults: LabResult[] = [
  {
    name: "HbA1c",
    value: "5.7",
    unit: "%",
    reference: "< 5.7%",
    status: "borderline",
    lastChecked: "Oct 12, 2025",
  },
  {
    name: "LDL cholesterol",
    value: "142",
    unit: "mg/dL",
    reference: "< 130 mg/dL (ideally < 100)",
    status: "high",
    lastChecked: "Nov 02, 2025",
  },
  {
    name: "Creatinine",
    value: "0.9",
    unit: "mg/dL",
    reference: "0.6–1.2 mg/dL",
    status: "normal",
    lastChecked: "Nov 02, 2025",
  },
  {
    name: "CRP (hs)",
    value: "1.1",
    unit: "mg/L",
    reference: "< 1 mg/L",
    status: "borderline",
    lastChecked: "Sep 20, 2025",
  },
];

const appointments: Appointment[] = [
  {
    date: "Dec 18, 2025",
    time: "09:30",
    type: "Annual physical",
    with: "Dr. Chen (Primary care)",
    focus: "Full check, blood pressure, labs review.",
  },
  {
    date: "Jan 06, 2026",
    time: "16:00",
    type: "Cardiology follow-up",
    with: "Dr. Patel (Cardiology)",
    focus: "Blood pressure trend, LDL management options.",
  },
];

function getVitalStatusColor(status: VitalSign["status"]): string {
  switch (status) {
    case "normal":
      return "border-emerald-400/60 bg-emerald-500/10";
    case "elevated":
      return "border-amber-400/60 bg-amber-500/10";
    case "high":
      return "border-rose-500/70 bg-rose-500/10";
    case "low":
      return "border-sky-400/60 bg-sky-500/10";
    default:
      return "border-white/10 bg-white/5";
  }
}

function getWarningBadgeColor(severity: HealthWarning["severity"]): string {
  switch (severity) {
    case "info":
      return "bg-sky-500/15 text-sky-200 border-sky-400/40";
    case "warning":
      return "bg-amber-500/15 text-amber-100 border-amber-400/40";
    case "critical":
      return "bg-rose-500/15 text-rose-100 border-rose-500/50";
    default:
      return "bg-white/10 text-white border-white/20";
  }
}

function getLabStatusColor(status: LabResult["status"]): string {
  switch (status) {
    case "normal":
      return "text-emerald-300";
    case "borderline":
      return "text-amber-200";
    case "high":
      return "text-rose-300";
    case "low":
      return "text-sky-200";
    default:
      return "text-gray-200";
  }
}

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedScenario, setSelectedScenario] =
    useState<Scenario["id"]>("current");
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showOnboardingModal || showResetConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOnboardingModal, showResetConfirm]);

  const handleResetHealthData = () => {
    // Reset all health data to defaults
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
        health: newAnswers,
      },
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowOnboardingModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const healthScore = 82;
  const activeWarnings = warnings.length;
  const chronicConditions = conditions.length;

  return (
    <AppLayout>
      <div className="min-h-screen pb-20">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold gradient-text-animated">
                Health Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Your complete health overview and risk management system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="px-4 py-2 text-xs sm:text-sm bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 text-xs sm:text-sm bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Top Stats Bar */}
          <div className="grid grid-cols-3 gap-3 px-4 md:px-6 pb-4">
            {/* Health Score */}
            <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span className="text-lg sm:text-xl self-center sm:self-auto">💚</span>
                <span className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Health Score</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white text-center sm:text-left">{healthScore}/100</p>
              <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Good condition</p>
            </div>

            {/* Active Warnings */}
            <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span className="text-lg sm:text-xl self-center sm:self-auto">⚠️</span>
                <span className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Warnings</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white text-center sm:text-left">{activeWarnings}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Needs attention</p>
            </div>

            {/* Chronic Conditions */}
            <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span className="text-lg sm:text-xl self-center sm:self-auto">📋</span>
                <span className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Conditions</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white text-center sm:text-left">
                {chronicConditions}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-left">Being managed</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 px-4 md:px-6 pb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm rounded-xl font-medium transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Vitals & Warnings
            </button>
            <button
              onClick={() => setActiveTab("risk")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm rounded-xl font-medium transition-all duration-300 ${
                activeTab === "risk"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Risk Timeline
            </button>
            <button
              onClick={() => setActiveTab("manager")}
              className={`flex-1 md:flex-none px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm rounded-xl font-medium transition-all duration-300 ${
                activeTab === "manager"
                  ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Health Manager
            </button>
          </div>
        </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-500/90 backdrop-blur-lg text-white px-4 sm:px-6 py-2 sm:py-4 rounded-2xl shadow-lg animate-fade-in flex items-center gap-2 sm:gap-3">
          <span className="text-2xl">✅</span>
          <span className="text-sm sm:text-base font-medium">Updated successfully!</span>
        </div>
      )}

        {/* Main Content */}
        <div className="p-4 md:p-6">
          {/* OVERVIEW TAB - Early Warning System */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Core Vitals Monitoring */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    💓
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Core Vitals Monitoring
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Real-time tracking of your key health indicators
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {vitals.map((vital) => (
                    <div
                      key={vital.name}
                      className={`p-4 rounded-xl border ${getVitalStatusColor(
                        vital.status
                      )}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium text-white">
                          {vital.name}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                            vital.status === "normal"
                              ? "bg-emerald-500/20 text-emerald-200"
                              : vital.status === "elevated"
                              ? "bg-amber-500/20 text-amber-200"
                              : vital.status === "high"
                              ? "bg-rose-500/20 text-rose-200"
                              : "bg-sky-500/20 text-sky-200"
                          }`}
                        >
                          {vital.status}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {vital.value}
                        </span>
                        {vital.unit && (
                          <span className="text-xs sm:text-sm text-gray-300">
                            {vital.unit}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        <span className="text-gray-400">{vital.reference}</span>
                        <span className="flex items-center gap-1 text-gray-300">
                          {vital.trend === "up" && <span>↗</span>}
                          {vital.trend === "down" && <span>↘</span>}
                          {vital.trend === "stable" && <span>→</span>}
                          <span className="capitalize">{vital.trend}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Warnings */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🔔
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Early Warning System
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      AI-powered alerts before issues become serious
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {warnings.map((warning) => (
                    <div
                      key={warning.id}
                      className={`p-4 rounded-xl border ${getWarningBadgeColor(
                        warning.severity
                      )}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xs sm:text-sm font-semibold">
                          {warning.title}
                        </h3>
                        <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-black/20 whitespace-nowrap">
                          {warning.severity === "critical"
                            ? "🚨 Critical"
                            : warning.severity === "warning"
                            ? "⚠️ Warning"
                            : "ℹ️ Info"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm mb-2 opacity-90">
                        {warning.message}
                      </p>
                      <div className="text-[10px] sm:text-xs opacity-75">
                        Related: {warning.relatedTo.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chronic Pattern Learning */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🧠
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Chronic Pattern Learning (Demo)
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      AI learns your personal health patterns to predict
                      flare-ups
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-violet-400/40 bg-violet-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-violet-100">
                      Migraine · Episodic
                    </h3>
                    <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-200">
                      Calm for 24 days
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-violet-100/90 mb-3">
                    Most flare-ups follow 2–3 nights of short sleep plus a spike
                    in stress levels. Current indicators suggest low risk for
                    the next 7 days.
                  </p>
                  <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-400/20">
                    <p className="text-[10px] sm:text-xs text-violet-100/80">
                      💡 <strong>Smart Prediction:</strong> In a real system,
                      your watch and sleep data would trigger an early heads-up
                      1–2 days before a likely flare, giving you time to adjust
                      your schedule or medication.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs sm:text-sm text-gray-300">
                    <strong>How it works:</strong> The system tracks patterns
                    between your vitals (heart rate, HRV, sleep quality) and
                    your symptom logs. Over time, it learns your unique triggers
                    and warning signs, providing personalized alerts before
                    issues escalate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* RISK TAB - Risk Timeline & Futures */}
          {activeTab === "risk" && (
            <div className="space-y-6">
              {/* Scenario Selector */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🔮
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      5-Year Risk Timeline
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      See how your choices today shape your health tomorrow
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-3">
                    Choose Your Future Scenario:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => setSelectedScenario(scenario.id)}
                        className={`px-4 py-2 text-xs sm:text-sm rounded-xl border transition-all ${
                          selectedScenario === scenario.id
                            ? "bg-linear-to-r from-primary/20 to-secondary/20 border-primary/40 text-white"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mt-3">
                    {
                      scenarios.find((s) => s.id === selectedScenario)
                        ?.description
                    }
                  </p>
                </div>

                {/* Disease Risk Cards */}
                <div className="space-y-4">
                  {diseaseRisks.map((risk) => {
                    const value =
                      selectedScenario === "current"
                        ? risk.current5y
                        : selectedScenario === "improved"
                        ? risk.improved5y
                        : risk.aggressive5y;
                    const delta = risk.current5y - value;

                    return (
                      <div
                        key={risk.name}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white">
                              {risk.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-gray-400">
                              {risk.category} • Drivers:{" "}
                              {risk.mainDrivers.join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                              {value}%
                            </div>
                            <div className="text-[10px] sm:text-xs text-gray-400">
                              5-year risk
                            </div>
                            {selectedScenario !== "current" && delta > 0 && (
                              <div className="text-[10px] sm:text-xs text-emerald-400 mt-1">
                                ↓ {delta}% reduction
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Behavior Change Suggestions */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    ✨
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Personalized Action Plan
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Small changes that make a big impact
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-emerald-100 mb-2">
                      💪 Add 3 structured workouts per week
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 mb-2">
                      Could lower your 5-year diabetes risk from{" "}
                      <strong>22% → 14%</strong> and blood pressure risk from{" "}
                      <strong>28% → 20%</strong>.
                    </p>
                    <p className="text-[10px] sm:text-xs text-emerald-100/70">
                      Impact: Improved insulin sensitivity, lower resting BP,
                      better weight management
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-sky-400/40 bg-sky-500/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-sky-100 mb-2">
                      😴 Increase sleep by 60-90 minutes
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-100/80 mb-2">
                      Could reduce migraine flare frequency by{" "}
                      <strong>~25%</strong> and lower hypertension risk by{" "}
                      <strong>5-7%</strong>.
                    </p>
                    <p className="text-[10px] sm:text-xs text-sky-100/70">
                      Impact: Better brain recovery, regulated stress hormones,
                      improved cardiovascular health
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-400/40 bg-amber-500/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-amber-100 mb-2">
                      🥗 Reduce processed food to 1×/day
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100/80 mb-2">
                      Could improve LDL and HbA1c levels, reducing heart disease
                      and diabetes risk by{" "}
                      <strong>several percentage points</strong>.
                    </p>
                    <p className="text-[10px] sm:text-xs text-amber-100/70">
                      Impact: Better metabolic health, reduced inflammation,
                      improved energy levels
                    </p>
                  </div>
                </div>
              </div>

              {/* Genetics & Family History */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🧬
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Family Risk & Genetics
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Understanding your inherited risks and how to manage them
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                          Early heart disease in parent
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          Baseline risk elevated by ~1.4× compared to population
                          average
                        </p>
                      </div>
                      <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-rose-500/15 text-rose-200 border border-rose-500/30 whitespace-nowrap">
                        Fixed Risk
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                          Your lifestyle impact
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-400">
                          Current choices already offset ~35% of inherited risk
                        </p>
                      </div>
                      <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 whitespace-nowrap">
                        Good Progress
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs sm:text-sm text-blue-100">
                    💡 <strong>Good news:</strong> While you can&apos;t change
                    your genetics, your daily habits have a powerful effect. The
                    combination of regular exercise, good nutrition, and quality
                    sleep can offset much of your inherited risk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MANAGER TAB - Health Coordinator */}
          {activeTab === "manager" && (
            <div className="space-y-6">
              {/* Conditions Overview */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    📋
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Conditions at a Glance
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Complete overview of your health status
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {conditions.map((condition) => (
                    <div
                      key={condition.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xs sm:text-sm font-semibold text-white">
                          {condition.name}
                        </h3>
                        <span
                          className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                            condition.status === "controlled"
                              ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                              : condition.status === "borderline"
                              ? "bg-amber-500/15 text-amber-200 border border-amber-500/30"
                              : "bg-sky-500/15 text-sky-200 border border-sky-500/30"
                          }`}
                        >
                          {condition.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {condition.notes}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Since {condition.since}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications Management */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    💊
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Medications & Supplements
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Track effectiveness and manage your routine
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {medications.map((med) => (
                    <div
                      key={med.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold text-white">
                            {med.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-300">
                            {med.dose} • {med.schedule}
                          </p>
                        </div>
                        <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 whitespace-nowrap">
                          Next: {med.nextDose}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2">
                        {med.effectSummary}
                      </p>
                      {med.changedRecently && (
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-[10px] sm:text-xs text-emerald-200">
                            ✓ Recently adjusted • System is monitoring your
                            vitals to evaluate effectiveness
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs sm:text-sm text-blue-100">
                    💡 <strong>Smart Tracking:</strong> In a full system, we
                    track how medication changes affect your vitals and
                    symptoms, providing data-driven feedback to you and your
                    doctor.
                  </p>
                </div>
              </div>

              {/* Lab Results */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    🧪
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Recent Lab Results
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Simplified, easy-to-understand format
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] sm:text-xs text-gray-400 border-b border-white/10">
                        <th className="pb-2 font-medium">Test</th>
                        <th className="pb-2 font-medium">Result</th>
                        <th className="pb-2 font-medium">Reference</th>
                        <th className="pb-2 font-medium">Last Checked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labResults.map((lab) => (
                        <tr
                          key={lab.name}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="py-3 text-xs sm:text-sm text-white">
                            {lab.name}
                          </td>
                          <td
                            className={`py-3 text-xs sm:text-sm font-semibold ${getLabStatusColor(
                              lab.status
                            )}`}
                          >
                            {lab.value} {lab.unit}
                          </td>
                          <td className="py-3 text-[10px] sm:text-xs text-gray-400">
                            {lab.reference}
                          </td>
                          <td className="py-3 text-[10px] sm:text-xs text-gray-400">
                            {lab.lastChecked}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-xs sm:text-sm text-purple-100">
                    🔗 <strong>Integration ready:</strong> In production, we
                    connect directly to your lab provider or doctor portal, so
                    results appear automatically with clear explanations.
                  </p>
                </div>
              </div>

              {/* Appointments & Doctor Coordination */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-xl sm:text-2xl">
                    👨‍⚕️
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Appointments & Care Team
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Stay coordinated with your healthcare providers
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {appointments.map((appt) => (
                    <div
                      key={`${appt.date}-${appt.time}`}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xs sm:text-sm font-semibold text-white">
                          {appt.type}
                        </h3>
                        <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 whitespace-nowrap">
                          {appt.date} • {appt.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 mb-1">{appt.with}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Focus: {appt.focus}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Doctor Notification System */}
                <div className="p-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10">
                  <div className="flex items-start gap-3">
                    <span className="text-xl sm:text-2xl">🔒</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-emerald-100 mb-2">
                        Smart Doctor Alerts (With Your Consent)
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100/80 mb-3">
                        When enabled, the system can automatically notify your
                        doctor if it detects unusual patterns or concerning
                        changes in your vitals. You maintain full control over
                        what gets shared and when.
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-100 text-[10px] sm:text-xs font-medium border border-emerald-400/30 hover:bg-emerald-500/30 transition">
                          Configure Alerts
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-[10px] sm:text-xs font-medium border border-white/10 hover:bg-white/10 transition">
                          Privacy Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl sm:text-4xl">⚠️</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Reset Health Data?
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                This will reset all your health data to default values. This
                action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResetHealthData}
                className="flex-1 px-4 py-2 text-xs sm:text-sm bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg font-medium transition-all duration-300"
              >
                Reset Data
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
    </AppLayout>
  );
}

// ============= ONBOARDING SETTINGS MODAL =============

function OnboardingSettingsModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.optionalAnswers?.health || {};
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
            <h2 className="text-xl md:text-2xl font-bold text-white">Health Settings</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Update your health profile preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {questions.map((question) => (
            <div key={question.key}>
              <label className="block text-sm md:text-base font-medium text-white mb-3">
                {question.label}
              </label>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`w-full p-3 rounded-xl text-sm md:text-base border transition-all duration-300 text-left ${
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
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all duration-300 text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
 
  
}
