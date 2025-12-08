import React from "react";
import { FaCode, FaEdit, FaRocket } from "react-icons/fa";

const HowItWorks: React.FC = () => {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <FaCode size={24} />
          </div>
          <h3 className="text-white text-lg font-bold">1. Integrate Script</h3>
          <p className="text-white/70 text-sm">
            Just copy and paste a single line of code into your application.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <FaEdit size={24} />
          </div>
          <h3 className="text-white text-lg font-bold">2. Build Visually</h3>
          <p className="text-white/70 text-sm">
            Use our intuitive no-code editor to create your onboarding tours.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <FaRocket size={24} />
          </div>
          <h3 className="text-white text-lg font-bold">3. Launch to Users</h3>
          <p className="text-white/70 text-sm">
            Publish your tours and start guiding your users to success
            instantly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
