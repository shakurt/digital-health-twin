import { AvatarMetrics } from "./AvatarCalculations";

export interface AvatarAppearance {
  emoji: string;
  backgroundColor: string;
  borderColor: string;
  glowEffect: string;
  size: "small" | "medium" | "large";
  animation?: string;
}

// Base avatars by gender
const BASE_AVATARS = {
  male: {
    default: "👨",
    athletic: "🏋️‍♂️",
    runner: "🏃‍♂️",
    relaxed: "🧘‍♂️",
  },
  female: {
    default: "👩",
    athletic: "🏋️‍♀️",
    runner: "🏃‍♀️",
    relaxed: "🧘‍♀️",
  },
  neutral: {
    default: "🧑",
    athletic: "🏋️",
    runner: "🏃",
    relaxed: "🧘",
  },
};

// Height-based size variations
const HEIGHT_STYLES = {
  short: {
    transform: "scale(0.9)",
    size: "small" as const,
  },
  average: {
    transform: "scale(1.0)",
    size: "medium" as const,
  },
  tall: {
    transform: "scale(1.1)",
    size: "large" as const,
  },
};

// Build-based styling
const BUILD_STYLES = {
  slim: {
    filter: "contrast(1.1) brightness(1.05)",
    borderWidth: "2px",
  },
  average: {
    filter: "none",
    borderWidth: "3px",
  },
  athletic: {
    filter: "contrast(1.2) saturate(1.1)",
    borderWidth: "4px",
    boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)",
  },
  heavy: {
    filter: "brightness(0.95)",
    borderWidth: "3px",
  },
};

// Energy-based color schemes
const ENERGY_COLORS = {
  low: {
    backgroundColor: "linear-gradient(135deg, #374151 0%, #4B5563 100%)",
    borderColor: "#6B7280",
    glowEffect: "0 0 10px rgba(107, 114, 128, 0.2)",
  },
  moderate: {
    backgroundColor: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    borderColor: "#3B82F6",
    glowEffect: "0 0 15px rgba(59, 130, 246, 0.3)",
  },
  high: {
    backgroundColor: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    borderColor: "#10B981",
    glowEffect: "0 0 20px rgba(16, 185, 129, 0.4)",
  },
};

// Freshness-based styling
const FRESHNESS_STYLES = {
  tired: {
    filter: "brightness(0.8) saturate(0.7)",
    animation: "none",
  },
  rested: {
    filter: "brightness(1.0) saturate(1.0)",
    animation: "none",
  },
  energetic: {
    filter: "brightness(1.1) saturate(1.2)",
    animation: "subtle-pulse 3s ease-in-out infinite",
  },
};

// Fitness-based effects
const FITNESS_EFFECTS = {
  beginner: {
    opacity: 0.9,
    borderStyle: "solid",
  },
  moderate: {
    opacity: 0.95,
    borderStyle: "solid",
  },
  fit: {
    opacity: 1.0,
    borderStyle: "solid",
    boxShadow: "0 0 12px rgba(34, 197, 94, 0.2)",
  },
  athletic: {
    opacity: 1.0,
    borderStyle: "solid",
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
    animation: "energy-pulse 4s ease-in-out infinite",
  },
};

// Health score based overall styling
function getHealthScoreStyle(healthScore: number) {
  if (healthScore >= 80) {
    return {
      borderColor: "#10B981", // Green
      backgroundColor: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
      glowEffect: "0 0 25px rgba(16, 185, 129, 0.5)",
      animation: "health-glow 5s ease-in-out infinite",
    };
  } else if (healthScore >= 60) {
    return {
      borderColor: "#3B82F6", // Blue
      backgroundColor: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
      glowEffect: "0 0 18px rgba(59, 130, 246, 0.4)",
    };
  } else if (healthScore >= 40) {
    return {
      borderColor: "#F59E0B", // Yellow
      backgroundColor: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
      glowEffect: "0 0 15px rgba(245, 158, 11, 0.3)",
    };
  } else {
    return {
      borderColor: "#EF4444", // Red
      backgroundColor: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
      glowEffect: "0 0 12px rgba(239, 68, 68, 0.3)",
    };
  }
}

