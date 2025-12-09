// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Link from "next/link";

const recentTours = [
  {
    name: "New User Onboarding",
    status: "Published",
    completions: "1,204",
    lastEdited: "2 days ago",
    badgeColor: "green",
    action: "Edit",
  },
  {
    name: "Feature Announcement Tour",
    status: "Draft",
    completions: "-",
    lastEdited: "5 hours ago",
    badgeColor: "yellow",
    action: "Edit",
  },
  {
    name: "Advanced Settings Guide",
    status: "Published",
    completions: "890",
    lastEdited: "1 week ago",
    badgeColor: "green",
    action: "Edit",
  },
  {
    name: "Billing Page Walkthrough",
    status: "Archived",
    completions: "2,315",
    lastEdited: "1 month ago",
    badgeColor: "gray",
    action: "View",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-display bg-background-dark text-white">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex">
      </aside>

      {/* Mobile Sidebar toggle */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <Sidebar />
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-background-dark/80 px-4 md:px-8 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg font-bold text-white">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square w-10 h-10 rounded-full"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEuqZ5irI6wMLTgxldi7ZjZSUIwx8knIoKwIviS_wMNNSvPMpPRciKlSXPoJ41kAf0dn6irRHVh7d1MGDJJ_NcBk89PAbIH6nK7KTjWcyXnhlYoWPEhfniMKxX2yPF-IO6dowN-MYVzZX4polP7V3FjZ9mASTi-ZKnQwcDDlOGrUX7GQ-40HZpr7Z8ZbbN45RBnWoz9QeE_K5H6Mf5Y6uu-Nlzqi7VH-1_Qd5TgYhtEc5oGmwVDw0wUS1-aTXkySV7Jxvu0W-uqXI")',
              }}
            ></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold tracking-tight text-white">
                Welcome back, User!
              </p>
              <p className="text-base text-zinc-400">
                Here's a summary of your tours.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 min-w-[220px]">
              <p className="text-base font-medium text-zinc-400">Total Tours</p>
              <p className="text-3xl font-bold tracking-tight text-white">12</p>
              <p className="text-sm font-medium text-green-500">+5% from last month</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 min-w-[220px]">
              <p className="text-base font-medium text-zinc-400">Avg. Completion</p>
              <p className="text-3xl font-bold tracking-tight text-white">86%</p>
              <p className="text-sm font-medium text-green-500">+1.2% from last month</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 min-w-[220px]">
              <p className="text-base font-medium text-zinc-400">Active Users</p>
              <p className="text-3xl font-bold tracking-tight text-white">1,450</p>
              <p className="text-sm font-medium text-red-500">-0.5% from last month</p>
            </div>
          </div>

          {/* Recent Tours */}
          <h2 className="text-xl font-bold tracking-tight text-white pt-10 pb-4">Recent Tours</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
            <table className="w-full text-left min-w-[600px]">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Tour Name</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Completions</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Last Edited</th>
                  <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recentTours.map((tour) => (
                  <tr key={tour.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{tour.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-300">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          tour.badgeColor === "green"
                            ? "bg-green-900/40 text-green-300"
                            : tour.badgeColor === "yellow"
                            ? "bg-yellow-900/40 text-yellow-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-300">{tour.completions}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-300">{tour.lastEdited}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link href="#" className="text-primary hover:text-primary/80">
                        {tour.action}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
