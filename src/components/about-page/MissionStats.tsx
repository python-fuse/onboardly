"use client";
import { Globe, Users, Cpu, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { icon: Globe, value: "100K+", label: "Users Guided Daily", delay: 0 },
  { icon: Users, value: "99.9%", label: "System Uptime", delay: 0.1, offsetTop: true },
  { icon: Cpu, value: "500+", label: "Enterprise Customers", delay: 0.2 },
  { icon: Heart, value: "4.9/5", label: "Average User Rating", delay: 0.3, special: true, offsetTop: true },
];

export default function MissionStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-2 px-5" ref={ref}>
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT TEXT */}
        <motion.div 
          className="flex flex-col gap-4 lg:text-left text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 w-fit mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xs font-medium uppercase tracking-wide">
              Company Mission
            </span>
          </motion.div>

          <motion.h2 
            className="text-white pb-4 text-3xl md:text-4xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white">
              Democratize seamless product adoption for SaaS.
            </span>
          </motion.h2>

          <motion.div 
            className="lg:w-20 h-1 bg-[linear-gradient(135deg,#3B82F6_0%,#8B5CF6_100%)] rounded-full mx-auto lg:mx-0"
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.p 
            className="text-gray-300 pt-4 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Software is becoming more powerful, but also more complex.
            We bridge the gap between feature-rich products and the humans who use them.
            By making onboarding intuitive, we help businesses grow and users succeed.
          </motion.p>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className={`text-center lg:text-left p-6 rounded-xl flex flex-col items-center lg:items-start gap-2
                  bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-300
                  hover:-translate-y-1 hover:bg-white/6 hover:border-purple-500/30
                  hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)] 
                  ${stat.offsetTop ? 'sm:mt-8' : ''}
                  ${stat.special ? 'bg-gradient-electric border-none text-white' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -10, scale: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                >
                  <Icon size={24} />
                </motion.div>
                <motion.h3 
                  className={`text-3xl pt-2 font-bold ${stat.special ? '' : 'text-white'}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.3 }}
                >
                  {stat.value}
                </motion.h3>
                <motion.p 
                  className={`text-sm ${stat.special ? 'text-white/80' : 'text-gray-400'}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.4 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}