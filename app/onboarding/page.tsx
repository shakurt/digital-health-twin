"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingBasic() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sex: "",
    birthdate: "",
    height: "",
    weight: "",
    job: "",
    goal: "",
    activityLevel: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const jobOptions = [
    { value: "student", label: "Student" },
    { value: "office-worker", label: "Office Worker" },
    { value: "software-developer", label: "Software Developer" },
    { value: "teacher", label: "Teacher" },
    { value: "healthcare-worker", label: "Healthcare Worker" },
    { value: "retail-service", label: "Retail / Service Worker" },
    { value: "manual-labor", label: "Manual Labor Worker" },
    { value: "entrepreneur", label: "Entrepreneur / Business Owner" },
    { value: "freelancer", label: "Freelancer / Self-Employed" },
    { value: "unemployed", label: "Unemployed / Between Jobs" },
    { value: "retired", label: "Retired" },
    { value: "other", label: "Other" },
  ];

  const goalOptions = [
    { value: "lose-weight", label: "🔥 Lose weight" },
    { value: "gain-weight", label: "💪 Gain weight" },
    { value: "maintain-weight", label: "⚖️ Maintain weight" },
    { value: "improve-health", label: "❤️ Improve overall health" },
    { value: "build-muscle", label: "🏋️ Build muscle & strength" },
    { value: "reduce-stress", label: "🧘 Reduce stress & sleep better" },
    { value: "increase-energy", label: "⚡ Increase energy levels" },
  ];

  const activityOptions = [
    { value: "sedentary", label: "🪑 Sedentary (mostly sitting, desk job)" },
    {
      value: "lightly-active",
      label: "🚶 Lightly active (light exercise 1-3 days per week)",
    },
    {
      value: "moderately-active",
      label: "🏃 Moderately active (exercise 3-5 days per week)",
    },
    {
      value: "very-active",
      label: "💪 Very active (intense exercise 6-7 days per week)",
    },
    {
      value: "athlete",
      label: "🏆 Athlete (professional or training multiple times daily)",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.sex) newErrors.sex = "Please select your sex";
    if (!formData.birthdate) {
      newErrors.birthdate = "Please enter your birthdate";
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.birthdate = "Please enter a valid birthdate";
      }
    }
    if (!formData.height) {
      newErrors.height = "Please enter your height";
    } else if (
      parseInt(formData.height) < 100 ||
      parseInt(formData.height) > 250
    ) {
      newErrors.height = "Height must be between 100-250 cm";
    }
    if (!formData.weight) {
      newErrors.weight = "Please enter your weight";
    } else if (
      parseInt(formData.weight) < 30 ||
      parseInt(formData.weight) > 300
    ) {
      newErrors.weight = "Weight must be between 30-300 kg";
    }
    if (!formData.job) newErrors.job = "Please select your job";
    if (!formData.goal) newErrors.goal = "Please select your main goal";
    if (!formData.activityLevel)
      newErrors.activityLevel = "Please select your activity level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store onboarding data
    const userData = JSON.parse(sessionStorage.getItem("user") || "{}");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        ...formData,
        onboardingBasic: true,
      })
    );

    setIsLoading(false);
    // Navigate to optional questions (next phase)
    router.push("/onboarding/optional");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 13);
    return today.toISOString().split("T")[0];
  };

  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 120);
    return today.toISOString().split("T")[0];
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

      <div className="relative z-10 w-full max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step 1 of 2</span>
          </div>
          <div className="h-2 bg-dark-card rounded-full overflow-hidden">
            <div className="h-full bg-gradient-animated w-1/2 transition-all duration-500"></div>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 card-glow animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 animate-bounce-slow">
              <span className="text-3xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text-animated">
                Tell Us About Yourself
              </span>
            </h1>
            <p className="text-gray-400">
              Help us personalize your digital health twin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sex Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Sex <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["male", "female"].map((sex) => (
                  <button
                    key={sex}
                    type="button"
                    onClick={() => handleChange("sex", sex)}
                    className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 hover-lift ${
                      formData.sex === sex
                        ? "border-primary bg-primary/20 text-white"
                        : "border-dark-border bg-dark-bg text-gray-400 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">
                      {sex === "male" ? "👨" : "👩"}
                    </span>
                    <span className="font-medium capitalize">{sex}</span>
                  </button>
                ))}
              </div>
              {errors.sex && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.sex}
                </p>
              )}
            </div>

            {/* Birthdate */}
            <div className="space-y-2">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-300"
              >
                Birthdate <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthdate"
                value={formData.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value)}
                min={getMinDate()}
                max={getMaxDate()}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.birthdate ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.birthdate}
                </p>
              )}
            </div>

            {/* Height and Weight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height */}
              <div className="space-y-2">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-300"
                >
                  Height (cm) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="170"
                    className={`w-full px-4 py-3 bg-dark-bg border ${
                      errors.height ? "border-red-500" : "border-dark-border"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                  />
                </div>
                {errors.height && (
                  <p className="text-red-500 text-sm animate-fade-in">
                    {errors.height}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-300"
                >
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder="70"
                    className={`w-full px-4 py-3 bg-dark-bg border ${
                      errors.weight ? "border-red-500" : "border-dark-border"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50`}
                  />
                </div>
                {errors.weight && (
                  <p className="text-red-500 text-sm animate-fade-in">
                    {errors.weight}
                  </p>
                )}
              </div>
            </div>

            {/* Job */}
            <div className="space-y-2">
              <label
                htmlFor="job"
                className="block text-sm font-medium text-gray-300"
              >
                Occupation <span className="text-red-500">*</span>
              </label>
              <select
                id="job"
                value={formData.job}
                onChange={(e) => handleChange("job", e.target.value)}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.job ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50 cursor-pointer`}
              >
                <option value="" disabled>
                  Select your occupation
                </option>
                {jobOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.job && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.job}
                </p>
              )}
            </div>

            {/* Main Goal */}
            <div className="space-y-2">
              <label
                htmlFor="goal"
                className="block text-sm font-medium text-gray-300"
              >
                Main Goal <span className="text-red-500">*</span>
              </label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => handleChange("goal", e.target.value)}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.goal ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50 cursor-pointer`}
              >
                <option value="" disabled>
                  What&apos;s your main health goal?
                </option>
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.goal && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.goal}
                </p>
              )}
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <label
                htmlFor="activityLevel"
                className="block text-sm font-medium text-gray-300"
              >
                Daily Activity Level <span className="text-red-500">*</span>
              </label>
              <select
                id="activityLevel"
                value={formData.activityLevel}
                onChange={(e) => handleChange("activityLevel", e.target.value)}
                className={`w-full px-4 py-3 bg-dark-bg border ${
                  errors.activityLevel ? "border-red-500" : "border-dark-border"
                } rounded-xl text-white focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50 cursor-pointer`}
              >
                <option value="" disabled>
                  How active are you typically?
                </option>
                {activityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.activityLevel && (
                <p className="text-red-500 text-sm animate-fade-in">
                  {errors.activityLevel}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-animated rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group mt-8"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Next Step
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          All information is encrypted and kept private
        </p>
      </div>
    </div>
  );
}
