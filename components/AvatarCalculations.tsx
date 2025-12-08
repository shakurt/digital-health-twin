// Avatar calculation utilities based on user health data
export interface AvatarMetrics {
  // Physical appearance
  height: "short" | "average" | "tall";
  build: "slim" | "average" | "athletic" | "heavy";

  // Energy & wellness
  energy: "low" | "moderate" | "high";
  freshness: "tired" | "rested" | "energetic";

  // Fitness level
  fitness: "beginner" | "moderate" | "fit" | "athletic";

  // Overall health score
  healthScore: number; // 0-100
}

export interface UserHealthData {
  // Basic info
  height?: string; // cm
  weight?: string; // kg
  age?: number;

  // Sleep data
  sleepData?: {
    week: Array<{ hours: number; quality: number }>;
    recoveryScore: number;
    sleepDebt: number;
    chronotype: string;
    bedtime: { adherence: number };
    wakeTime: { adherence: number };
    lastNight: {
      hours: number;
      quality: number;
      efficiency: number;
    };
  };

  // Activity data
  activityData?: {
    movementProfile: {
      vo2Max: number;
      physicalCondition: number;
      strength: {
        pushUps: number;
        squats: number;
        pullUps: number;
      };
      flexibility: number;
    };
    todayActivity: {
      steps: number;
      calories: number;
      activeMinutes: number;
      hrv: number;
    };
  };

  // Nutrition data
  nutritionData?: {
    avatarHealth: number;
    currentWeight: number;
    goalWeight: number;
  };

  // Mindfulness data
  mindfulnessData?: {
    weeklyStress: number[];
    weeklyMood: string[];
    weeklyEnergy: number[];
  };
}

export function calculateBMI(height: string, weight: string): number | null {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (!h || !w || h <= 0 || w <= 0) return null;
  return w / Math.pow(h / 100, 2);
}

export function getHeightCategory(
  height: string,
  gender: string
): "short" | "average" | "tall" {
  const h = parseFloat(height);
  if (!h) return "average";

  // Height categories based on gender
  if (gender === "male") {
    if (h < 170) return "short";
    if (h > 185) return "tall";
    return "average";
  } else if (gender === "female") {
    if (h < 160) return "short";
    if (h > 175) return "tall";
    return "average";
  }

  // Default unisex
  if (h < 165) return "short";
  if (h > 180) return "tall";
  return "average";
}

export function getBuildCategory(
  bmi: number | null,
  physicalCondition: number = 50
): "slim" | "average" | "athletic" | "heavy" {
  if (!bmi) return "average";

  // Consider both BMI and physical condition
  const isAthletic = physicalCondition > 70;

  if (bmi < 18.5) {
    return "slim";
  } else if (bmi >= 18.5 && bmi < 25) {
    return isAthletic ? "athletic" : "average";
  } else if (bmi >= 25 && bmi < 30) {
    return isAthletic ? "athletic" : "average"; // Could be muscular
  } else {
    return "heavy";
  }
}

