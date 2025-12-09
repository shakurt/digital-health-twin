"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function AvatarDocs() {
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
      title: "Physical Appearance & Body Metrics",
      description:
        "Height, weight, and gender help us create an avatar that accurately represents your physical form and scales proportionally to your real body.",
      example:
        "Example: Male, 180cm, 75kg → Avatar scaled to 1.05x (tall), with proportional build. Female, 165cm, 60kg → Avatar at 1.0x (average height).",
    },
    {
      title: "Current Health Status & Goals",
      description:
        "Your baseline health metrics and fitness goals shape your avatar's initial appearance and determine the transformation journey you'll see.",
      example:
        "Example: BMI 28, Goal: Weight Loss → Avatar starts with 'heavy' build style. As you progress, avatar gradually transforms to 'athletic' build.",
    },
    {
      title: "Activity & Fitness Level",
      description:
        "Your physical condition score, VO2 Max, and activity patterns determine your avatar's fitness classification and energy levels.",
      example:
        "Example: Physical Condition 75/100, 60min daily activity → Avatar classified as 'Fit' with high energy glow and athletic pose 🏋️.",
    },
    {
      title: "Sleep Patterns & Recovery",
      description:
        "Sleep quality, duration, and recovery scores directly affect your avatar's freshness, energy levels, and visual vibrancy.",
      example:
        "Example: 8h quality sleep, 85% recovery score → Avatar shows 'Energetic' freshness with bright colors and subtle pulse animation.",
    },
    {
      title: "Nutrition & Lifestyle",
      description:
        "Your nutrition health score and lifestyle choices contribute to your avatar's overall health score and appearance.",
      example:
        "Example: Nutrition score 80/100, balanced diet → Contributes 20% to overall health score, avatar has healthy glow and vibrant colors.",
    },
    {
      title: "Mental Wellness & Stress",
      description:
        "Stress levels, energy ratings, and mood patterns from mindfulness tracking influence your avatar's overall energy and health score.",
      example:
        "Example: Low stress (3/10), high energy (8/10) → Avatar displays energetic pose with enhanced glow effects and positive visual cues.",
    },
  ];

  const implementedFeatures = [
    {
      title: "🎭 Dynamic Health Avatar",
      description:
        "Your avatar changes in real-time based on comprehensive health metrics - BMI, sleep, activity, nutrition, and mental wellness combined into one visual representation.",
      example:
        "Health Score 87 → Green gradient background, 🏋️ athletic emoji, subtle pulse animation, bright colors. Changes as you improve!",
    },
    {
      title: "📏 Height-Based Avatar Scaling",
      description:
        "Avatar size adjusts based on your actual height. Short users get 0.9x scale, average 1.0x, tall users 1.1x for accurate representation.",
      example:
        "Male 188cm (tall) → Avatar 1.1x larger. Female 158cm (short) → Avatar 0.9x smaller. Proportional and realistic!",
    },
    {
      title: "💪 Build & Body Type Assessment",
      description:
        "Avatar appearance adapts based on your BMI and physical condition score - from slim to athletic to heavy builds with different visual styling.",
      example:
        "BMI 22, Physical Condition 78 → 'Athletic' build with enhanced glow effects and strong border. BMI 32 → 'Heavy' build with adjusted styling.",
    },
    {
      title: "⚡ Energy Level Calculation (0-100)",
      description:
        "Real-time energy score combining Sleep (40%), Activity (30%), and Mindfulness (30%) data. Your avatar's brightness and animation reflect current energy.",
      example:
        "8h sleep + 60min activity + low stress → Energy 85/100 → Bright avatar with pulse animation. 5h sleep + sedentary → Energy 35/100 → Dim, no animation.",
    },
    {
      title: "😴 Freshness & Recovery Status",
      description:
        "Avatar freshness based on sleep quality, recovery score, and sleep debt. Shows if you're Tired, Rested, or Energetic visually.",
      example:
        "Sleep quality 90%, recovery 85%, no sleep debt → 'Energetic' freshness → Avatar uses 🏃 emoji, vibrant colors, enhanced effects.",
    },
    {
      title: "🏃 Fitness Classification System",
      description:
        "Multi-factor fitness assessment categorizes you as Beginner, Moderate, Fit, or Athletic based on activity, VO2 Max, and physical condition.",
      example:
        "VO2 Max 55, Physical Condition 82, 90min daily activity → 'Athletic' classification → Avatar gets 🏋️ emoji and athletic glow.",
    },
    {
      title: "💯 Comprehensive Health Score (0-100)",
      description:
        "Overall health score combining BMI (15%), Sleep (25%), Activity (25%), Nutrition (20%), Mental Wellness (15%) into one number.",
      example:
        "Health Score breakdown: BMI 88, Sleep 85, Activity 90, Nutrition 78, Mental 82 → Overall 85/100 → Excellent health avatar!",
    },
    {
      title: "🎨 Dynamic Color Gradients",
      description:
        "Background color changes based on health score: Excellent=Green, Good=Blue, Fair=Yellow, Poor=Red. Instant visual feedback!",
      example:
        "Health Score 88 → Vibrant green gradient with strong glow. Score drops to 55 → Yellow gradient with subtle glow. Visual warning system!",
    },
    {
      title: "✨ Smart Avatar Emoji Selection",
      description:
        "Avatar emoji automatically switches based on your fitness level and activity: Default 👨/👩, Athletic 🏋️, Active 🏃, Relaxed 🧘.",
      example:
        "High fitness + energetic → 🏋️ athletic emoji. Well-rested + mindful → 🧘 relaxed emoji. Adapts to your health state!",
    },
    {
      title: "🌊 Contextual Animation Effects",
      description:
        "Three animation types based on energy: Subtle Pulse (energetic users), Energy Pulse (athletic users), Health Glow (excellent health).",
      example:
        "Energy 85/100 → Subtle pulse animation (3s cycle). Athletic + High energy → Energy pulse with scaling (4s). Health 90+ → Breathing glow (5s).",
    },
    {
      title: "👤 Multiple Avatar Variants",
      description:
        "Three display contexts optimized for different pages: Profile (full-featured), Dashboard (compact), Mini (navigation bar).",
      example:
        "Profile: 128px, full insights. Dashboard: 64px, compact stats. Navbar: 40px mini version. All sync with health data!",
    },
    {
      title: "📊 Avatar Health Insights",
      description:
        "Personalized recommendations appear based on avatar metrics: Sleep-focused, Activity-focused, or Peak Performance messages.",
      example:
        "Low energy + poor sleep → '😴 Prioritize sleep quality and duration for better energy.' Excellent health → '🔥 Peak performance state!'",
    },
    {
      title: "🎯 Real-time Health Status Text",
      description:
        "Dynamic status messages combining multiple metrics: 'Feeling energetic • excellent condition • well-rested' updates as you change.",
      example:
        "Good sleep + high activity → 'Feeling energetic and ready for action • excellent physical condition • well-rested.' Live updates!",
    },
    {
      title: "🏅 Profile Page Integration",
      description:
        "Full-featured avatar display on profile page with complete health insights, status text, health score badge, and edit button overlay.",
      example:
        "Profile avatar shows: 128px size, health score 87/100 badge, status text, personalized insights, clickable edit button. Complete overview!",
    },
    {
      title: "📱 Dashboard Avatar Widget",
      description:
        "Compact 64px avatar on dashboard showing health status and score, clickable to navigate to full profile view.",
      example:
        "Dashboard hero section: Avatar displays current health (85), quick status, gradient reflects health level. Click → Profile page.",
    },
    {
      title: "🧭 Navigation Bar Mini Avatar",
      description:
        "40px mini avatar in top navbar with subtle health indication through color/glow, consistent across all pages.",
      example:
        "Navbar shows tiny avatar: Green glow (healthy), Yellow glow (needs improvement), Red glow (poor health). Always visible!",
    },
    {
      title: "👥 Friends Page Avatar Display",
      description:
        "View friends' health avatars to compare health scores, compete in challenges, and see their fitness levels visually.",
      example:
        "Friends list: Each friend shows avatar with health score (88), emoji status (🏋️), streak days (14), badges earned. Social motivation!",
    },
    {
      title: "🏆 Leaderboard Avatar Ranking",
      description:
        "Avatars displayed in leaderboard with health scores, rank changes, level indicators, and badge collections for competition.",
      example:
        "Leaderboard: Rank #4, avatar 👤, health 87, 11,240 points, badges 🏃🥗💤, trend ⬆️ +3 ranks. Competitive visual display!",
    },
  ];

  const futureFeatures = [
    {
      title: "🌍 3D Avatar Metaverse World",
      description:
        "Step into a fully immersive 3D virtual world where your health avatar comes to life. Walk around, explore environments, and interact with other users' avatars in real-time.",
      example:
        "Login → Spawn in Health Plaza with your 3D avatar. Walk to Fitness Park to see others exercising. Visit Wellness Temple for meditation. Full metaverse experience!",
    },
    {
      title: "👗 Avatar Customization Store",
      description:
        "Unlock and purchase avatar outfits, accessories, hairstyles, and visual effects using HealthCoins earned from healthy activities.",
      example:
        "Store: Athletic wear (500 coins), Yoga outfit (300 coins), Running shoes (200 coins), Meditation robe (400 coins). Customize your avatar style!",
    },
    {
      title: "💰 HealthCoin Economy System",
      description:
        "Earn virtual currency (HealthCoins) by completing health activities: steps goals, meditation sessions, sleep targets, nutrition goals. Spend on avatar items and real rewards.",
      example:
        "Earn: 10 coins/1000 steps, 50 coins/meditation, 100 coins/8h sleep, 75 coins/healthy meal. Save 2000 coins → Buy premium avatar outfit!",
    },
    {
      title: "🎮 Health Quests & Challenges",
      description:
        "Complete avatar-based quests with friends: step competitions, sleep challenges, nutrition goals. Your avatar powers up as you succeed!",
      example:
        "Quest: '30-Day Fitness Challenge' with 3 friends. Walk 10k steps daily. Winner's avatar gets 'Fitness Legend' badge + glowing aura effect!",
    },
    {
      title: "🏠 Personal Avatar Space",
      description:
        "Create your own virtual health sanctuary. Decorate with furniture, trophies, and achievement displays earned through healthy habits.",
      example:
        "Your space: Yoga corner, trophy wall with badges, meditation garden, fitness equipment. Invite friends to visit. Unlock items via achievements!",
    },
    {
      title: "⚔️ Avatar Battle Arena",
      description:
        "Compete in health-based PvP battles where avatar strength comes from real fitness metrics. Higher health score = stronger avatar in battles!",
      example:
        "Challenge friend to battle: Your health 87 vs Their health 82 → Your avatar 5% stronger. Battle mini-games test real health knowledge + stats!",
    },
    {
      title: "🌱 Avatar Evolution System",
      description:
        "Your avatar evolves through visual stages as you maintain healthy habits. Level 1 → Level 100 with dramatic appearance upgrades.",
      example:
        "Level 1: Basic avatar. Level 20: Unlock aura effects. Level 50: Transform appearance. Level 100: Legendary form with special animations!",
    },
    {
      title: "🎭 Avatar Mood & Expression System",
      description:
        "Avatar facial expressions and emotes reflect real-time mood from mindfulness tracking. Happy, stressed, energetic, tired - all visible!",
      example:
        "Mood 'Stressed' (8/10) → Avatar frowns, dark cloud overhead. Mood 'Energetic' (9/10) → Avatar smiles, sparkles around. Real emotion = visual!",
    },
    {
      title: "🤝 Avatar Social Hub",
      description:
        "Meet other users in shared virtual spaces: Fitness gym, meditation gardens, nutrition cafe, wellness clinics. Group activities and events!",
      example:
        "Join 'Morning Yoga Session' at 7 AM in Wellness Garden. 20 avatars doing yoga together. Voice chat enabled. Build community!",
    },
    {
      title: "🎯 Achievement-Based Accessories",
      description:
        "Unlock special avatar items by completing real health achievements: 100-day streak crown, marathon finisher medal, perfect sleep halo.",
      example:
        "Achievement: '365-Day Streak' → Unlock golden crown accessory for avatar. 'First Marathon' → Running shoes glow permanently. Flex achievements!",
    },
    {
      title: "🌟 Legendary Avatar Transformations",
      description:
        "Reach health milestones to unlock rare avatar forms: Phoenix (recovery), Dragon (strength), Zen Master (mindfulness), Titan (overall excellence).",
      example:
        "Milestone: 90+ health score for 90 days → Unlock Phoenix transformation. Avatar becomes phoenix with fire effects and resurrection animations!",
    },
    {
      title: "🎪 Seasonal Avatar Events",
      description:
        "Limited-time events with exclusive avatar items and transformations. Summer fitness challenge, winter wellness fest, spring meditation retreat.",
      example:
        "Summer Event: Beach body challenge. Complete goals → Unlock surfboard, beach outfit, summer glow effect. Only available June-August!",
    },
    {
      title: "🏅 Avatar Badges & Titles System",
      description:
        "Collect 100+ badges and titles displayed on your avatar. 'Sleep Champion', 'Fitness Legend', 'Mindfulness Master', 'Nutrition Expert'.",
      example:
        "Badge: 'Sleep Champion' (30 days perfect sleep) → Displays above avatar name. Title: 'Wellness Warrior' → Shows in leaderboard. Prestige!",
    },
    {
      title: "📸 Avatar Photo Studio",
      description:
        "Create custom poses, use filters, add effects, and take screenshots of your avatar to share on social media. Show off health progress!",
      example:
        "Photo Studio: Choose victory pose, add sparkle filter, health score watermark. Share to Instagram: 'My health avatar at 90/100! 💪' Social proof!",
    },
    {
      title: "🎬 Avatar Progression Timeline",
      description:
        "Visual timeline showing your avatar's transformation over weeks, months, years. See the health journey visually from day one to now.",
      example:
        "Timeline: Day 1 (health 52, dim, tired) → Day 180 (health 87, bright, athletic). Watch avatar transform as you watch your health journey!",
    },
    {
      title: "🤖 AI Avatar Coach",
      description:
        "Your avatar becomes an AI coach that talks to you, gives advice, and motivates based on your data. Personality adapts to your progress.",
      example:
        "Avatar AI: 'Great job on 10k steps! But I noticed you slept only 6h. Let's aim for 7.5h tonight, you'll feel amazing!' Personal coaching!",
    },
    {
      title: "🎨 Advanced Avatar Customization",
      description:
        "Detailed customization: skin tone, face shape, body proportions, clothing layers, tattoos, piercings, makeup, accessories. Infinite combinations!",
      example:
        "Customize: Choose face shape, eye color, hair style (50+ options), body type, outfit layers, add tattoos. Make avatar truly YOURS!",
    },
    {
      title: "🔗 Avatar NFT & Blockchain",
      description:
        "Mint your avatar as an NFT. Own rare items as blockchain assets. Trade avatar accessories with other users in decentralized marketplace.",
      example:
        "Mint avatar NFT (0.01 ETH). Legendary 'Phoenix Crown' NFT minted (1/100). List on marketplace or trade with users. True ownership!",
    },
    {
      title: "🎵 Avatar Dance & Emotes",
      description:
        "Unlock dance moves and emotes for your avatar to express yourself. Victory dance after hitting goals, celebration emotes, meditation poses.",
      example:
        "Hit 10k steps → Avatar does victory dance automatically! Unlock: 20+ dances, 50+ emotes. Express emotions and celebrate wins!",
    },
    {
      title: "💎 Health Economy & Gamification",
      description:
        "Advanced gamification: Create a virtual currency (HealthCoins) that users earn by doing healthy activities (meditations, step goals, etc.). Use coins to buy avatar clothes, virtual fitness equipment, or get real-world discounts on medical/health services.",
      example:
        "Complete meditation → Earn 50 HealthCoins. 10k steps → 100 coins. 7-day streak → 500 bonus. Spend: 2000 coins = 20% off gym membership IRL!",
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl">🎭</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Avatar & Metaverse Documentation
              </h1>
              <p className="text-gray-400 text-lg mt-1">
                Your digital health twin that evolves with your wellness journey
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
                  Avatar system questions help us create a dynamic digital twin
                  that accurately represents your physical appearance and health
                  status. Your avatar evolves in real-time based on
                  comprehensive health metrics from all modules.
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
                  These avatar features are live and working. Your digital
                  health twin adapts in real-time based on comprehensive health
                  data from all modules - displayed on profile, dashboard,
                  navbar, friends list, and leaderboard.
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
                  Coming Soon to the Metaverse
                </h3>
                <p className="text-gray-300">
                  The future of health avatars: Immersive 3D metaverse worlds,
                  virtual currency economy, avatar customization, social spaces,
                  quests, battles, and NFT integration. Your health journey
                  becomes a gamified adventure!
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
