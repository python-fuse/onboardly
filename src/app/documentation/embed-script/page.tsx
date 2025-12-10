"use client"

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DocsLayout from '@/src/components/documentation/DocsLayout';
import { CodeBlock } from '@/src/components/documentation/CodeBlock';

export default function EmbedScriptPage() {
  const embedScriptCode = `<!-- Load the built widget -->
<script src="https://timely-kheer-6c719b.netlify.app/onboardly.js"></script>
<script>
  window.addEventListener('load', () => {
    if (!window.TourWidget) {
      alert('Error: TourWidget not found. Did you run pnpm build?');
      return;
    }
    window.TourWidget.initWithConfig({
      tourId: 'build-test-tour',
      steps: [
        // ... your tour steps here
      ]
    });
  });
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
        <h3 className="text-white text-2xl font-bold pb-2 pt-5">Installation</h3>
        <p className="text-[#a490cb] text-base pb-4">
          Load the widget script in your HTML file, typically just before the closing &lt;/body&gt; tag.
        </p>
        
        <CodeBlock code={embedScriptCode} />
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