"use client"

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import DocsLayout from '@/src/components/documentation/DocsLayout';
import { CodeBlock } from '@/src/components/documentation/CodeBlock';

export default function ConfigurationPage() {
  const configurationCode = `window.TourWidget.initWithConfig({
  tourId: 'build-test-tour',
  steps: [
    {
      id: 'step-1',
      targetSelector: '#welcome-msg',
      title: 'Build Successful!',
      content: 'The widget script is loaded correctly from the dist/ folder.',
      placement: 'top'
    },
    {
      id: 'step-2',
      targetSelector: '#action-btn',
      title: 'Interactive',
      content: 'You can interact with elements nicely.',
      placement: 'bottom'
    }
  ]
});`;

  return (
    <DocsLayout>
      <div className="mb-12">
        <h1 className="text-white text-5xl font-black mb-3">Configuration</h1>
        <p className="text-[#a490cb] text-lg">
          Define your tour steps using a simple configuration object.
        </p>
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold pb-2 pt-5">Example Configuration</h3>
        <p className="text-[#a490cb] text-base pb-4">
          Here&lsquo;s an example of how to define a two-step tour with target selectors, titles, content, and placement options.
        </p>
        
        <CodeBlock code={configurationCode} />
      </div>

      {/* CTA Section */}
      <div className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-[#590df2]/30 bg-[#590df2]/10 p-10 text-center">
        <h3 className="text-white text-3xl font-bold">Ready to see it in action?</h3>
        <p className="max-w-md text-[#a490cb]">
          Explore our interactive demo to experience the power and simplicity of Guidely firsthand. No installation required.
        </p>
        <button 
            className="px-6 py-3 bg-[#590df2] text-white font-bold rounded-lg hover:bg-[#590df2]/90 transition-colors shadow-[0_0_25px_rgba(89,13,242,0.6)]" 
        >
          <Link
            href="/login"
            className='cursor-pointer'
          >
            Try the Live Demo
          </Link>
        </button>
      </div>

      {/* Navigation Button */}
      <div className="mt-12 flex justify-start">
        <Link
          href="/documentation/embed-script"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous: Embed Script
        </Link>
      </div>
    </DocsLayout>
  );
}