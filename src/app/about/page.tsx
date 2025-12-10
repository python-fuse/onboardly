import PageWrapper from "@/src/components/shared/PageWrapper";
import HeroSection from "@/src/components/about-page/Hero";
import CTA from "@/src/components/shared/CTA"
import MissionStats from "@/src/components/about-page/MissionStats";
import CorePrinciples from "@/src/components/about-page/CorePrinciple";

export default function LandingPage() {
  return (
    <PageWrapper>
      <main className="flex flex-col gap-16 md:gap-24 py-16 md:py-24">
        <HeroSection />
        <MissionStats />
        <CorePrinciples />
        <CTA />
      </main>
    </PageWrapper>
  );
}
