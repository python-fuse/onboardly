"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Button from "../shared/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = () => {
    router.push(isSignedIn ? "/dashboard" : "/signup");
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div
        className="
          flex flex-col isolate items-center justify-center 
          min-h-[410px] py-16 relative 
          rounded-4xl overflow-hidden text-center
          w-full max-w-5xl px-4 bg-white/5 border border-white/10 backdrop-blur-sm
        "
      >
        <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#1e293b]/80 px-4 py-1.5 text-xs font-medium text-[#3B82F6] backdrop-blur-md shadow-lg ring-1 ring-white/5">
          {isSignedIn ? "Welcome back" : "Start your journey"}
        </div>
        <div className="flex flex-col gap-6 items-center">
          <h3 className="max-w-[720px] text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
            {isSignedIn ? (
              <>
                Ready to Create <br className="hidden md:block" />
                <span className="bg-linear-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  Your First Tour?
                </span>
              </>
            ) : (
              <>
                Ready to Transform <br className="hidden md:block" />
                <span className="bg-linear-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  Your Onboarding?
                </span>
              </>
            )}
          </h3>
          <p className="max-w-2xl text-lg font-medium text-slate-300 md:text-xl leading-relaxed">
            {isSignedIn
              ? "Access your dashboard and start building interactive product tours in minutes."
              : "Join hundreds of teams creating better user experiences. Embed powerful tours in minutes, not months."}
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-3 w-full">
          <Button
            onClick={handleClick}
            className="group relative flex h-14 w-full max-w-xs items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-electric-blue to-vibrant-purple p-px shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] transition-all duration-300 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.6)] hover:scale-[1.02]"
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-r from-electric-blue to-vibrant-purple px-8 text-lg font-bold text-white transition-all group-hover:bg-opacity-90">
              {isSignedIn ? "Go to Dashboard" : "Get Started For Free"}
              <ArrowRight size={20} />
            </div>
          </Button>
        </div>

        {!isSignedIn && (
          <div className="mt-3 w-full">
            <span className="relative px-8 text-sm text-slate-300 transition-all">
              No credit card required
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CTA;
