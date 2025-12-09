"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      <div className="flex h-screen">
        {/* SideNavBar */}
        <aside className="flex w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-zinc-800 dark:bg-black/20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoL63cD8LddmVdnWQdCTrQaWuEFrAgbrOup8n-BF1eLTOZ7W8FzcLx9ULf9cGtMg5NaTQe0i6Ug7RXC-tinQEfs3lVm7boCkgNSjs_mPArqsVPMeLn1OEAN5JqqYgh9hnC-Y0iWycMnhiBQdkXffIIAIdJtRJoWzKGeHSBFk9Ndoptk2yh61RyYdYtWFHXP3BP0AYHSuOlFuTEJJH6NKcAHlkXCLH1Mw6XVz1WkY3z8owTEauD5dBlTzi3HCQ-uDS4pcb5_ZDNotg")',
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Guidely
                </h1>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Onboarding Tours
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-2">
            <a className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20">
              <span className="material-symbols-outlined fill">dashboard</span>
              <p className="text-sm font-medium">Dashboard</p>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">tour</span>
              <p className="text-sm font-medium">Tours</p>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">double_arrow</span>
              <p className="text-sm font-medium">Steps</p>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">pie_chart</span>
              <p className="text-sm font-medium">Analytics</p>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium">Settings</p>
            </a>
          </nav>

          <div className="flex flex-col gap-4">
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold leading-normal shadow-sm hover:bg-primary/90">
              <span className="truncate">Create New Tour</span>
            </button>

            <div className="flex flex-col gap-1">
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                <span className="material-symbols-outlined">help</span>
                <p className="text-sm font-medium">Help & Support</p>
              </a>
            </div>
          </div>
        </aside>

        {/* MainContent */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Top Nav */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-background-light/80 px-8 backdrop-blur-sm dark:border-zinc-800 dark:bg-background-dark/80">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>

            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
                <span className="material-symbols-outlined">notifications</span>
              </button>

              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEuqZ5irI6wMLTgxldi7ZjZSUIwx8knIoKwIviS_wMNNSvPMpPRciKlSXPoJ41kAf0dn6irRHVh7d1MGDJJ_NcBk89PAbIH6nK7KTjWcyXnhlYoWPEhfniMKxX2yPF-IO6dowN-MYVzZX4polP7V3FjZ9mASTi-ZKnQwcDDlOGrUX7GQ-40HZpr7Z8ZbbN45RBnWoz9QeE_K5H6Mf5Y6uu-Nlzqi7VH-1_Qd5TgYhtEc5oGmwVDw0wUS1-aTXkySV7Jxvu0W-uqXI")',
                }}
              ></div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-8">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome back, User!
              </p>
              <p className="text-base text-gray-500 dark:text-zinc-400">
                Here's a summary of your tours.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Total Tours", "12", "+5% from last month"],
                ["Avg. Completion", "86%", "+1.2% from last month"],
                ["Active Users", "1,450", "-0.5% from last month"],
              ].map(([title, value, change], i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <p className="text-base font-medium text-gray-600 dark:text-zinc-400">
                    {title}
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {value}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {change}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Tours */}
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white pt-10 pb-4">
              Recent Tours
            </h2>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 dark:border-zinc-800">
                  <tr>
                    {["Tour Name", "Status", "Completions", "Last Edited"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
                        >
                          {col}
                        </th>
                      )
                    )}
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                  {/* Rows */}
                  {[
                    ["New User Onboarding", "Published", "1,204", "2 days ago"],
                    ["Feature Announcement Tour", "Draft", "-", "5 hours ago"],
                    [
                      "Advanced Settings Guide",
                      "Published",
                      "890",
                      "1 week ago",
                    ],
                    [
                      "Billing Page Walkthrough",
                      "Archived",
                      "2,315",
                      "1 month ago",
                    ],
                  ].map(([name, status, comp, edited], i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                        {name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-zinc-300">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                            ${
                              status === "Published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : status === "Draft"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }
                          `}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-zinc-300">
                        {comp}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-zinc-300">
                        {edited}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a className="text-primary hover:text-primary/80">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
