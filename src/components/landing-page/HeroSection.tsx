"use client";

import Button from "../shared/button";
import "../../app/globals.css";
import { CSSProperties } from "react";

export default function HeroSection() {
  const containerStyle: CSSProperties = {
    borderRadius: "var(--radius-xl)",
    backgroundColor: "var(--background-dark)",
  };

  const linearGradientStyle: CSSProperties = {
    background: `linear-gradient(to bottom right, var(--background-dark), var(--primary-33), var(--background-dark))`,
  };

  const radialGradientStyle: CSSProperties = {
    background: `radial-gradient(circle at top, rgba(89,13,242,0.3), transparent 40%)`,
  };

  const browserWindowStyle: CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: "var(--radius-xl)",
    boxShadow: "0 25px 50px -12px var(--primary-33)",
  };

  const tooltipStyle: CSSProperties = {
    backgroundColor: "var(--background-dark)",
    borderColor: "rgba(255,255,255,0.2)",
  };

  const tooltipArrowStyle: CSSProperties = {
    backgroundColor: "var(--background-dark)",
    borderLeft: "1px solid rgba(255,255,255,0.2)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    transform: "translateY(-50%) rotate(45deg)",
  };

  const nextButtonStyle: CSSProperties = {
    backgroundColor: "var(--primary)",
  };

  return (
    <div className="px-4">
      <div
        className="flex min-h-[480px] flex-col gap-6 items-center justify-center text-center p-4 relative overflow-hidden"
        style={containerStyle}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0" style={linearGradientStyle}></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={radialGradientStyle}
        ></div>

        {/* Content */}
        <div className="flex flex-col gap-4 z-20">
          <h1
            className="text-white"
            style={{
              fontSize: "4rem",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.033em",
            }}
          >
            Build Onboarding That Clicks
          </h1>
          <p
            className="text-white/80 max-w-2xl mx-auto"
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Create beautiful, embeddable onboarding tours for your users in
            minutes with our powerful no-code platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center z-20">
          <Button variant="primary" size="lg">
            Start for Free
          </Button>
          <Button variant="secondary" size="lg">
            See Demo
          </Button>
        </div>

        {/* Mockup Browser Window */}
        <div className="relative mt-8 w-full max-w-3xl aspect-video z-20">
          <div
            className="absolute inset-0 rounded-xl border shadow-2xl backdrop-blur-md"
            style={browserWindowStyle}
          >
            {/* Browser Header */}
            <div className="h-10 bg-white/5 border-b flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>

            {/* Browser Content */}
            <div className="p-6 relative">
              <div className="w-2/3 h-6 bg-white/10 rounded"></div>
              <div className="w-1/2 h-4 bg-white/10 rounded mt-4"></div>

              {/* Tour Tooltip */}
              <div
                className="absolute top-12 right-12 p-4 rounded-lg shadow-lg border w-56"
                style={tooltipStyle}
              >
                <p className="text-white font-bold text-sm">
                  Welcome to your dashboard!
                </p>
                <p className="text-white/70 text-xs mt-1">
                  Click here to get started with a quick tour.
                </p>
                <div className="flex justify-end mt-3">
                  <button
                    className="px-3 py-1 text-white text-xs rounded font-semibold"
                    style={nextButtonStyle}
                  >
                    Next
                  </button>
                </div>
                {/* Tooltip Arrow */}
                <div
                  className="absolute -left-2 top-1/2 w-4 h-4 rotate-45"
                  style={tooltipArrowStyle}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
