import React from "react";
import {
  FaPaintBrush,
  FaChartLine,
  FaPalette,
  FaUsers,
  FaGlobe,
  FaPuzzlePiece,
} from "react-icons/fa";

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

const FeaturesSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 text-center">
        All The Features You Need
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {featuresData.map((feature) => (
          <div
            key={feature.title}
            className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center gap-3"
          >
            <div className="text-primary">{feature.icon}</div>
            <h3 className="text-white text-lg font-bold mt-3">
              {feature.title}
            </h3>
            <p className="text-white/70 text-sm mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
