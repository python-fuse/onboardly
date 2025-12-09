'use client';

import { Accessibility, Code, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ValueCard {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  badgeBorderColor: string;
  checkColor: string;
  title: string;
  description: string;
  features: string[];
}

const valueCards: ValueCard[] = [
  {
    id: 1,
    icon: Accessibility,
    badge: 'Empathy First',
    borderColor: 'border-t-[#3B82F6]',
    iconBgColor: 'bg-[#3B82F6]/20',
    iconColor: 'text-[#3B82F6]',
    badgeBgColor: 'bg-[#3B82F6]/20',
    badgeTextColor: 'text-[#3B82F6]',
    badgeBorderColor: 'border-[#3B82F6]/20',
    checkColor: 'text-[#3B82F6]',
    title: 'User-Centricity',
    description: "We don't just build features; we build pathways. Every decision starts with the question: \"Does this make the user's life easier?\"",
    features: [
      'Designing for human needs',
    ]
  },
  {
    id: 2,
    icon: Code,
    badge: 'Tech Stack',
    borderColor: 'border-t-[#8B5CF6]',
    iconBgColor: 'bg-[#8B5CF6]/20',
    iconColor: 'text-[#8B5CF6]',
    badgeBgColor: 'bg-[#8B5CF6]/20',
    badgeTextColor: 'text-[#8B5CF6]',
    badgeBorderColor: 'border-[#8B5CF6]/20',
    checkColor: 'text-[#8B5CF6]',
    title: 'Developer Experience',
    description: 'Great tools should be a joy to implement. We obsess over our SDKs, documentation, and API design so developers can ship faster.',
    features: [
      'Robust type definitions'
    ]
  },
  {
    id: 3,
    icon: ShieldCheck,
    badge: 'Trust',
    borderColor: 'border-t-pink-500',
    iconBgColor: 'bg-pink-500/20',
    iconColor: 'text-pink-500',
    badgeBgColor: 'bg-pink-500/20',
    badgeTextColor: 'text-pink-500',
    badgeBorderColor: 'border-pink-500/20',
    checkColor: 'text-pink-500',
    title: 'Data Privacy',
    description: "Your users' data is sacred. We enforce the strictest security standards and encryption protocols to ensure complete safety.",
    features: [
      'GDPR Compliant'
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + (index * 0.1),
      duration: 0.4,
      ease: "easeOut" as const
    }
  })
};

export default function CorePrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative py-20 px-5" ref={ref}>
      <motion.div 
        className="flex flex-col max-w-[1200px] mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headingVariants}
        >
          <motion.h2 
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            variants={headingVariants}
          >
            Our Core Principles
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
            variants={headingVariants}
          >
            The values that drive our product decisions, engineering practices, and customer relationships every single day.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueCards.map((card, cardIndex) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full border-t-4 ${card.borderColor} hover:bg-white/10 transition-colors duration-300`}
              >
                {/* Icon and Badge */}
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    className={`p-3 rounded-lg ${card.iconBgColor} ${card.iconColor}`}
                    variants={iconVariants}
                  >
                    <IconComponent size={32} />
                  </motion.div>
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${card.badgeBgColor} ${card.badgeTextColor} border ${card.badgeBorderColor}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.3 + (cardIndex * 0.2), duration: 0.4, type: "spring" }}
                  >
                    {card.badge}
                  </motion.span>
                </div>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.35 + (cardIndex * 0.2), duration: 0.5 }}
                >
                  {card.title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-gray-400 text-sm leading-relaxed mb-8 grow"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 + (cardIndex * 0.2), duration: 0.5 }}
                >
                  {card.description}
                </motion.p>

                {/* Features */}
                <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                  {card.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex gap-3 text-sm text-gray-300"
                      custom={featureIndex}
                      variants={featureVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    >
                      <Check size={20} className={card.checkColor} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}