"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Sidebar from "@/src/components/dashboard/Sidebar";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";

export default function ManageTour() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tourName, setTourName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deletingTourId, setDeletingTourId] = useState<Id<"tours"> | null>(
    null
  );

  // Fetch tours from Convex
  const tours = useQuery(api.tours.listUserTours);
  const createTourMutation = useMutation(api.tours.createTour);
  const deleteTourMutation = useMutation(api.tours.deleteTour);

  const editTour = (tourId: Id<"tours">) => {
    router.push(`/dashboard/edittour?id=${tourId}`);
  };

  const createTour = async () => {
    if (!tourName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      // Generate a unique tourId (used by the widget)
      const tourId = `tour_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      await createTourMutation({
        name: tourName,
        tourId,
        autoStart: false,
        showProgress: true,
        allowSkip: true,
      });

      setIsCreateOpen(false);
      setTourName("");
    } catch (error) {
      console.error("Failed to create tour:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const deleteTour = async (tourId: Id<"tours">, tourName: string) => {
    if (!confirm(`Are you sure you want to delete "${tourName}"?`)) return;

    setDeletingTourId(tourId);
    try {
      await deleteTourMutation({ tourId });
    } catch (error) {
      console.error("Failed to delete tour:", error);
    } finally {
      setDeletingTourId(null);
    }
  };

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
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

            {/* Loading State */}
            {tours === undefined && (
              <div className="text-center py-12 text-gray-400">
                Loading tours...
              </div>
            )}

            {/* Empty State */}
            {tours && tours.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="mb-4">
                  No tours yet. Create your first tour to get started!
                </p>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                >
                  Create Your First Tour
                </button>
              </div>
            )}

            {/* Desktop Table View */}
            {tours && tours.length > 0 && (
              <div className="hidden md:block bg-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 bg-gray-900">
                    <tr>
                      <th className="text-left px-6 py-3">Tour Name</th>
                      <th>Status</th>
                      <th>Steps</th>
                      <th>Updated</th>
                      <th className="text-right px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map((tour) => (
                      <tr key={tour._id} className="border-t border-gray-700">
                        <td className="px-6 py-4">{tour.name}</td>
                        <td>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              tour.published ? "bg-green-600" : "bg-gray-500"
                            }`}
                          >
                            {tour.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="text-center">{tour.steps.length}</td>
                        <td className="text-gray-400 text-center">
                          {formatDate(tour.updatedAt)}
                        </td>
                        <td className="px-6 text-right space-x-4">
                          <span
                            onClick={() => editTour(tour._id)}
                            className="cursor-pointer text-purple-400 hover:underline"
                          >
                            Edit
                          </span>
                          <button
                            onClick={() => deleteTour(tour._id, tour.name)}
                            disabled={deletingTourId === tour._id}
                            className="cursor-pointer text-gray-400 hover:text-red-400 disabled:opacity-50 flex items-center gap-1"
                          >
                            {deletingTourId === tour._id ? (
                              <>
                                <LoadingSpinner size="sm" className="border-gray-400 border-r-transparent" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Mobile Card View */}
            {tours && tours.length > 0 && (
              <div className="md:hidden space-y-4">
                {tours.map((tour) => (
                  <div key={tour._id} className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-base">{tour.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tour.published ? "bg-green-600" : "bg-gray-500"
                        }`}
                      >
                        {tour.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
                      <div>
                        <span className="block text-gray-500">Steps</span>
                        <span className="text-white">{tour.steps.length}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Updated</span>
                        <span className="text-white">
                          {formatDate(tour.updatedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span
                        onClick={() => editTour(tour._id)}
                        className="cursor-pointer text-purple-400 font-medium"
                      >
                        Edit
                      </span>
                      <button
                        onClick={() => deleteTour(tour._id, tour.name)}
                        disabled={deletingTourId === tour._id}
                        className="cursor-pointer text-gray-400 hover:text-red-400 disabled:opacity-50 flex items-center gap-1"
                      >
                        {deletingTourId === tour._id ? (
                          <>
                            <LoadingSpinner size="sm" className="border-gray-400 border-r-transparent" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                disabled={!tourName.trim() || isCreating}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 disabled:opacity-50 flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
