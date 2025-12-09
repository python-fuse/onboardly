// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";

const toursData = [
  {
    name: "Welcome Tour for New Users",
    status: "Published",
    steps: 5,
    views: "1.2k",
    updated: "2 days ago",
  },
  {
    name: "Dashboard Feature Introduction",
    status: "Draft",
    steps: 8,
    views: 250,
    updated: "5 days ago",
  },
  {
    name: "Advanced Settings Guide",
    status: "Published",
    steps: 12,
    views: "8.9k",
    updated: "1 week ago",
  },
  {
    name: "Billing Page Walkthrough",
    status: "Archived",
    steps: 6,
    views: "5.1k",
    updated: "3 weeks ago",
  },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Statuses");

  const filteredTours = toursData.filter((tour) => {
    return (
      (filter === "All Statuses" || tour.status === filter) &&
      tour.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100/10 text-green-400";
      case "Draft":
        return "bg-gray-100/10 text-gray-400";
      case "Archived":
        return "bg-yellow-100/10 text-yellow-400";
      default:
        return "bg-gray-100/10 text-gray-400";
    }
  };

  return (
    <div className="flex h-auto min-h-screen w-full flex-col font-display bg-[#0d0b14] text-white">

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-col">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Tours
              </h1>
              <p className="text-[#a490cb] text-base font-normal leading-normal mt-1">
                Manage and create new onboarding tours.
              </p>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                add
              </span>
              <span className="truncate">Create Tour</span>
            </button>
          </div>

          {/* ToolBar */}
          <div className="mb-6 flex justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-gray-500">search</span>
              </div>
              <input
                type="text"
                placeholder="Search tours..."
                className="block w-full rounded-lg border-gray-200/10 bg-white/5 dark:bg-[#221834] py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none w-full rounded-lg border-gray-200/10 bg-white/5 dark:bg-[#221834] py-2 pl-3 pr-10 text-sm text-white focus:border-primary focus:ring-primary"
              >
                <option>All Statuses</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <span className="material-symbols-outlined text-gray-500">expand_more</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200/10 dark:border-[#433168] bg-transparent dark:bg-[#161023]">
            <div className="w-full">
              <table className="min-w-full divide-y divide-gray-200/10 dark:divide-[#433168]">
                <thead className="bg-gray-50/5 dark:bg-[#221834]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white w-[230px]">
                      Tour Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">Steps</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">Last Updated</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/10 dark:divide-[#433168]">
                  {filteredTours.map((tour, idx) => (
                    <tr key={idx}>
                      {/* Tour Name — Reduced Width + Truncate */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white w-[230px] truncate">
                        {tour.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getBadgeClass(tour.status)}`}>
                          {tour.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white">{tour.steps}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white">{tour.views}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white">{tour.updated}</td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
