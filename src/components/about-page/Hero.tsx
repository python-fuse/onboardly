"use client";
import Image from "next/image";
import Button from "../shared/button";

export default function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col justify-center px-5 py-6">
      <div className="max-w-[1200px] mx-auto w-full">

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-6 flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 w-fit mx-auto lg:mx-0">
              <span className="text-xs font-medium uppercase tracking-wide">
                Company Vision
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
              Building the Future of{" "}
              <span className="bg-linear-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">User Onboarding</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
              We believe every user deserves a smooth, guided experience from day one.
              We&lsquo;re replacing clunky manuals with interactive, intelligent walkthroughs.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button variant="secondary" size="md">
                Watch Demo
              </Button>

              <Button variant="primary" size="md">
                Read our Documentation
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full max-w-md rounded-4xl border border-white/20 overflow-hidden shadow-xl p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/about/about-imagee.jpg"
              alt="Hero"
              width={800}
              height={600}
              className="object-cover w-full lg:h-[400px] rounded-4xl"
              priority
            />
          </div>


        </div>

      </div>
    </section>
  );
}
