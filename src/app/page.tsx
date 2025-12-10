"use client";

import { useEffect } from "react";
import PageWrapper from "@/src/components/shared/PageWrapper";
import HeroSection from "@/src/components/landing-page/HeroSection";
import HowItWorks from "@/src/components/landing-page/HowItWorks";
import Features from "@/src/components/landing-page/Features";
// import DemoSection from "@//src/components/landing-page/DemoSection";
import CTA from "../components/shared/CTA";

export default function LandingPage() {
  useEffect(() => {
    // Load tour config from Convex
    fetch("https://colorless-poodle-381.convex.cloud/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "public:getTourByScriptId",
        args: { scriptId: "tour_a0ynp7xt7lprekvz1e9ri" },
        format: "json",
      }),
    })
      .then((res) => res.json())
      .then((tourConfig) => {
        // Load the widget script

        console.log(tourConfig);
        const script = document.createElement("script");
        script.src = "https://timely-kheer-6c719b.netlify.app/onboardly.js";
        script.onload = function () {
          if ((window as any).TourWidget) {
            (window as any).TourWidget.initWithConfig(tourConfig.value);
          }
        };
        document.head.appendChild(script);
      })
      .catch((err) => console.error("Failed to load tour:", err));
  }, []);

  return (
    <PageWrapper>
      <main className="flex flex-col gap-16 md:gap-24 py-16 md:py-24">
        <HeroSection />
        <HowItWorks />
        <Features />
        {/* <DemoSection /> */}
        <CTA />
      </main>
    </PageWrapper>
  );
}