export function getEnergyLevel(
  sleepData?: any,
  activityData?: any,
  mindfulnessData?: any
): "low" | "moderate" | "high" {
  let energyScore = 50; // Start with baseline

  // Sleep contribution (40%)
  if (sleepData) {
    const avgSleep =
      sleepData.week?.reduce((acc: number, day: any) => acc + day.hours, 0) /
        7 || 7;
    const avgQuality =
      sleepData.week?.reduce((acc: number, day: any) => acc + day.quality, 0) /
        7 || 3;
    const recoveryScore = sleepData.recoveryScore || 50;
    const sleepDebt = sleepData.sleepDebt || 0;

    let sleepContribution = 0;

    // Sleep duration (ideal 7-9 hours)
    if (avgSleep >= 7 && avgSleep <= 9) {
      sleepContribution += 20;
    } else if (avgSleep >= 6 && avgSleep < 7) {
      sleepContribution += 10;
    } else if (avgSleep >= 9 && avgSleep <= 10) {
      sleepContribution += 15;
    }

    // Sleep quality (1-5 scale)
    sleepContribution += (avgQuality - 1) * 5; // 0-20 points

    // Recovery score
    sleepContribution += (recoveryScore - 50) * 0.2; // -10 to +10 points

    // Sleep debt penalty
    sleepContribution -= Math.min(sleepDebt * 2, 15); // Up to -15 points

    energyScore += sleepContribution * 0.4; // 40% weight
  }

  // Activity contribution (30%)
  if (activityData) {
    const physicalCondition =
      activityData.movementProfile?.physicalCondition || 50;
    const activeMinutes = activityData.todayActivity?.activeMinutes || 0;
    const hrv = activityData.todayActivity?.hrv || 50;

    let activityContribution = 0;

    // Physical condition
    activityContribution += (physicalCondition - 50) * 0.5; // -25 to +25 points

    // Active minutes (goal ~30-60 min)
    if (activeMinutes >= 30 && activeMinutes <= 90) {
      activityContribution += 20;
    } else if (activeMinutes >= 15 && activeMinutes < 30) {
      activityContribution += 10;
    } else if (activeMinutes > 90) {
      activityContribution += 15; // Good but maybe overtraining
    }

    // HRV (higher is better for recovery)
    if (hrv > 60) activityContribution += 10;
    else if (hrv > 40) activityContribution += 5;

    energyScore += activityContribution * 0.3; // 30% weight
  }

  // Mindfulness contribution (30%)
  if (mindfulnessData) {
    const avgStress =
      mindfulnessData.weeklyStress?.reduce((a: number, b: number) => a + b, 0) /
        7 || 5;
    const avgEnergy =
      mindfulnessData.weeklyEnergy?.reduce((a: number, b: number) => a + b, 0) /
        7 || 5;
    const positiveMoodDays =
      mindfulnessData.weeklyMood?.filter((mood: string) =>
        ["happy", "calm", "energetic", "focused"].includes(mood)
      ).length || 3;

    let mindfulnessContribution = 0;

    // Stress level (1-10, lower is better)
    mindfulnessContribution += (10 - avgStress) * 2; // 0-18 points

    // Energy level (1-10, higher is better)
    mindfulnessContribution += (avgEnergy - 1) * 2; // 0-18 points

    // Positive mood days
    mindfulnessContribution += positiveMoodDays * 2; // 0-14 points

    energyScore += mindfulnessContribution * 0.3; // 30% weight
  }

  // Convert to categories
  if (energyScore < 40) return "low";
  if (energyScore > 70) return "high";
  return "moderate";
}

export function getFreshnessLevel(
  sleepData?: any
): "tired" | "rested" | "energetic" {
  if (!sleepData) return "rested";

  const lastNightHours = sleepData.lastNight?.hours || 7;
  const lastNightQuality = sleepData.lastNight?.quality || 3;
  const sleepDebt = sleepData.sleepDebt || 0;
  const recoveryScore = sleepData.recoveryScore || 50;
  const chronotype = sleepData.chronotype || "intermediate";
  const bedtimeAdherence = sleepData.bedtime?.adherence || 50;
  const wakeTimeAdherence = sleepData.wakeTime?.adherence || 50;

  let freshnessScore = 50;

  // Last night sleep hours
  if (lastNightHours >= 7 && lastNightHours <= 9) {
    freshnessScore += 20;
  } else if (lastNightHours >= 6 && lastNightHours < 7) {
    freshnessScore += 5;
  } else if (lastNightHours < 6) {
    freshnessScore -= 15;
  } else if (lastNightHours > 9) {
    freshnessScore += 10; // Good but maybe oversleeping
  }

  // Last night quality
  freshnessScore += (lastNightQuality - 3) * 10; // -20 to +20 points

  // Sleep debt
  freshnessScore -= Math.min(sleepDebt * 5, 25);

  // Recovery score
  freshnessScore += (recoveryScore - 50) * 0.3;

  // Schedule adherence (early to bed, early to rise)
  const scheduleAdherence = (bedtimeAdherence + wakeTimeAdherence) / 2;
  freshnessScore += (scheduleAdherence - 50) * 0.2;

  // Chronotype bonus (morning people get freshness boost)
  if (chronotype === "extreme-morning" || chronotype === "morning") {
    freshnessScore += 10;
  }

  if (freshnessScore < 35) return "tired";
  if (freshnessScore > 75) return "energetic";
  return "rested";
}

