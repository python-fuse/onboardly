"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ManageTour() {
  const router = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tourName, setTourName] = useState("");
  const [tours, setTours] = useState([
    {
      name: "Welcome Tour for New Users",
      status: "Published",
      statusColor: "bg-green-600",
      steps: 5,
      views: "1.2k",
      updated: "2 days ago",
    },
  ]);

  const editTour = (name) => {
    router.push(`/dashboard/edittour?name=${encodeURIComponent(name)}`);
  };

  const createTour = () => {
    if (!tourName.trim()) return;

    setTours((prev) => [
      {
        name: tourName,
        status: "Draft",
        statusColor: "bg-gray-500",
        steps: 2,
        views: "5",
        updated: "Just now",
      },
      ...prev,
    ]);

    setIsCreateOpen(false);
    setTourName("");
  };

  const sidebarItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Tours", path: "/dashboard/managetour" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Help", path: "/dashboard/help" },
  ];

  return (
    <>
      <div className="flex min-h-screen text-white">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-gray-800 px-4 py-6 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <h2 className="font-semibold text-sm">Guidely Inc.</h2>
              <p className="text-xs text-gray-400">Workspace</p>
            </div>

            <nav className="space-y-2 text-sm">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  className={`px-3 py-2 rounded-lg cursor-pointer transition ${
                    item.label === "Tours"
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="w-full bg-purple-600 rounded-lg py-2 text-sm font-semibold hover:bg-purple-700 transition"
            >
              New Tour
            </button>
            <div className="text-xs text-gray-500">Docs</div>
            <div className="text-xs text-gray-500">Support</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-8 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">Tours</h1>
                <p className="text-sm text-gray-400">
                  Manage and create new onboarding tours.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition"
              >
                + Create Tour
              </button>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-gray-400 bg-gray-900">
                  <tr>
                    <th className="text-left px-6 py-3">Tour Name</th>
                    <th>Status</th>
                    <th>Steps</th>
                    <th>Views</th>
                    <th>Time</th>
                    <th className="text-right px-6">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tours.map((row, i) => (
                    <tr key={i} className="border-t border-gray-700">
                      <td className="px-6 py-4">{row.name}</td>

                      <td>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${row.statusColor}`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td>{row.steps}</td>
                      <td>{row.views}</td>
                      <td className="text-gray-400">{row.updated}</td>

                      <td className="px-6 text-right space-x-4">
                        <span
                          onClick={() => editTour(row.name)}
                          className="cursor-pointer text-purple-400 hover:underline"
                        >
                          Edit
                        </span>

                        <span className="cursor-pointer text-gray-400 hover:text-red-400">
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create Tour Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Create new tour</h2>
            <p className="text-sm text-gray-400 mb-4">
              Give your tour a clear and descriptive name.
            </p>

            <input
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              placeholder="Tour name"
              className="w-full bg-gray-800 px-4 py-2 rounded-lg text-sm outline-none mb-6"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setTourName("");
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={createTour}
                disabled={!tourName.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
