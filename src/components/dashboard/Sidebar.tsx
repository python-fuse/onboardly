"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

interface SidebarProps {
  onCreateClick?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tours", href: "/dashboard/managetour" },
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Embed", href: "/dashboard/embed" },
];

export default function Sidebar({ onCreateClick }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOut } = useClerk(); // Clerk hook

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isLogoutPage = pathname.includes("/analytics") || pathname.includes("/embed");

  const handleLogout = async () => {
    await signOut();        // Logs out the user
    router.push("/");        // Redirect to homepage or login
    closeSidebar();          // Close sidebar
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen flex flex-col border-r border-gray-200/10 bg-[#161023] p-4 text-white transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/...")',
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-medium leading-normal">Guidely Inc.</h1>
                <p className="text-[#a490cb] text-sm font-normal leading-normal">Workspace</p>
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
                      isActive ? "bg-primary text-white" : "text-white hover:bg-[#2f2249]/60"
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
            {isLogoutPage ? (
              <button
                onClick={handleLogout}
                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-red-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
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
              <Link href="/documentation" className="hover:text-white transition-colors">
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