export function getFitnessLevel(
  activityData?: any,
  bmi?: number
): "beginner" | "moderate" | "fit" | "athletic" {
  if (!activityData) return "beginner";

  const physicalCondition =
    activityData.movementProfile?.physicalCondition || 0;
  const vo2Max = activityData.movementProfile?.vo2Max || 30;
  const strength = activityData.movementProfile?.strength || {
    pushUps: 0,
    squats: 0,
    pullUps: 0,
  };
  const flexibility = activityData.movementProfile?.flexibility || 0;
  const activeMinutes = activityData.todayActivity?.activeMinutes || 0;
  const steps = activityData.todayActivity?.steps || 0;

  let fitnessScore = 0;

  // Physical condition (0-100)
  fitnessScore += physicalCondition * 0.3; // 0-30 points

  // VO2 Max scoring by age/gender (simplified)
  let vo2Score = 0;
  if (vo2Max > 50) vo2Score = 25;
  else if (vo2Max > 40) vo2Score = 20;
  else if (vo2Max > 35) vo2Score = 15;
  else if (vo2Max > 30) vo2Score = 10;
  else vo2Score = 5;
  fitnessScore += vo2Score;

  // Strength assessment
  let strengthScore = 0;
  strengthScore += Math.min(strength.pushUps * 0.5, 10); // Max 10 points
  strengthScore += Math.min(strength.squats * 0.25, 10); // Max 10 points
  strengthScore += Math.min(strength.pullUps * 1, 10); // Max 10 points
  fitnessScore += strengthScore * 0.5; // 0-15 points

  // Flexibility
  fitnessScore += flexibility * 0.1; // 0-10 points

  // Daily activity
  let activityScore = 0;
  if (activeMinutes > 60) activityScore += 10;
  else if (activeMinutes > 30) activityScore += 7;
  else if (activeMinutes > 15) activityScore += 4;

  if (steps > 10000) activityScore += 5;
  else if (steps > 7000) activityScore += 3;

  fitnessScore += activityScore;

  // BMI consideration
  if (bmi && bmi >= 18.5 && bmi <= 25) {
    fitnessScore += 5; // Healthy BMI bonus
  }

  // Categorize fitness level
  if (fitnessScore < 30) return "beginner";
  if (fitnessScore < 60) return "moderate";
  if (fitnessScore < 80) return "fit";
  return "athletic";
}

export function calculateHealthScore(userData: UserHealthData): number {
  let healthScore = 50; // Base score

  // BMI contribution (15%)
  if (userData.height && userData.weight) {
    const bmi = calculateBMI(userData.height, userData.weight);
    if (bmi) {
      if (bmi >= 18.5 && bmi <= 25) {
        healthScore += 15; // Optimal BMI
      } else if ((bmi >= 25 && bmi <= 30) || (bmi >= 17 && bmi < 18.5)) {
        healthScore += 8; // Acceptable range
      } else {
        healthScore -= 5; // Outside healthy range
      }
    }
  }

  // Sleep contribution (25%)
  if (userData.sleepData) {
    const energy = getEnergyLevel(userData.sleepData);
    const freshness = getFreshnessLevel(userData.sleepData);

    let sleepScore = 0;
    if (energy === "high") sleepScore += 15;
    else if (energy === "moderate") sleepScore += 8;

    if (freshness === "energetic") sleepScore += 10;
    else if (freshness === "rested") sleepScore += 5;

    healthScore += sleepScore;
  }

  // Activity contribution (25%)
  if (userData.activityData) {
    const fitness = getFitnessLevel(userData.activityData);
    const physicalCondition =
      userData.activityData.movementProfile?.physicalCondition || 50;

    let activityScore = 0;
    if (fitness === "athletic") activityScore += 15;
    else if (fitness === "fit") activityScore += 12;
    else if (fitness === "moderate") activityScore += 8;
    else activityScore += 3;

    activityScore += (physicalCondition - 50) * 0.2;

    healthScore += Math.max(activityScore, 0);
  }

  // Nutrition contribution (20%)
  if (userData.nutritionData) {
    const avatarHealth = userData.nutritionData.avatarHealth || 50;
    healthScore += (avatarHealth - 50) * 0.4; // -20 to +20 points
  }

  // Mindfulness contribution (15%)
  if (userData.mindfulnessData) {
    const avgStress =
      userData.mindfulnessData.weeklyStress?.reduce((a, b) => a + b, 0) / 7 ||
      5;
    const avgEnergy =
      userData.mindfulnessData.weeklyEnergy?.reduce((a, b) => a + b, 0) / 7 ||
      5;

    let mindfulnessScore = 0;
    mindfulnessScore += (10 - avgStress) * 1.5; // Lower stress is better
    mindfulnessScore += (avgEnergy - 1) * 1.5; // Higher energy is better

    healthScore += mindfulnessScore * 0.15;
  }

  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, Math.round(healthScore)));
}

export function calculateAvatarMetrics(
  userData: UserHealthData
): AvatarMetrics {
  const bmi =
    userData.height && userData.weight
      ? calculateBMI(userData.height, userData.weight)
      : null;

  return {
    height: getHeightCategory(userData.height || "", ""), // Will need gender from user data
    build: getBuildCategory(
      bmi,
      userData.activityData?.movementProfile?.physicalCondition
    ),
    energy: getEnergyLevel(
      userData.sleepData,
      userData.activityData,
      userData.mindfulnessData
    ),
    freshness: getFreshnessLevel(userData.sleepData),
    fitness: getFitnessLevel(userData.activityData, bmi || undefined),
    healthScore: calculateHealthScore(userData),
  };
}
