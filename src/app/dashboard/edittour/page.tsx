"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

function EditTourContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourIdParam = searchParams.get("id");
  const tourId = tourIdParam as Id<"tours"> | null;

  const [tourName, setTourName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch tour data
  const tour = useQuery(api.tours.getTour, tourId ? { tourId } : "skip");

  const updateTourMutation = useMutation(api.tours.updateTour);
  const publishTourMutation = useMutation(api.tours.publishTour);

  // Initialize tour name when data loads
  useEffect(() => {
    if (tour) {
      setTourName(tour.name);
    }
  }, [tour]);

  const handleSave = async () => {
    if (!tourId || !tour) return;

    try {
      await updateTourMutation({
        tourId,
        name: tourName,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save tour:", error);
    }
  };

  const handlePublish = async () => {
    if (!tourId) return;

    if (tour && tour.steps.length === 0) {
      return;
    }

    try {
      const scriptId = await publishTourMutation({ tourId });
      router.push(`/dashboard/embed?scriptId=${scriptId}`);
    } catch (error) {
      console.error("Failed to publish tour:", error);
    }
  };

  const deleteStep = async (stepId: string) => {
    if (!tourId || !tour) return;

    if (!confirm("Are you sure you want to delete this step?")) return;

    try {
      const updatedSteps = tour.steps.filter((s) => s.id !== stepId);
      await updateTourMutation({
        tourId,
        steps: updatedSteps,
      });
    } catch (error) {
      console.error("Failed to delete step:", error);
    }
  };

  if (!tourId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Invalid tour ID</p>
          <button
            onClick={() => router.push("/dashboard/managetour")}
            className="text-purple-400 hover:underline"
          >
            Go back to tours
          </button>
        </div>
      </div>
    );
  }

  if (tour === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (tour === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Tour not found</p>
          <button
            onClick={() => router.push("/dashboard/managetour")}
            className="text-purple-400 hover:underline"
          >
            Go back to tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-auto min-h-screen w-full flex-col font-display bg-[#0d0b14] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-white/10 bg-[#0d0b14] px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="size-6 text-primary">
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" />
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764Z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            Guidely
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/dashboard/managetour")}
            className="h-10 min-w-[84px] px-4 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="h-10 min-w-[84px] px-4 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <button
            onClick={handlePublish}
            className="h-10 min-w-[84px] px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90"
          >
            {tour.published ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-full grow flex-col">
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            {/* Breadcrumb */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white">
                <a
                  className="text-base text-white/70 hover:text-primary"
                  href="#"
                >
                  Tours
                </a>
                <span className="text-white/40">/</span>
                alert(
                <span className="text-base text-white">{tourName}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Edit Tour
              </h1>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-8">
              {/* Tour Name Input */}
              <label className="flex flex-col">
                <p className="pb-2 text-base text-white/80 font-medium">
                  Tour Name
                </p>
                <input
                  className="h-14 w-full rounded-lg border border-white/20 bg-[#1a1625] p-4 text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g. New User Onboarding"
                  value={tourName}
                  onChange={(e) => {
                    setTourName(e.target.value);
                    setHasChanges(true);
                  }}
                />
              </label>

              {/* Steps */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Steps ({tour.steps.length})
                  </h2>

                  <button
                    onClick={() =>
                      router.push(`/dashboard/steps?tourId=${tourId}`)
                    }
                    className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-white font-bold hover:bg-primary/90"
                  >
                    <span className="text-lg">+</span>
                    Add Step
                  </button>
                </div>

                {tour.steps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/20 rounded-xl">
                    <p className="text-white/60 mb-4">
                      No steps yet. Add your first step to get started.
                    </p>
                    <button
                      onClick={() =>
                        router.push(`/dashboard/steps?tourId=${tourId}`)
                      }
                      className="bg-primary px-6 py-2 rounded-lg text-white font-semibold hover:bg-primary/90"
                    >
                      Add First Step
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-white/10 rounded-xl border border-white/10 bg-[#1a1625] shadow-sm">
                    {tour.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="group flex items-center gap-4 p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary font-bold">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <p className="text-white font-medium">{step.title}</p>
                          <p className="text-white/60 text-sm">
                            {step.targetSelector}
                          </p>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              router.push(
                                `/dashboard/steps?tourId=${tourId}&editStep=${step.id}`
                              )
                            }
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteStep(step.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EditTour() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#0d0b14] text-white">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="text-gray-400">Loading tour...</p>
          </div>
        </div>
      }
    >
      <EditTourContent />
    </Suspense>
  );
}
