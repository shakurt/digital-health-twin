"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Disable body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Nutrition",
      path: "/nutrition",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      name: "Activity",
      path: "/activity",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      name: "Health",
      path: "/health",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      name: "Sleep & Recovery",
      path: "/sleep",
      icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    },
    {
      name: "Mindfulness",
      path: "/mindfulness",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobileOpen) {
      onClose();
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed top-0 left-0 bottom-0 z-50
          bg-dark-card/95 backdrop-blur-lg border-r border-white/5
          transition-transform duration-300 ease-in-out
          w-[45%]
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:top-16 lg:w-20 lg:translate-x-0 lg:transition-all
          ${!isMobileOpen && isHovered ? "lg:w-64" : ""}
        `}
      >
        {/* Mobile Header - Always rendered to prevent layout shift during animation */}
        <div
          className={`lg:hidden flex items-center justify-between p-4 border-b border-white/5 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-lg font-bold gradient-text-animated">
            HealthTwin
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-400"
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
        </div>

        <div className="h-full overflow-y-auto py-6">
          <nav className="space-y-2 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-300 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 text-white"
                        : "hover:bg-white/5 border border-transparent text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-r-full" />
                  )}

                  <div
                    className={`
                      shrink-0 transition-colors duration-300
                      ${isActive ? "text-primary" : "group-hover:text-accent"}
                    `}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>

                  <span
                    className={`
                      font-medium whitespace-nowrap transition-all duration-300
                      ${
                        isHovered || isMobileOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4 lg:hidden"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10 blur-xl -z-10" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-0 right-0 px-3 space-y-2">
            {/* Docs Button */}
            <button
              onClick={() => handleNavigation("/docs")}
              className="w-full hidden lg:flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-blue-500/10 border border-transparent hover:border-blue-500/40 text-gray-400 hover:text-blue-400"
            >
              <svg
                className="w-6 h-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span
                className={`
                  font-medium whitespace-nowrap transition-all duration-300
                  ${
                    isHovered || isMobileOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 lg:hidden"
                  }
                `}
              >
                Docs
              </span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={() => {
                // Set session to false in localStorage
                const userData = localStorage.getItem("user");
                if (userData) {
                  const user = JSON.parse(userData);
                  user.session = false;
                  localStorage.setItem("user", JSON.stringify(user));
                }
                router.push("/signin");
              }}
              className="w-full hidden lg:flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 border border-transparent hover:border-red-500/40 text-gray-400 hover:text-red-400"
            >
              <svg
                className="w-6 h-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span
                className={`
                  font-medium whitespace-nowrap transition-all duration-300
                  ${
                    isHovered || isMobileOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 lg:hidden"
                  }
                `}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
