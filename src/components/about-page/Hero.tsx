"use client";
import Image from "next/image";
import Button from "../shared/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col justify-center px-5 py-6">
      <div className="max-w-[1200px] mx-auto w-full">

        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">

          {/* LEFT */}
          <motion.div 
            className="flex flex-col gap-6 flex-1 text-center lg:text-left z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 w-fit mx-auto lg:mx-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs font-medium uppercase tracking-wide">
                Company Vision
              </span>
            </motion.div>

            <motion.h1 
              className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Building the Future of{" "}
              <span className="bg-linear-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">User Onboarding</span>
            </motion.h1>

            <motion.p 
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We believe every user deserves a smooth, guided experience from day one.
              We&lsquo;re replacing clunky manuals with interactive, intelligent walkthroughs.
            </motion.p>

            {/* BUTTONS */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button variant="secondary" size="md">
                Watch Demo
              </Button>

              <Button variant="primary" size="md" href="/documentation">
                Read our Documentation
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div 
            className="relative w-full max-w-md rounded-4xl border border-white/20 overflow-hidden shadow-xl p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500"
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <Image
              src="/about/about-imagee.jpg"
              alt="Hero"
              width={800}
              height={600}
              className="object-cover w-full lg:h-[400px] rounded-4xl"
              priority
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}