export function getAvatarAppearance(
  metrics: AvatarMetrics,
  gender: "male" | "female" | "neutral" = "neutral",
  context: "profile" | "dashboard" | "mini" = "profile"
): AvatarAppearance {
  // Determine base emoji
  let emoji = BASE_AVATARS[gender].default;

  // Modify emoji based on fitness and activity
  if (metrics.fitness === "athletic" && metrics.energy === "high") {
    emoji = BASE_AVATARS[gender].athletic;
  } else if (metrics.fitness === "fit" && metrics.energy === "high") {
    emoji = BASE_AVATARS[gender].runner;
  } else if (metrics.energy === "low" || metrics.freshness === "tired") {
    // Keep default but will be styled as tired
    emoji = BASE_AVATARS[gender].default;
  }

  // Get health-based styling
  const healthStyle = getHealthScoreStyle(metrics.healthScore);

  // Combine all styling
  const appearance: AvatarAppearance = {
    emoji,
    backgroundColor: healthStyle.backgroundColor,
    borderColor: healthStyle.borderColor,
    glowEffect: healthStyle.glowEffect,
    size: HEIGHT_STYLES[metrics.height].size,
  };

  // Add animation based on freshness and fitness
  if (metrics.freshness === "energetic" && metrics.fitness === "athletic") {
    appearance.animation = "energy-pulse 4s ease-in-out infinite";
  } else if (metrics.freshness === "energetic") {
    appearance.animation = "subtle-pulse 3s ease-in-out infinite";
  } else if (healthStyle.animation) {
    appearance.animation = healthStyle.animation;
  }

  return appearance;
}

export function getAvatarCSS(
  appearance: AvatarAppearance,
  contextSize: number = 128
): string {
  const sizeMultiplier = {
    small: 0.9,
    medium: 1.0,
    large: 1.1,
  }[appearance.size];

  const finalSize = contextSize * sizeMultiplier;

  return `
    width: ${finalSize}px;
    height: ${finalSize}px;
    background: ${appearance.backgroundColor};
    border: 4px solid ${appearance.borderColor};
    box-shadow: ${appearance.glowEffect};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${finalSize * 0.4}px;
    animation: ${appearance.animation || "none"};
    position: relative;
    transition: all 0.3s ease;
  `;
}

// CSS animations to be added to global styles
export const AVATAR_ANIMATIONS = `
@keyframes subtle-pulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
  }
  50% { 
    transform: scale(1.02); 
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  }
}

@keyframes energy-pulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
    filter: brightness(1.0);
  }
  25% { 
    transform: scale(1.03); 
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
    filter: brightness(1.1);
  }
  75% { 
    transform: scale(1.01); 
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
    filter: brightness(1.05);
  }
}

@keyframes health-glow {
  0%, 100% { 
    box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
  }
  50% { 
    box-shadow: 0 0 35px rgba(16, 185, 129, 0.7), 
                0 0 50px rgba(16, 185, 129, 0.3);
  }
}
`;

// Get contextual avatar info text
export function getAvatarStatusText(metrics: AvatarMetrics): string {
  const statusParts: string[] = [];

  // Energy status
  if (metrics.energy === "high" && metrics.freshness === "energetic") {
    statusParts.push("Feeling energetic and ready for action");
  } else if (metrics.energy === "high") {
    statusParts.push("High energy levels");
  } else if (metrics.energy === "low") {
    statusParts.push("Low energy - needs rest and recovery");
  } else {
    statusParts.push("Moderate energy levels");
  }

  // Fitness status
  if (metrics.fitness === "athletic") {
    statusParts.push("excellent physical condition");
  } else if (metrics.fitness === "fit") {
    statusParts.push("good fitness level");
  } else if (metrics.fitness === "moderate") {
    statusParts.push("moderate fitness");
  } else {
    statusParts.push("building fitness");
  }

  // Sleep/recovery status
  if (metrics.freshness === "tired") {
    statusParts.push("could use better sleep");
  } else if (metrics.freshness === "energetic") {
    statusParts.push("well-rested and refreshed");
  }

  return statusParts.join(" • ");
}

// Get health insights based on avatar metrics
export function getHealthInsights(metrics: AvatarMetrics): string[] {
  const insights: string[] = [];

  if (metrics.healthScore >= 85) {
    insights.push("🌟 Excellent overall health! Keep up the great work.");
  } else if (metrics.healthScore >= 70) {
    insights.push("💪 Great health status with room for optimization.");
  } else if (metrics.healthScore >= 50) {
    insights.push("📈 Good foundation - focus on consistent improvements.");
  } else {
    insights.push("🎯 Opportunity for significant health improvements.");
  }

  if (metrics.energy === "low" && metrics.freshness === "tired") {
    insights.push(
      "😴 Prioritize sleep quality and duration for better energy."
    );
  }

  if (metrics.fitness === "beginner" && metrics.energy === "low") {
    insights.push("🏃‍♂️ Start with light exercise to boost energy and fitness.");
  }

  if (metrics.fitness === "athletic" && metrics.energy === "high") {
    insights.push("🔥 Peak performance state - maintain this balance!");
  }

  return insights;
}
