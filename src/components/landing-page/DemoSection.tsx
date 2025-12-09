"use client";

import Button from "../shared/button";
import { motion, Variants, Transition } from "framer-motion";

export default function DemoSection() {
  const handleLaunchDemo = () => {
    alert("Demo tour would launch here! 🚀");
    // Later you'll integrate the actual embeddable widget here
  };

  const revealTween: Transition = {
    duration: 0.6,
    type: "tween",
  };

  const ctaSpring: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...revealTween,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: revealTween },
  };

  const buttonHover: Variants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 15px rgba(89, 13, 242, 0.5)" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="flex flex-col gap-8 items-center text-center px-4"
      id="demo"
    >
      <motion.h2
        variants={itemVariants}
        className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]"
      >
        Try The Live Demo
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-white/80 text-base md:text-lg font-normal leading-normal max-w-2xl"
      >
        Interact with a live Guidely tour right here. Click the button below to
        see how it works on a sample interface.
      </motion.p>

      {/* Demo Box */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-3xl p-8 bg-white/5 rounded-xl border border-white/10"
      >
        <p className="text-white/90">This is a sample application area.</p>
        <p className="text-white/70 text-sm mt-2">
          Our widget can attach to any element here.
        </p>

        <motion.div
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          transition={ctaSpring}
          className="mt-6 mx-auto flex items-center justify-center"
        >
          <Button variant="primary" size="lg" onClick={handleLaunchDemo}>
            Launch Demo Tour
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
