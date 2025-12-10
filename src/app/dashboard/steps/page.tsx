"use client";

import React from "react";

export default function StepsManager() {
  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">Steps Manager</h1>
            <p className="text-gray-300 mb-10">
              Editing steps for &apos;New User Onboarding&apos;
            </p>
          </div>

          <button
            className="
    px-1 py-2 
    rounded-full 
    bg-gray-800 
    text-gray-300 
    text-sm 
    border border-gray-700 
    hover:bg-gray-700 
    transition
  "
          >
            Back to Tours
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Existing Steps */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Existing Steps</h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Welcome Modal",
                  desc: "This is the first step of the tour.",
                },
                {
                  step: 2,
                  title: "Click the dashboard button",
                  desc: "Guide users to the main dashboard.",
                },
                {
                  step: 3,
                  title: "Feature Introduction",
                  desc: "Highlight the key feature on this page.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#1C142D] rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="bg-[#590df2] text-white rounded-md px-3 py-1 text-sm font-medium">
                    Step {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Steps */}
          <div className="bg-[#1C142D] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">Add New Steps</h2>

            {[1, 2].map((i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-xl p-4 mb-6 space-y-3"
              >
                <input
                  className="w-full bg-gray-900 p-2 rounded-lg text-sm"
                  placeholder="Enter a descriptive title"
                />
                <input
                  className="w-full bg-gray-900 p-2 rounded-lg text-sm"
                  placeholder="e.g., #save-button or .nav-link"
                />
                <textarea
                  className="w-full bg-gray-900 p-2 rounded-lg text-sm"
                  placeholder="Explain what this step does..."
                />
              </div>
            ))}

            <button className="w-full border border-gray-600 rounded-lg py-2 text-gray-300 mb-4">
              + Add Another Step
            </button>

            <button className="w-full bg-[#590df2] py-3 rounded-lg font-semibold">
              Save All Steps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
