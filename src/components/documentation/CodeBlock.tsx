"use client"

import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl bg-[#0d0718] border border-white/10">
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
      >
        <Copy className="w-4 h-4" />
      </button>
      {copied && (
        <span className="absolute top-3 right-14 text-xs text-green-400">
          Copied!
        </span>
      )}
      <pre className="p-5 overflow-x-auto font-mono text-sm">
        <code className="text-white whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}