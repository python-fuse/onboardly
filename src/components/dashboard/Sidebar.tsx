"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tours", href: "/dashboard/managetour" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Embed Script", href: "/dashboard/embed" },
];

export default function Sidebar({
  showCreateButton = true,
  onCreateClick,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          w-64 h-screen
          flex flex-col border-r border-gray-200/10 bg-[#161023] p-4 text-white
          transition-transform duration-300 ease-in-out
          z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Logo/Brand Section */}
            <div className="flex items-center gap-3 px-2 mb-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5ngYh5buKcZfMu9Bzquhr31XfWBK1shORf072WvRE_OiL_ntHbkmgMoFvN3rHU6nrKcf8swEauwPF77oMKCao00Jc8SH6lcqb9GV0XZqNmIsoYno2ruokeUNK0UtsVJQKyQOpbqVn4WgeZfo8KW5TVKC0KYy0lYg1MtCfOgNBMs9tLUGogYiEonRrbOzL2r5_a_FSK2ATw1Y-_Dk8NvKtuBwAWlRxPLhDYk969Z7LNmVEsaA7wH5KzQWFqp-NXFz-YsnAJqgtDBY")',
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-medium leading-normal">
                  Guidely Inc.
                </h1>
                <p className="text-[#a490cb] text-sm font-normal leading-normal">
                  Workspace
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-white hover:bg-[#2f2249]/60"
                    }`}
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4">
            {showCreateButton && (
              <button
                onClick={() => {
                  onCreateClick?.();
                  closeSidebar();
                }}
                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
              >
                New Tour
              </button>
            )}
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <Link
                href="/documentation"
                className="hover:text-white transition-colors"
              >
                Docs
              </Link>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
