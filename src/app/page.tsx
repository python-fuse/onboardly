"use client";

import { useEffect } from "react";
import PageWrapper from "@/src/components/shared/PageWrapper";
import HeroSection from "@/src/components/landing-page/HeroSection";
import HowItWorks from "@/src/components/landing-page/HowItWorks";
import Features from "@/src/components/landing-page/Features";
// import DemoSection from "@//src/components/landing-page/DemoSection";
import CTA from "../components/shared/CTA";

export default function LandingPage() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://timely-kheer-6c719b.netlify.app/onboardly.js";
  //   script.onload = function () {
  //     if ((window as any).TourWidget) {
  //       console.log("Tour Widget loaded, initializing...");
  //       // Pass the scriptId (not tourId) - get this from dashboard after publishing
  //       (window as any).TourWidget.init("tour_a0ynp7xt7lprekvz1e9ri"); // TODO: Replace with real scriptId from published tour
  //     }
  //   };
  //   document.head.appendChild(script);
  // }, []);

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
