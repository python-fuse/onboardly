"use client";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function EmbedScriptContent() {
  const searchParams = useSearchParams();
  const scriptId = searchParams.get("scriptId");
  const [copied, setCopied] = useState(false);
  const [copiedReact, setCopiedReact] = useState(false);
  const [activeTab, setActiveTab] = useState<"vanilla" | "react">("vanilla");

  if (!scriptId) {
    return (
      <div className="flex h-screen overflow-hidden text-white">
        <Sidebar />
        <div className="flex-1 p-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-4">No script ID provided.</p>
            <p className="text-gray-400">
              Publish a tour to get your embed script.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  // Vanilla JS version - simple init() call
  const vanillaScript = `<!-- Onboardly Tour Widget -->
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
    script.onload = function() {
      if (window.TourWidget) {
        window.TourWidget.init('${scriptId}');
      }
    };
    document.head.appendChild(script);
  })();
</script>`;

  // React version - useEffect hook
  const reactScript = `// Add to your React component
import { useEffect } from 'react';

export default function YourComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://timely-kheer-6c719b.netlify.app/onboardly.js';
    script.onload = function() {
      if ((window as any).TourWidget) {
        (window as any).TourWidget.init('${scriptId}');
      }
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup on unmount if needed
      document.head.removeChild(script);
    };
  }, []);

  return (
    // Your component JSX
  );
}`;

  const handleCopy = () => {
    const scriptToCopy = activeTab === "vanilla" ? vanillaScript : reactScript;
    navigator.clipboard.writeText(scriptToCopy);
    if (activeTab === "vanilla") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Thin Vertical Line */}
      <div className="w-px bg-white" />
      {/* Main Content */}
      <div className="flex-1 p-8 md:p-16 overflow-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Embed Script</h1>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mb-10">
          Copy the script below and add it to your application. The widget will
          automatically fetch your tour configuration and start the tour.
        </p>

        {/* Script ID Info */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6 max-w-2xl">
          <p className="text-sm text-purple-200">
            <span className="font-semibold">Script ID:</span>{" "}
            <code className="bg-purple-900/40 px-2 py-1 rounded">
              {scriptId}
            </code>
          </p>
          <p className="text-xs text-purple-300 mt-2">
            The widget uses this ID to fetch your tour from Convex
            automatically.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("vanilla")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "vanilla"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Vanilla JavaScript
          </button>
          <button
            onClick={() => setActiveTab("react")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "react"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            React / Next.js
          </button>
        </div>

        {/* How to Install Header */}
        <h2 className="text-xl font-semibold mb-4">How to install</h2>

        {/* Steps */}
        {activeTab === "vanilla" ? (
          <ol className="list-decimal ml-6 text-gray-300 mb-8 space-y-2">
            <li>Copy the script below.</li>
            <li>
              Paste it just before the closing{" "}
              <span className="text-gray-100 font-semibold">&lt;/body&gt;</span>{" "}
              tag in your HTML.
            </li>
            <li>
              The tour will automatically load when users visit your site.
            </li>
          </ol>
        ) : (
          <ol className="list-decimal ml-6 text-gray-300 mb-8 space-y-2">
            <li>Copy the code below.</li>
            <li>
              Add it to your React component (usually in your main App or Layout
              component).
            </li>
            <li>The tour will load when the component mounts.</li>
          </ol>
        )}

        {/* Script Input Box */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 max-w-4xl">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                {activeTab === "vanilla"
                  ? "Embed Code"
                  : "React Component Code"}
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              {activeTab === "vanilla"
                ? copied
                  ? "✓ Copied!"
                  : "Copy Script"
                : copiedReact
                ? "✓ Copied!"
                : "Copy Code"}
            </button>
          </div>
          <pre className="text-gray-300 text-xs overflow-x-auto bg-black/30 p-4 rounded-lg">
            <code>{activeTab === "vanilla" ? vanillaScript : reactScript}</code>
          </pre>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-2xl">
          <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                The widget automatically fetches your tour using the Script ID
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                Your tour starts based on your settings (autoStart, etc.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                Analytics are tracked automatically for insights in your
                dashboard
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function EmbedScript() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#0d0b14] text-white">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="text-gray-400">Loading embed script...</p>
          </div>
        </div>
      }
    >
      <EmbedScriptContent />
    </Suspense>
  );
}
