"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DocsLayout from "@/src/components/documentation/DocsLayout";
import { CodeBlock } from "@/src/components/documentation/CodeBlock";

export default function EmbedScriptPage() {
  const embedScriptCode = `<!-- Guidely Tour Widget -->
<script>
  (function() {
    // Fetch tour configuration from Convex
    fetch('YOUR_CONVEX_URL/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'public:getTourByScriptId',
        args: { scriptId: 'YOUR_SCRIPT_ID' },
        format: 'json'
      })
    })
    .then(res => res.json())
    .then(tourConfig => {
      // Load the widget script
      const script = document.createElement('script');
      script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
      script.onload = function() {
        if (window.TourWidget) {
          window.TourWidget.initWithConfig(tourConfig);
        }
      };
      document.head.appendChild(script);
    })
    .catch(err => console.error('Failed to load tour:', err));
  })();
</script>
</body>`;

  return (
    <DocsLayout>
      <div className="mb-12">
        <h1 className="text-white text-5xl font-black mb-3">Embed Script</h1>
        <p className="text-[#a490cb] text-lg">
          Add the Guidely widget to your HTML file with a simple script tag.
        </p>
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold pb-2 pt-5">
          Installation
        </h3>
        <p className="text-[#a490cb] text-base pb-4">
          After publishing your tour in the Guidely dashboard, you&apos;ll
          receive a unique Script ID. Use this script to load your tour
          configuration from Convex and initialize the widget.
        </p>

        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">How it works:</h4>
          <ol className="text-[#a490cb] text-sm space-y-2 list-decimal ml-5">
            <li>
              The script fetches your tour configuration from Convex using your
              unique Script ID
            </li>
            <li>The tour widget is loaded dynamically</li>
            <li>The widget initializes with your tour configuration</li>
            <li>
              Users see your interactive tour automatically (based on your
              autoStart setting)
            </li>
          </ol>
        </div>

        <CodeBlock code={embedScriptCode} />

        <div className="mt-4 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
          <p className="text-[#a490cb] text-sm">
            <span className="text-yellow-400 font-semibold">Note:</span> Replace{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs">
              YOUR_CONVEX_URL
            </code>{" "}
            with your Convex deployment URL and{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs">
              YOUR_SCRIPT_ID
            </code>{" "}
            with the Script ID you receive after publishing.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between">
        <Link
          href="/documentation"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous: Installation
        </Link>
        <Link
          href="/documentation/configuration"
          className="flex items-center gap-2 px-6 py-3 bg-[#590df2] text-white font-bold rounded-lg hover:bg-[#590df2]/90 transition-colors"
        >
          Next: Configuration
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </DocsLayout>
  );
}
