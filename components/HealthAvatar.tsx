"use client";

import React, { useMemo } from "react";
import { calculateAvatarMetrics, UserHealthData } from "./AvatarCalculations";
import {
  getAvatarAppearance,
  getAvatarStatusText,
  getHealthInsights,
  AVATAR_ANIMATIONS,
} from "./AvatarAppearance";

interface HealthAvatarProps {
  userData: UserHealthData;
  gender?: "male" | "female" | "neutral";
  size?: number;
  context?: "profile" | "dashboard" | "mini";
  showStatus?: boolean;
  showHealthScore?: boolean;
  showInsights?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function HealthAvatar({
  userData,
  gender = "neutral",
  size = 128,
  context = "profile",
  showStatus = false,
  showHealthScore = false,
  showInsights = false,
  className = "",
  onClick,
}: HealthAvatarProps) {
  // Calculate avatar metrics from user data
  const avatarMetrics = useMemo(() => {
    return calculateAvatarMetrics(userData);
  }, [userData]);

  // Get avatar appearance
  const appearance = useMemo(() => {
    return getAvatarAppearance(avatarMetrics, gender, context);
  }, [avatarMetrics, gender, context]);

  // Get status text and insights
  const statusText = useMemo(
    () => getAvatarStatusText(avatarMetrics),
    [avatarMetrics]
  );
  const healthInsights = useMemo(
    () => getHealthInsights(avatarMetrics),
    [avatarMetrics]
  );

  // Size adjustments for different contexts
  const contextSizes = {
    profile: size,
    dashboard: Math.max(size * 0.8, 64),
    mini: Math.max(size * 0.6, 48),
  };

  const finalSize = contextSizes[context];
  const fontSize = finalSize * 0.4;

  // Add animations CSS if not already present
  React.useEffect(() => {
    const styleId = "avatar-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = AVATAR_ANIMATIONS;
      document.head.appendChild(style);
    }
  }, []);

  const avatarStyle = {
    width: `${finalSize}px`,
    height: `${finalSize}px`,
    background: appearance.backgroundColor,
    border: `4px solid ${appearance.borderColor}`,
    boxShadow: appearance.glowEffect,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: `${fontSize}px`,
    animation: appearance.animation || "none",
    position: "relative" as const,
    transition: "all 0.3s ease",
    cursor: onClick ? "pointer" : "default",
    transform: context === "mini" ? "scale(0.9)" : "none",
  } as React.CSSProperties;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={`health-avatar-container ${className}`}>
      {/* Main Avatar */}
      <div
        style={avatarStyle}
        onClick={handleClick}
        className="health-avatar"
        title={showStatus ? statusText : undefined}
      >
        {appearance.emoji}

        {/* Health score badge for larger avatars */}
        {showHealthScore && context !== "mini" && (
          <div
            className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold border"
            style={{
              color:
                avatarMetrics.healthScore >= 70
                  ? "#059669"
                  : avatarMetrics.healthScore >= 50
                  ? "#3B82F6"
                  : "#EF4444",
              borderColor:
                avatarMetrics.healthScore >= 70
                  ? "#10B981"
                  : avatarMetrics.healthScore >= 50
                  ? "#3B82F6"
                  : "#EF4444",
            }}
          >
            {avatarMetrics.healthScore}
          </div>
        )}
      </div>

      {/* Status Text */}
      {showStatus && context !== "mini" && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-300 leading-relaxed">{statusText}</p>
          {context === "profile" && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span>Health Score:</span>
              <span
                className="font-bold"
                style={{
                  color:
                    avatarMetrics.healthScore >= 70
                      ? "#10B981"
                      : avatarMetrics.healthScore >= 50
                      ? "#3B82F6"
                      : "#EF4444",
                }}
              >
                {avatarMetrics.healthScore}/100
              </span>
            </div>
          )}
        </div>
      )}

      {/* Health Insights */}
      {showInsights && context === "profile" && (
        <div className="mt-4 space-y-2">
          {healthInsights.map((insight, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-sm text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Health Avatar for Dashboard - optimized for smaller spaces
export function DashboardAvatar({
  userData,
  gender = "neutral",
  onClick,
}: {
  userData: UserHealthData;
  gender?: "male" | "female" | "neutral";
  onClick?: () => void;
}) {
  const avatarMetrics = calculateAvatarMetrics(userData);

  return (
    <div className="flex items-center gap-3">
      <HealthAvatar
        userData={userData}
        gender={gender}
        size={64}
        context="dashboard"
        onClick={onClick}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white">Health Status</span>
          <span
            className="px-2 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor:
                avatarMetrics.healthScore >= 70
                  ? "#10B981"
                  : avatarMetrics.healthScore >= 50
                  ? "#3B82F6"
                  : "#EF4444",
              color: "white",
            }}
          >
            {avatarMetrics.healthScore}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate">
          {getAvatarStatusText(avatarMetrics)}
        </p>
      </div>
    </div>
  );
}

// Mini Avatar for navigation/headers
export function MiniAvatar({
  userData,
  gender = "neutral",
  onClick,
}: {
  userData: UserHealthData;
  gender?: "male" | "female" | "neutral";
  onClick?: () => void;
}) {
  return (
    <HealthAvatar
      userData={userData}
      gender={gender}
      size={40}
      context="mini"
      onClick={onClick}
    />
  );
}

// Avatar with quick health metrics
export function AvatarWithMetrics({
  userData,
  gender = "neutral",
}: {
  userData: UserHealthData;
  gender?: "male" | "female" | "neutral";
}) {
  const avatarMetrics = calculateAvatarMetrics(userData);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <HealthAvatar
        userData={userData}
        gender={gender}
        size={80}
        context="dashboard"
      />

      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-400">Energy</p>
          <p className="text-lg font-bold capitalize text-white">
            {avatarMetrics.energy}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">Fitness</p>
          <p className="text-lg font-bold capitalize text-white">
            {avatarMetrics.fitness}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">Freshness</p>
          <p className="text-lg font-bold capitalize text-white">
            {avatarMetrics.freshness}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">Health</p>
          <p
            className="text-lg font-bold text-white"
            style={{
              color:
                avatarMetrics.healthScore >= 70
                  ? "#10B981"
                  : avatarMetrics.healthScore >= 50
                  ? "#3B82F6"
                  : "#EF4444",
            }}
          >
            {avatarMetrics.healthScore}
          </p>
        </div>
      </div>
    </div>
  );
}
