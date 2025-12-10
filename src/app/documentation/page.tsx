import React from 'react';
import DocsLayout from '@/src/components/documentation/DocsLayout';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function InstallationPage() {
  return (
    <DocsLayout>
      <div className="mb-12">
        <h1 className="text-white text-5xl font-black mb-3">Installation</h1>
        <p className="text-[#a490cb] text-lg">
          Follow the steps below to get Guidely up and running in your project.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-white text-2xl font-bold pb-2">Getting Started</h3>
          <p className="text-[#a490cb] text-base pb-4">
            Guidely is a lightweight JavaScript library that helps you create interactive product tours and onboarding experiences.
          </p>
        </div>

        <div>
          <h3 className="text-white text-2xl font-bold pb-2">Prerequisites</h3>
          <ul className="text-[#a490cb] text-base space-y-2 list-disc list-inside">
            <li>Basic knowledge of HTML and JavaScript</li>
            <li>A web project where you want to add guided tours</li>
            <li>Modern web browser with JavaScript enabled</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-2xl font-bold pb-2">Quick Start</h3>
          <p className="text-[#a490cb] text-base pb-4">
            Get started with Guidely in just a few minutes by following our embed script guide.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-[#590df2]/30 bg-[#590df2]/10 p-10 text-center">
          <h3 className="text-white text-3xl font-bold">Ready to integrate?</h3>
          <p className="max-w-md text-[#a490cb]">
            Continue to the next section to learn how to embed the Guidely script in your project.
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <Link
          href="documentation/embed-script"
          className="flex items-center gap-2 px-6 py-3 bg-[#590df2] text-white font-bold rounded-lg hover:bg-[#590df2]/90 transition-colors"
        >
          Next: Embed Script
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </DocsLayout>
  );
}