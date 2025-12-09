"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface Device {
  id: string;
  name: string;
  type: string;
  brand: string;
  icon: string;
  status: "connected" | "disconnected" | "syncing";
  battery?: number;
  lastSync?: string;
  dataTypes: string[];
}

export default function Devices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"connected" | "available">(
    "connected"
  );
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Check session
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/signin");
      return;
    }
    const user = JSON.parse(userData);
    if (!user.session) {
      router.push("/signin");
    }
  }, [router]);

  // Hardcoded connected devices
  const connectedDevices: Device[] = [
    {
      id: "1",
      name: "Apple Watch Series 9",
      type: "Smartwatch",
      brand: "Apple",
      icon: "⌚",
      status: "connected",
      battery: 78,
      lastSync: "2 minutes ago",
      dataTypes: ["Heart Rate", "Steps", "Calories", "Sleep", "Workouts"],
    },
    {
      id: "2",
      name: "Fitbit Charge 6",
      type: "Fitness Tracker",
      brand: "Fitbit",
      icon: "📱",
      status: "syncing",
      battery: 45,
      lastSync: "Syncing now...",
      dataTypes: ["Steps", "Heart Rate", "Sleep", "Active Minutes"],
    },
  ];

  // Hardcoded available devices
  const availableDevices: Device[] = [
    {
      id: "3",
      name: "Garmin Forerunner 965",
      type: "GPS Watch",
      brand: "Garmin",
      icon: "⌚",
      status: "disconnected",
      dataTypes: ["GPS", "Heart Rate", "VO2 Max", "Training Load", "Sleep"],
    },
    {
      id: "4",
      name: "Oura Ring Gen 3",
      type: "Smart Ring",
      brand: "Oura",
      icon: "💍",
      status: "disconnected",
      dataTypes: ["Sleep", "HRV", "Body Temperature", "Activity"],
    },
    {
      id: "5",
      name: "Whoop 4.0",
      type: "Fitness Band",
      brand: "Whoop",
      icon: "📿",
      status: "disconnected",
      dataTypes: ["Strain", "Recovery", "Sleep", "Heart Rate"],
    },
    {
      id: "6",
      name: "Samsung Galaxy Watch 6",
      type: "Smartwatch",
      brand: "Samsung",
      icon: "⌚",
      status: "disconnected",
      dataTypes: ["Heart Rate", "Steps", "Sleep", "Blood Oxygen", "ECG"],
    },
    {
      id: "7",
      name: "Polar H10",
      type: "Heart Rate Monitor",
      brand: "Polar",
      icon: "❤️",
      status: "disconnected",
      dataTypes: ["Heart Rate", "Heart Rate Variability"],
    },
    {
      id: "8",
      name: "Withings Body+",
      type: "Smart Scale",
      brand: "Withings",
      icon: "⚖️",
      status: "disconnected",
      dataTypes: ["Weight", "Body Fat %", "BMI", "Water %"],
    },
  ];

  const handleConnectDevice = (device: Device) => {
    setSelectedDevice(device);
    setShowConnectModal(true);
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return "text-green-500";
    if (battery > 20) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            ● Connected
          </span>
        );
      case "syncing":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse">
            ⟳ Syncing...
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
            ○ Disconnected
          </span>
        );
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text-animated">
                Connected Devices
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Sync your wearables and track your health data
              </p>
            </div>
            <button
              onClick={() => setShowConnectModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden md:inline">Add Device</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 px-4 md:px-6 pb-4">
            <button
              onClick={() => setActiveTab("connected")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === "connected"
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Connected ({connectedDevices.length})
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === "available"
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                  : "bg-white/5 border border-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Available ({availableDevices.length})
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6">
          {activeTab === "connected" ? (
            <>
              {/* Sync Status Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
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
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      All devices synced
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Last updated: 2 minutes ago
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-medium transition-colors">
                    Sync All
                  </button>
                </div>
              </div>

              {/* Connected Devices List */}
              <div className="grid gap-4">
                {connectedDevices.map((device) => (
                  <div
                    key={device.id}
                    className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col">
                      {/* Device Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl border border-white/10 mb-4 mx-auto">
                        {device.icon}
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="text-center w-full">
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              {device.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400">
                              {device.brand} • {device.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center mb-3">
                          {getStatusBadge(device.status)}
                        </div>

                        {/* Battery & Last Sync */}
                        <div className="flex items-center justify-center gap-4 mb-3">
                          {device.battery && (
                            <div className="flex items-center gap-2">
                              <svg
                                className={`w-4 h-4 ${getBatteryColor(
                                  device.battery
                                )}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 6h14v12H3V6zm15 3h3v6h-3V9z"
                                />
                              </svg>
                              <span
                                className={`text-xs sm:text-sm font-medium ${getBatteryColor(
                                  device.battery
                                )}`}
                              >
                                {device.battery}%
                              </span>
                            </div>
                          )}
                          {device.lastSync && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-xs sm:text-sm">
                                {device.lastSync}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Data Types */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {device.dataTypes.map((dataType) => (
                            <span
                              key={dataType}
                              className="px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                              {dataType}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors border border-white/10 hover:border-white/20">
                            Sync Now
                          </button>
                          <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors border border-white/10 hover:border-white/20">
                            Settings
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs sm:text-sm font-medium text-red-400 transition-colors border border-red-500/20 hover:border-red-500/30">
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Insights */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        12,847
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Steps Today
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        72 bpm
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Heart Rate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
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
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        7h 24m
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Sleep Last Night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Search & Filters */}
              <div className="mb-6 flex gap-3">
                <div className="flex-1 relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search devices..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-card/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <button className="px-4 py-3 rounded-xl bg-dark-card/50 border border-white/10 hover:border-white/20 transition-colors">
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>

              {/* Available Devices Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {availableDevices.map((device) => (
                  <div
                    key={device.id}
                    className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-lg border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                    onClick={() => handleConnectDevice(device)}
                  >
                    <div className="flex flex-col items-center">
                      {/* Device Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center text-2xl border border-white/10 group-hover:border-primary/30 transition-colors mb-4">
                        {device.icon}
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 min-w-0 w-full text-center">
                        <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                          {device.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mb-3">
                          {device.brand} • {device.type}
                        </p>

                        {/* Data Types */}
                        <div className="flex flex-wrap justify-center gap-1 mb-4">
                          {device.dataTypes.slice(0, 3).map((dataType) => (
                            <span
                              key={dataType}
                              className="px-2 py-0.5 rounded text-[10px] sm:text-xs bg-white/5 text-gray-400"
                            >
                              {dataType}
                            </span>
                          ))}
                          {device.dataTypes.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs bg-white/5 text-gray-400">
                              +{device.dataTypes.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Connect Button */}
                        <button
                          onClick={() => handleConnectDevice(device)}
                          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-xs sm:text-sm text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                        >
                          Connect Device
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Card */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                      Don't see your device?
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-3">
                      Make sure your device is powered on, in pairing mode, and
                      Bluetooth is enabled on your phone.
                    </p>
                    <button className="text-xs sm:text-sm font-medium text-primary hover:text-secondary transition-colors">
                      View Setup Guide →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Connect Device Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-md relative animate-scale-in">
              <button
                onClick={() => setShowConnectModal(false)}
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

              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl mx-auto mb-4 border border-white/10">
                  {selectedDevice?.icon || "⌚"}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Connect {selectedDevice?.name || "Device"}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mb-6">
                  Follow the steps to pair your device
                </p>

                {/* Connection Steps */}
                <div className="space-y-4 text-left mb-6">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">
                        Enable Bluetooth
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Make sure Bluetooth is turned on
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">
                        Wake your device
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Turn on and activate pairing mode
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">
                        Confirm pairing
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        Accept connection on your device
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm sm:text-base text-white font-medium transition-colors border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConnectModal(false);
                      // Simulate connection success
                      setTimeout(() => {
                        setActiveTab("connected");
                      }, 500);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm sm:text-base text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    Start Pairing
                  </button>
                </div>

                <p className="text-[10px] sm:text-xs text-gray-500 mt-4">
                  Need help?{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    View troubleshooting guide
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
