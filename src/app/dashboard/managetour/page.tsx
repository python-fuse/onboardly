"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Sidebar from "@/src/components/dashboard/Sidebar";

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

  const editTour = (name: string) => {
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

  return (
    <>
      <div className="flex min-h-screen text-white">
        {/* Sidebar */}
        <Sidebar 
          showCreateButton={true} 
          onCreateClick={() => setIsCreateOpen(true)} 
        />

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-6 w-full md:w-auto">
          <div className="max-w-6xl mx-auto mt-16 md:mt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Tours</h1>
                <p className="text-sm text-gray-400">
                  Manage and create new onboarding tours.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition w-full md:w-auto"
              >
                + Create Tour
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-gray-800 rounded-2xl overflow-hidden">
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {tours.map((row, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-base">{row.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${row.statusColor}`}
                    >
                      {row.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-3">
                    <div>
                      <span className="block text-gray-500">Steps</span>
                      <span className="text-white">{row.steps}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Views</span>
                      <span className="text-white">{row.views}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Updated</span>
                      <span className="text-white">{row.updated}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span
                      onClick={() => editTour(row.name)}
                      className="cursor-pointer text-purple-400 font-medium"
                    >
                      Edit
                    </span>
                    <span className="cursor-pointer text-gray-400 hover:bg-white hover:rounded-sm hover:px-4 hover:text-red-400">
                      Delete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create Tour Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
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