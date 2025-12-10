"use client";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EmbedScript() {
  const searchParams = useSearchParams();
  const scriptId = searchParams.get("scriptId");
  const [copied, setCopied] = useState(false);

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

  const scriptCode = `<!-- Guidely Tour Widget -->
<script>
  (function() {
    // Load tour config from Convex
    fetch('${convexUrl}/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'public:getTourByScriptId',
        args: { scriptId: '${scriptId}' },
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
          window.TourWidget.initWithConfig(tourConfig.value);
        }
      };
      document.head.appendChild(script);
    })
    .catch(err => console.error('Failed to load tour:', err));
  })();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          Copy the script below and paste it before the closing{" "}
          <span className="text-gray-100 font-semibold">&lt;/body&gt;</span> tag
          in your application&apos;s HTML to enable Guidely tours.
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
            This unique ID is used to fetch your tour configuration from Convex.
          </p>
        </div>

        {/* How to Install Header */}
        <h2 className="text-xl font-semibold mb-4">How to install</h2>

        {/* Steps */}
        <ol className="list-decimal ml-6 text-gray-300 mb-8 space-y-2">
          <li>Copy the script below.</li>
          <li>
            Paste it just before the closing{" "}
            <span className="text-gray-100 font-semibold">&lt;/body&gt;</span>{" "}
            tag in your application&apos;s HTML.
          </li>
          <li>The tour will automatically load when users visit your site.</li>
        </ol>

        {/* Script Input Box */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 max-w-4xl">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Embed Code
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? "✓ Copied!" : "Copy Script"}
            </button>
          </div>
          <pre className="text-gray-300 text-xs overflow-x-auto bg-black/30 p-4 rounded-lg">
            <code>{scriptCode}</code>
          </pre>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-2xl">
          <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                The script fetches your tour configuration from Convex using the
                Script ID
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                The tour widget loads automatically based on your settings
                (autoStart, etc.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Users will see the interactive tour guide you created</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
