"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DocsLayout from "@/src/components/documentation/DocsLayout";
import { CodeBlock } from "@/src/components/documentation/CodeBlock";

export default function EmbedScriptPage() {
  // Vanilla JS - Simple init() call
  const vanillaScriptCode = `<!-- Onboardly Tour Widget -->
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
    script.onload = function() {
      if (window.TourWidget) {
        window.TourWidget.init('YOUR_SCRIPT_ID');
      }
    };
    document.head.appendChild(script);
  })();
</script>
</body>`;

  // React version
  const reactCode = `// Add to your React component (App.tsx, layout.tsx, etc.)
import { useEffect } from 'react';

export default function YourComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
    script.onload = function() {
      if ((window as any).TourWidget) {
        (window as any).TourWidget.init('YOUR_SCRIPT_ID');
      }
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup on unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    // Your component JSX
  );
}`;

  return (
    <DocsLayout>
      <div className="mb-8 md:mb-12">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black mb-3">
          Embed Script
        </h1>
        <p className="text-[#a490cb] text-base md:text-lg">
          Add Guidely to your application in seconds - just one script tag or
          useEffect hook.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-bold pb-2 pt-5">
            Quick Start
          </h3>
          <p className="text-[#a490cb] text-sm md:text-base pb-4">
            After publishing your tour, you&apos;ll get a unique Script ID. Simply
            call{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs md:text-sm">
              TourWidget.init()
            </code>{" "}
            with your Script ID - the widget handles everything else
            automatically.
          </p>

          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-white font-semibold mb-2 text-sm md:text-base">
              ✨ How it works (automatically):
            </h4>
            <ol className="text-[#a490cb] text-xs md:text-sm space-y-2 list-decimal ml-5">
              <li>Widget fetches your tour from Convex using the Script ID</li>
              <li>Tour loads with all your configured steps and settings</li>
              <li>Analytics are tracked automatically</li>
              <li>Users see your interactive tour!</li>
            </ol>
          </div>
        </div>

        {/* Vanilla JS Section */}
        <div>
          <h3 className="text-white text-lg md:text-xl font-bold pb-2 pt-6">
            Vanilla JavaScript / HTML
          </h3>
          <p className="text-[#a490cb] text-sm md:text-base pb-4">
            Add this script before the closing{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs md:text-sm">
              &lt;/body&gt;
            </code>{" "}
            tag:
          </p>

          <CodeBlock code={vanillaScriptCode} />
        </div>

        {/* React Section */}
        <div>
          <h3 className="text-white text-lg md:text-xl font-bold pb-2 pt-8">
            React / Next.js
          </h3>
          <p className="text-[#a490cb] text-sm md:text-base pb-4">
            Add this to your main component (App.tsx, layout.tsx, or any page):
          </p>

          <CodeBlock code={reactCode} />
        </div>

        {/* Tips */}
        <div className="space-y-4">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
            <p className="text-[#a490cb] text-xs md:text-sm">
              <span className="text-yellow-400 font-semibold">💡 Tip:</span>{" "}
              Replace{" "}
              <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                YOUR_SCRIPT_ID
              </code>{" "}
              with the Script ID from your dashboard (e.g.,{" "}
              <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                script_abc123
              </code>
              ). You&apos;ll get this automatically when you publish a tour.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2 text-sm md:text-base">
              🎯 That&apos;s it!
            </h4>
            <p className="text-blue-200 text-xs md:text-sm">
              No manual fetch calls, no configuration objects to build. Just pass
              your Script ID and the widget does all the heavy lifting. It
              automatically:
            </p>
            <ul className="text-blue-200 text-xs md:text-sm mt-2 space-y-1 ml-5 list-disc">
              <li>Fetches tour config from Convex</li>
              <li>Handles loading states and errors</li>
              <li>Tracks analytics events</li>
              <li>Respects your autoStart and other settings</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Link
          href="/documentation"
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-white/5 text-white text-sm md:text-base font-bold rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Previous: Installation</span>
          <span className="sm:hidden">Previous</span>
        </Link>
        <Link
          href="/documentation/configuration"
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-[#590df2] text-white text-sm md:text-base font-bold rounded-lg hover:bg-[#590df2]/90 transition-colors"
        >
          <span className="hidden sm:inline">Next: Configuration</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </DocsLayout>
  );
}