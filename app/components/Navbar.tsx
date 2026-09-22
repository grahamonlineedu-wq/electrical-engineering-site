'use client';

import React from 'react';
import { Zap, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500 rounded-lg text-slate-950 font-black">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-white text-lg tracking-tight block leading-none">
              VOLT<span className="text-amber-500">GRID</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase block">
              Engineering & Fleet
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+15550000000"
            className="flex items-center gap-2 px-3.5 py-2 bg-red-600/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">24/7 Hotline</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 border-l border-slate-800 pl-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </header>
  );
}

