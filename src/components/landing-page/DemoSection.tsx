"use client";

import Button from "../shared/button";

export default function DemoSection() {
  const handleLaunchDemo = () => {
    alert("Demo tour would launch here! 🚀");
    // Later you'll integrate the actual embeddable widget here
  };

  return (
    <section
      className="flex flex-col gap-8 items-center text-center px-4"
      id="demo"
    >
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
        Try The Live Demo
      </h2>
      <p className="text-white/80 text-base md:text-lg font-normal leading-normal max-w-2xl">
        Interact with a live Guidely tour right here. Click the button below to
        see how it works on a sample interface.
      </p>

      <div className="w-full max-w-3xl p-8 bg-white/5 rounded-xl border border-white/10">
        <p className="text-white/90">This is a sample application area.</p>
        <p className="text-white/70 text-sm mt-2">
          Our widget can attach to any element here.
        </p>
        <Button
          variant="primary"
          size="lg"
          className="mt-6 mx-auto"
          onClick={handleLaunchDemo}
        >
          Launch Demo Tour
        </Button>
      </div>
    </section>
  );
}
