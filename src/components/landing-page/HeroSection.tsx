"use client";

import Button from "../shared/button";
import { CSSProperties } from "react";
import { motion, Variants, Transition } from "framer-motion";

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

  const defaultSpring: Transition = {
    type: "spring",
    stiffness: 100,
  };

  const ctaSpring: Transition = {
    type: "spring",
    stiffness: 100,
    mass: 0.5,
  };

  const mockupTween: Transition = {
    delay: 0.6,
    duration: 0.8,
    type: "tween",
  };

  const tooltipPhysics: Transition = {
    delay: 1.4,
    duration: 0.5,
    type: "spring",
    stiffness: 150,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: defaultSpring },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: ctaSpring },
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.3)" },
    tap: { scale: 0.95 },
  };

  const mockupVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: mockupTween },
  };

  const tooltipEntrance: Variants = {
    initial: { opacity: 0, x: 20, rotate: 5, scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: tooltipPhysics,
    },
  };

  return (
    <div className="px-4">
      <div
        className="flex min-h-[480px] flex-col gap-6 items-center justify-center text-center p-8 sm:p-12 relative overflow-hidden"
        style={containerStyle}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0" style={linearGradientStyle}></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={radialGradientStyle}
        ></div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-4 z-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-[4rem] leading-tight tracking-[-0.033em]"
          >
            Build Onboarding That Clicks
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Create beautiful, embeddable onboarding tours for your users in
            minutes with our powerful no-code platform.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center z-20">
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="primary" size="lg">
              Start for Free
            </Button>
          </motion.div>
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="secondary" size="lg">
              See Demo
            </Button>
          </motion.div>
        </div>

        {/* Mockup Browser Window */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="show"
          className="relative mt-8 w-full max-w-3xl aspect-video z-20 px-4 sm:px-0"
        >
          <div
            className="absolute inset-0 rounded-xl border shadow-2xl backdrop-blur-md"
            style={browserWindowStyle}
          >
            {/* Browser Header */}
            <div className="h-8 sm:h-10 bg-white/5 border-b flex items-center px-4 gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
            </div>

            {/* Browser Content */}
            <div className="p-4 sm:p-6 relative">
              <div className="w-2/3 h-4 sm:h-6 bg-white/10 rounded"></div>
              <div className="w-1/2 h-3 sm:h-4 bg-white/10 rounded mt-4"></div>

              {/* Tour Tooltip */}
              <motion.div
                variants={tooltipEntrance}
                initial="initial"
                animate="animate"
                className="absolute top-6 right-4 p-3 sm:top-12 sm:right-12 sm:p-4 rounded-lg shadow-lg border w-48 sm:w-56"
                style={tooltipStyle}
              >
                <p className="text-white font-bold text-xs sm:text-sm">
                  Welcome to your dashboard!
                </p>
                <p className="text-white/70 text-xs mt-1 hidden sm:block">
                  Click here to get started with a quick tour.
                </p>
                <div className="flex justify-end mt-2 sm:mt-3">
                  <button
                    className="px-2 py-1 sm:px-3 text-white text-xs rounded font-semibold"
                    style={nextButtonStyle}
                  >
                    Next
                  </button>
                </div>
                {/* Tooltip Arrow */}
                <div
                  className="absolute -left-2 top-1/2 w-3 h-3 sm:w-4 sm:h-4 rotate-45"
                  style={tooltipArrowStyle}
                ></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
