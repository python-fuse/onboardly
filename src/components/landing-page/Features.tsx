"use client"; // REQUIRED for Framer Motion

import React from "react";
import {
  FaPaintBrush,
  FaChartLine,
  FaPalette,
  FaUsers,
  FaGlobe,
  FaPuzzlePiece,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";

const featuresData = [
  {
    icon: <FaPaintBrush size={28} />,
    title: "No-Code Editor",
    description:
      "Build and edit tours with a powerful, intuitive visual editor.",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Powerful Analytics",
    description: "Understand user behavior and tour completion rates.",
  },
  {
    icon: <FaPalette size={28} />,
    title: "Custom Styling",
    description:
      "Match the look and feel of your brand with extensive CSS control.",
  },
  {
    icon: <FaUsers size={28} />,
    title: "User Segmentation",
    description:
      "Target specific user segments with tailored onboarding flows.",
  },
  {
    icon: <FaGlobe size={28} />,
    title: "Multi-language Support",
    description: "Provide onboarding in your users' native languages.",
  },
  {
    icon: <FaPuzzlePiece size={28} />,
    title: "Seamless Integration",
    description: "Works with any web application or framework.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
    },
  },
};

const FeaturesSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className=" flex flex-col gap-8"
    >
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 text-center">
        All The Features You Need
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        variants={container}
      >
        {featuresData.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(89, 13, 242, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 400 }}
            className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center gap-3"
          >
            <div className="text-primary">{feature.icon}</div>
            <h3 className="text-white text-lg font-bold mt-3">
              {feature.title}
            </h3>
            <p className="text-white/70 text-sm mt-1">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
