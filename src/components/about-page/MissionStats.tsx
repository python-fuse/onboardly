import { Globe, Users, Cpu, Heart } from "lucide-react";

export default function MissionStats() {
  return (
    <section className="relative py-2 px-5">
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT TEXT */}
        <div className="flex flex-col gap-4 lg:text-left text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 w-fit mx-auto lg:mx-0">
            <span className="text-xs font-medium uppercase tracking-wide">
              Company Mission
            </span>
          </div>
          <h2 className="text-white pb-4 text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-white">
              Democratize seamless product adoption for SaaS.
            </span>
          </h2>

          <div className="lg:w-20 h-1 bg-[linear-gradient(135deg,#3B82F6_0%,#8B5CF6_100%)] rounded-full mx-auto lg:mx-0" />

          <p className="text-gray-300 pt-4 text-lg leading-relaxed">
            Software is becoming more powerful, but also more complex.
            We bridge the gap between feature-rich products and the humans who use them.
            By making onboarding intuitive, we help businesses grow and users succeed.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stat 1 */}
          <div className="text-center lg:text-left p-6 rounded-xl flex flex-col items-center lg:items-start gap-2
            bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-300
            hover:-translate-y-1 hover:bg-white/6 hover:border-purple-500/30
            hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)]">
            <Globe size={24} />
            <h3 className="text-white text-3xl pt-2 font-bold">100K+</h3>
            <p className="text-gray-400 text-sm">Users Guided Daily</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center lg:text-left p-6 rounded-xl flex flex-col items-center lg:items-start gap-2
            bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-300
            hover:-translate-y-1 hover:bg-white/6 hover:border-purple-500/30
            hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)] sm:mt-8">
            <Users size={24} />
            <h3 className="text-white text-3xl pt-2 font-bold">99.9%</h3>
            <p className="text-gray-400 text-sm">System Uptime</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center lg:text-left p-6 rounded-xl flex flex-col items-center lg:items-start gap-2
            bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-300
            hover:-translate-y-1 hover:bg-white/6 hover:border-purple-500/30
            hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)]">
            <Cpu />
            <h3 className="text-white text-3xl pt-2 font-bold">500+</h3>
            <p className="text-gray-400 text-sm">Enterprise Customers</p>
          </div>

          {/* Stat 4 */}
          <div className="text-center lg:text-left p-6 rounded-xl flex flex-col items-center lg:items-start gap-2
            bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-300
            hover:-translate-y-1 hover:bg-white/6 hover:border-purple-500/30
            hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)] sm:mt-8 bg-gradient-electric border-none text-white">
            <Heart />
            <h3 className="text-3xl pt-2 font-bold">4.9/5</h3>
            <p className="text-white/80 text-sm">Average User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}