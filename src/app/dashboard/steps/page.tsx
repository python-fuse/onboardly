"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type StepFormData = {
  id: string;
  targetSelector: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  action?: "click" | "hover" | "focus" | "none";
};

function StepsManagerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourIdParam = searchParams.get("tourId");
  const editStepId = searchParams.get("editStep");
  const tourId = tourIdParam as Id<"tours"> | null;

  const tour = useQuery(api.tours.getTour, tourId ? { tourId } : "skip");

  const updateTourMutation = useMutation(api.tours.updateTour);

  // Form state for adding a new step
  const [newStep, setNewStep] = useState<StepFormData>({
    id: `step_${Date.now()}`,
    targetSelector: "",
    title: "",
    content: "",
    placement: "bottom",
    action: "none",
  });

  const handleAddStep = async () => {
    if (!tourId || !tour) return;

    if (!newStep.title || !newStep.targetSelector || !newStep.content) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const updatedSteps = [...tour.steps, newStep];
      await updateTourMutation({
        tourId,
        steps: updatedSteps,
      });

      // Reset form
      setNewStep({
        id: `step_${Date.now()}`,
        targetSelector: "",
        title: "",
        content: "",
        placement: "bottom",
        action: "none",
      });

      alert("Step added successfully!");
    } catch (error) {
      console.error("Failed to add step:", error);
      alert("Failed to add step. Please try again.");
    }
  };

  const handleDeleteStep = async (stepId: string) => {
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
      alert("Failed to delete step. Please try again.");
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
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Manage Steps
            </h1>
            <p className="text-gray-300">
              Editing steps for &apos;{tour.name}&apos;
            </p>
          </div>

          <button
            onClick={() => router.push(`/dashboard/edittour?id=${tourId}`)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm border border-gray-700 hover:bg-gray-700 transition"
          >
            ← Back to Tour
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Existing Steps */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Existing Steps ({tour.steps.length})
            </h2>
            {tour.steps.length === 0 ? (
              <div className="bg-[#1C142D] rounded-xl p-8 text-center">
                <p className="text-gray-400">
                  No steps added yet. Add your first step using the form on the
                  right.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tour.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="bg-[#1C142D] rounded-xl p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#590df2] text-white rounded-md px-3 py-1 text-sm font-medium shrink-0">
                        Step {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {step.content}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-gray-800 px-2 py-1 rounded">
                            {step.targetSelector}
                          </span>
                          {step.placement && (
                            <span className="bg-gray-800 px-2 py-1 rounded">
                              {step.placement}
                            </span>
                          )}
                          {step.action && step.action !== "none" && (
                            <span className="bg-gray-800 px-2 py-1 rounded">
                              {step.action}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeleteStep(step.id)}
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

          {/* Add New Step Form */}
          <div className="bg-[#1C142D] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">Add New Step</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Step Title <span className="text-red-400">*</span>
                </label>
                <input
                  className="w-full bg-gray-900 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="e.g., Welcome to Dashboard"
                  value={newStep.title}
                  onChange={(e) =>
                    setNewStep({ ...newStep, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Selector <span className="text-red-400">*</span>
                </label>
                <input
                  className="w-full bg-gray-900 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="e.g., #save-button or .nav-link"
                  value={newStep.targetSelector}
                  onChange={(e) =>
                    setNewStep({ ...newStep, targetSelector: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  CSS selector for the element to highlight
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Step Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  className="w-full bg-gray-900 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
                  placeholder="Explain what this step does..."
                  value={newStep.content}
                  onChange={(e) =>
                    setNewStep({ ...newStep, content: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tooltip Placement
                </label>
                <select
                  className="w-full bg-gray-900 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={newStep.placement}
                  onChange={(e) =>
                    setNewStep({
                      ...newStep,
                      placement: e.target.value as any,
                    })
                  }
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interaction Type
                </label>
                <select
                  className="w-full bg-gray-900 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={newStep.action}
                  onChange={(e) =>
                    setNewStep({
                      ...newStep,
                      action: e.target.value as any,
                    })
                  }
                >
                  <option value="none">None</option>
                  <option value="click">Click</option>
                  <option value="hover">Hover</option>
                  <option value="focus">Focus</option>
                </select>
              </div>

              <button
                onClick={handleAddStep}
                className="w-full bg-[#590df2] py-3 rounded-lg font-semibold hover:bg-[#4a0bd0] transition"
              >
                Add Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StepsManager() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#0d0b14] text-white">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="text-gray-400">Loading steps...</p>
          </div>
        </div>
      }
    >
      <StepsManagerContent />
    </Suspense>
  );
}
