import HeroSection from "@/src/components/landing-page/HeroSection";
import HowItWorks from "@/src/components/landing-page/HowItWorks";
import Features from "@/src/components/landing-page/Features";
import DemoSection from "@//src/components/landing-page/DemoSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-16 md:gap-24 py-16 md:py-24">
      <HeroSection />
      <HowItWorks />
      <Features />
      <DemoSection />
    </main>
  );
}
