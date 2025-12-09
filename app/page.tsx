"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: "🏃",
      title: "Activity Tracking",
      description:
        "Monitor your daily movement and exercise patterns with smart habit tracking.",
      delay: "delay-100",
    },
    {
      icon: "🍎",
      title: "Nutrition Insights",
      description:
        "Track your eating habits and get personalized nutrition recommendations.",
      delay: "delay-200",
    },
    {
      icon: "😴",
      title: "Sleep Analysis",
      description:
        "Understand your sleep patterns and improve your rest quality.",
      delay: "delay-300",
    },
    {
      icon: "🧠",
      title: "Mental Wellness",
      description:
        "Monitor your mental state and receive mindfulness suggestions.",
      delay: "delay-[400ms]",
    },
    {
      icon: "📊",
      title: "Predictive Analytics",
      description:
        "Get AI-powered predictions for weight trends and health outcomes.",
      delay: "delay-[500ms]",
    },
    {
      icon: "👥",
      title: "Social Features",
      description:
        "Connect with friends, share progress, and compete on leaderboards.",
      delay: "delay-[600ms]",
    },
  ];

  const stats = [
    { value: "360°", label: "Health View", icon: "🎯" },
    { value: "AI", label: "Powered", icon: "🤖" },
    { value: "24/7", label: "Tracking", icon: "⏰" },
    { value: "3D", label: "Avatar", icon: "🎮" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
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

      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20 min-h-screen flex flex-col justify-center">
          <div
            className={`text-center space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-full text-[10px] sm:text-xs md:text-sm animate-fade-in-down hover-glow">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-gray-400">
                Welcome to the Future of Health • By ThePrimeShak
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight animate-blur-in">
              <span className="gradient-text-animated animate-gradient-shift">
                Digital Health
              </span>
              <br />
              <span className="text-white hover:scale-105 inline-block transition-transform duration-300">
                Twin
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Build your personalized digital twin that learns from your daily
              habits, predicts health trends, and guides you toward a better
              lifestyle.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <Link
                href="/signup"
                className="group relative px-8 py-4 bg-gradient-animated rounded-full text-white font-semibold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 w-full sm:w-auto hover-glow"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </Link>

              <button
                onClick={scrollToFeatures}
                className="group px-8 py-4 bg-dark-card border-2 border-dark-border rounded-full text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:border-primary hover:bg-dark-card/80 hover:scale-105 w-full sm:w-auto hover-lift"
              >
                <span className="flex items-center gap-2 justify-center">
                  Explore Features
                  <span className="group-hover:translate-y-1 transition-transform duration-300">
                    ↓
                  </span>
                </span>
              </button>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-16 animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover-lift card-glow cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300 animate-bounce-slow">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text-animated">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="container mx-auto px-4 py-20">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive health tracking powered by AI and gamification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-dark-card border border-dark-border rounded-2xl p-8 transition-all duration-500 hover-lift card-glow animate-slide-up cursor-pointer relative overflow-hidden ${feature.delay}`}
                style={{ animationDelay: isVisible ? feature.delay : "0ms" }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-animated opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div
                    className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-animated transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Simple steps to build your digital health twin
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                desc: "Sign up and tell us about your current health and lifestyle habits.",
              },
              {
                step: "02",
                title: "Track Daily Habits",
                desc: "Log your nutrition, activity, sleep, and mental wellness through simple check-ins.",
              },
              {
                step: "03",
                title: "Watch Your Twin Evolve",
                desc: "Your 3D avatar grows and changes based on your real-world health patterns.",
              },
              {
                step: "04",
                title: "Get AI Recommendations",
                desc: "Receive personalized suggestions to improve your lifestyle and reach your goals.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex flex-col md:flex-row items-start gap-6 bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 card-glow animate-slide-in-right hover-lift cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-animated opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-animated min-w-[80px] group-hover:scale-125 transition-transform duration-500 relative z-10">
                  {item.step}
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:gradient-text-animated transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-primary text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative max-w-4xl mx-auto bg-gradient-animated border-2 border-primary/30 rounded-3xl p-12 text-center card-glow hover-glow overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-zoom-in-out">
                Ready to Meet Your Digital Twin?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the future of personalized health and start your
                transformation today.
              </p>
              <Link
                href="/signup"
                className="group inline-block px-10 py-5 bg-gradient-animated rounded-full text-white font-bold text-base sm:text-lg md:text-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 hover-glow relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Start Your Journey
                  <span className="text-2xl group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300">
                    ✨
                  </span>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-dark-border relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-animated opacity-5" />

          <div className="relative z-10 text-center text-gray-500 space-y-3">
            <p className="text-xs sm:text-sm hover:text-gray-400 transition-colors duration-300">
              © 2025 Digital Health Twin. A university project prototype.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-500 transition-colors duration-300">
              For educational and presentation purposes only.
            </p>
            <p className="text-xs sm:text-sm text-primary font-semibold group cursor-pointer inline-block">
              Developed by{" "}
              <span className="gradient-text-animated font-bold text-sm sm:text-base md:text-lg group-hover:scale-110 inline-block transition-transform duration-300">
                ThePrimeShak
              </span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
