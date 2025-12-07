"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

interface Friend {
  id: string;
  username: string;
  avatar: string;
  healthScore: number;
  streak: number;
  joinedDays: number;
  badges: string[];
  isFavorite: boolean;
  weeklySteps: number;
  lastActive: string;
}

interface Quest {
  id: string;
  friendId: string;
  friendName: string;
  friendAvatar: string;
  type: string;
  target: number;
  userProgress: number;
  friendProgress: number;
  endsIn: string;
  prize: string;
}

export default function Friends() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    null
  );
  const [friends, setFriends] = useState<Friend[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const friendsPerPage = 4;
  const totalPages = Math.ceil(friends.length / friendsPerPage);

  const avatarEmojis = ["🧑‍💼", "👩‍🔬", "🧑‍🎨", "👨‍🏫", "👩‍⚕️", "🧑‍🍳", "👨‍🚀", "👩‍💻"];

  const searchSuggestions = [
    {
      username: "sarah_wellness",
      avatar: "👩‍🔬",
      healthScore: 88,
      status: "online",
    },
    {
      username: "mike_fitness",
      avatar: "🧑‍🎨",
      healthScore: 92,
      status: "offline",
    },
    {
      username: "emma_health",
      avatar: "👩‍⚕️",
      healthScore: 85,
      status: "online",
    },
  ];

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      router.push("/signin");
      return;
    }

    const userData = JSON.parse(user);
    setCurrentUser(userData);

    // Initialize mock friends data
    const mockFriends: Friend[] = [
      {
        id: "1",
        username: "alex_fitness",
        avatar: avatarEmojis[0],
        healthScore: 87,
        streak: 14,
        joinedDays: 120,
        badges: ["🏃", "🥗", "💤"],
        isFavorite: true,
        weeklySteps: 75000,
        lastActive: "2 hours ago",
      },
      {
        id: "2",
        username: "jordan_health",
        avatar: avatarEmojis[1],
        healthScore: 92,
        streak: 21,
        joinedDays: 200,
        badges: ["🧘", "🥇", "💪", "🌟"],
        isFavorite: false,
        weeklySteps: 85000,
        lastActive: "5 minutes ago",
      },
      {
        id: "3",
        username: "casey_wellness",
        avatar: avatarEmojis[2],
        healthScore: 78,
        streak: 7,
        joinedDays: 45,
        badges: ["🥗", "💤"],
        isFavorite: true,
        weeklySteps: 62000,
        lastActive: "1 day ago",
      },
      {
        id: "4",
        username: "sam_athlete",
        avatar: avatarEmojis[3],
        healthScore: 95,
        streak: 30,
        joinedDays: 365,
        badges: ["🏆", "🥇", "💪", "🏃", "🌟"],
        isFavorite: false,
        weeklySteps: 95000,
        lastActive: "10 minutes ago",
      },
      {
        id: "5",
        username: "taylor_zen",
        avatar: avatarEmojis[4],
        healthScore: 84,
        streak: 12,
        joinedDays: 90,
        badges: ["🧘", "💤", "🌟"],
        isFavorite: false,
        weeklySteps: 70000,
        lastActive: "3 hours ago",
      },
      {
        id: "6",
        username: "riley_active",
        avatar: avatarEmojis[5],
        healthScore: 89,
        streak: 18,
        joinedDays: 150,
        badges: ["🏃", "💪", "🥗"],
        isFavorite: true,
        weeklySteps: 80000,
        lastActive: "30 minutes ago",
      },
    ];

    setFriends(mockFriends);

    // Initialize active quests
    const mockQuests: Quest[] = [
      {
        id: "q1",
        friendId: "1",
        friendName: "alex_fitness",
        friendAvatar: avatarEmojis[0],
        type: "Weekly Steps Challenge",
        target: 70000,
        userProgress: 52000,
        friendProgress: 61000,
        endsIn: "3 days",
        prize: "🏆 50 XP + Achievement Badge",
      },
      {
        id: "q2",
        friendId: "4",
        friendName: "sam_athlete",
        friendAvatar: avatarEmojis[3],
        type: "7-Day Meditation Streak",
        target: 7,
        userProgress: 4,
        friendProgress: 6,
        endsIn: "4 days",
        prize: "🧘 Zen Master Badge",
      },
    ];

    setActiveQuests(mockQuests);
  }, [router]);

  const handleDeleteFriend = (friendId: string) => {
    setFriends(friends.filter((f) => f.id !== friendId));
    setActiveMenu(null);
  };

  const handleToggleFavorite = (friendId: string) => {
    setFriends(
      friends.map((f) =>
        f.id === friendId ? { ...f, isFavorite: !f.isFavorite } : f
      )
    );
    setActiveMenu(null);
  };

  const handleStartQuest = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowQuestModal(true);
    setActiveMenu(null);
  };

  const getCurrentPageFriends = () => {
    const startIndex = (currentPage - 1) * friendsPerPage;
    const endIndex = startIndex + friendsPerPage;
    return friends.slice(startIndex, endIndex);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90)
      return "text-green-400 border-green-400/30 bg-green-500/10";
    if (score >= 75) return "text-blue-400 border-blue-400/30 bg-blue-500/10";
    if (score >= 60)
      return "text-yellow-400 border-yellow-400/30 bg-yellow-500/10";
    return "text-red-400 border-red-400/30 bg-red-500/10";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 90) return "Elite";
    if (score >= 75) return "Strong";
    if (score >= 60) return "Good";
    return "Improving";
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading friends...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      {/* Quest Modal */}
      {showQuestModal && selectedFriend && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 max-w-md w-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-4">
              Start a Quest with {selectedFriend.username}
            </h3>

            <div className="space-y-4">
              <button className="w-full p-4 bg-primary/10 border border-primary/30 rounded-xl text-left hover:bg-primary/20 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏃</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">
                      Weekly Steps Battle
                    </p>
                    <p className="text-gray-400 text-sm">
                      First to reach 70,000 steps wins
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 bg-secondary/10 border border-secondary/30 rounded-xl text-left hover:bg-secondary/20 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧘</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-secondary transition-colors">
                      Mindfulness Marathon
                    </p>
                    <p className="text-gray-400 text-sm">
                      7-day meditation streak challenge
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 bg-accent/10 border border-accent/30 rounded-xl text-left hover:bg-accent/20 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🥗</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-accent transition-colors">
                      Healthy Eating Quest
                    </p>
                    <p className="text-gray-400 text-sm">
                      Track nutrition goals together
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💤</span>
                  <div>
                    <p className="text-white font-medium">
                      Sleep Recovery Challenge
                    </p>
                    <p className="text-gray-400 text-sm">
                      Best sleep quality wins
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowQuestModal(false)}
              className="w-full mt-6 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Friends & Community
          </h1>
          <p className="text-gray-400">
            Connect, compete, and achieve together
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Find New Friends
          </h2>

          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() =>
                  setTimeout(() => setShowSearchResults(false), 200)
                }
                className="w-full px-6 py-4 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>
            </div>

            {/* Search Suggestions */}
            {showSearchResults && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-white/10 rounded-xl overflow-hidden z-10 animate-fade-in-up">
                {searchSuggestions
                  .filter((user) =>
                    user.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((user, index) => (
                    <button
                      key={index}
                      className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium">
                            {user.username}
                          </p>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              user.status === "online"
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Health Score: {user.healthScore}
                        </p>
                      </div>

                      <button className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary font-medium hover:bg-primary/30 transition-all">
                        Add Friend
                      </button>
                    </button>
                  ))}

                {searchSuggestions.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="p-6 text-center text-gray-400">
                    <span className="text-4xl mb-2 block">😔</span>
                    <p>No users found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Friends Grid */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              My Friends ({friends.length})
            </h2>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary font-medium text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 font-medium text-sm hover:bg-white/10 transition-all">
                ⭐ Favorites
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 font-medium text-sm hover:bg-white/10 transition-all">
                🟢 Online
              </button>
            </div>
          </div>

          {/* Friends Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {getCurrentPageFriends().map((friend, index) => (
              <div
                key={friend.id}
                className="bg-linear-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-3xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        {friend.avatar}
                      </div>
                      {friend.isFavorite && (
                        <span className="absolute -top-1 -right-1 text-xl">
                          ⭐
                        </span>
                      )}
                    </div>

                    {/* User Info */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {friend.username}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {friend.lastActive}
                      </p>
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === friend.id ? null : friend.id
                        )
                      }
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <span className="text-gray-400 text-xl">⋮</span>
                    </button>

                    {activeMenu === friend.id && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-xl overflow-hidden z-20 animate-fade-in-up shadow-xl">
                        <button
                          onClick={() => handleToggleFavorite(friend.id)}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-all flex items-center gap-3"
                        >
                          <span>{friend.isFavorite ? "⭐" : "☆"}</span>
                          <span className="text-sm">
                            {friend.isFavorite
                              ? "Unfavorite"
                              : "Add to Favorites"}
                          </span>
                        </button>

                        <button
                          onClick={() => handleStartQuest(friend)}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-all flex items-center gap-3"
                        >
                          <span>🎯</span>
                          <span className="text-sm">Start a Quest</span>
                        </button>

                        <button
                          onClick={() => handleDeleteFriend(friend.id)}
                          className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-3"
                        >
                          <span>🗑️</span>
                          <span className="text-sm">Remove Friend</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Health Score Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${getHealthScoreColor(
                    friend.healthScore
                  )}`}
                >
                  <span className="text-lg">💪</span>
                  <span className="font-bold">{friend.healthScore}</span>
                  <span className="text-xs opacity-75">
                    {getHealthScoreLabel(friend.healthScore)}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">
                      {friend.streak}
                    </p>
                    <p className="text-xs text-gray-400">Day Streak</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">
                      {Math.floor(friend.weeklySteps / 1000)}k
                    </p>
                    <p className="text-xs text-gray-400">Steps/Week</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">
                      {friend.joinedDays}
                    </p>
                    <p className="text-xs text-gray-400">Days Active</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-xs text-gray-400">Achievements:</p>
                  <div className="flex gap-1">
                    {friend.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="text-lg"
                        title="Achievement Badge"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary font-medium text-sm hover:bg-primary/30 transition-all">
                    View Profile
                  </button>
                  <button
                    onClick={() => handleStartQuest(friend)}
                    className="flex-1 px-4 py-2 bg-gradient-animated rounded-lg text-white font-medium text-sm hover:scale-105 transition-transform"
                  >
                    Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? "border-white/5 text-gray-600 cursor-not-allowed"
                    : "border-white/10 text-white hover:bg-white/10"
                }`}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border font-medium transition-all ${
                      page === currentPage
                        ? "bg-primary border-primary text-white"
                        : "border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                  currentPage === totalPages
                    ? "border-white/5 text-gray-600 cursor-not-allowed"
                    : "border-white/10 text-white hover:bg-white/10"
                }`}
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Active Quests */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎯</span>
            Active Quests
          </h2>

          <div className="space-y-6">
            {activeQuests.map((quest, index) => (
              <div
                key={quest.id}
                className="bg-linear-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quest Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                      {quest.friendAvatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">
                        {quest.type}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        vs {quest.friendName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Ends in</p>
                    <p className="text-white font-medium">{quest.endsIn}</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  {/* User Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">You</span>
                      <span className="text-sm text-white font-medium">
                        {quest.userProgress.toLocaleString()} /{" "}
                        {quest.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500 relative"
                        style={{
                          width: `${Math.min(
                            (quest.userProgress / quest.target) * 100,
                            100
                          )}%`,
                        }}
                      >
                        {quest.userProgress >= quest.target && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Friend Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        {quest.friendName}
                      </span>
                      <span className="text-sm text-white font-medium">
                        {quest.friendProgress.toLocaleString()} /{" "}
                        {quest.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-accent to-secondary transition-all duration-500 relative"
                        style={{
                          width: `${Math.min(
                            (quest.friendProgress / quest.target) * 100,
                            100
                          )}%`,
                        }}
                      >
                        {quest.friendProgress >= quest.target && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quest Prize */}
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-yellow-400 text-xs font-medium">Prize</p>
                    <p className="text-white text-sm">{quest.prize}</p>
                  </div>
                </div>

                {/* Leader Badge */}
                {quest.userProgress > quest.friendProgress && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                      <span>👑</span>
                      You're winning!
                    </span>
                  </div>
                )}
                {quest.friendProgress > quest.userProgress && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium">
                      <span>⚠️</span>
                      {quest.friendName} is ahead!
                    </span>
                  </div>
                )}
              </div>
            ))}

            {activeQuests.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🎯</span>
                <p className="text-gray-400 mb-4">No active quests</p>
                <p className="text-gray-500 text-sm">
                  Challenge a friend to start competing!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
