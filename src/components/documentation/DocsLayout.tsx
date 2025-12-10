"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Link2, Settings } from 'lucide-react';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sidebarItems = [
    { icon: <Download className="w-5 h-5" />, label: 'Installation', href: '/documentation' },
    { icon: <Link2 className="w-5 h-5" />, label: 'Embed Script', href: '/documentation/embed-script' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuration Options', href: '/documentation/configuration' },
  ];

  return (
    <div className="min-h-screen bg-[#161023] text-white font-sans">
      <div className="flex">
        {/* Sidebar - Sticky and hidden on mobile */}
        <aside className="hidden md:block sticky top-[61px] h-[calc(100vh-61px)] w-64 border-r border-white/10 p-6 overflow-y-auto">
          <div className="flex h-full flex-col">
            <h1 className="text-white text-base font-medium mb-4 px-3">Guidely Docs</h1>
            <div className="flex flex-col gap-1">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#590df2]/20 text-[#590df2]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <p className="text-sm font-medium">{item.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-16">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}