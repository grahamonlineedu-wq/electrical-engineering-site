'use client';

import React from 'react';
import { Zap, Mail, Phone, MapPin, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-white text-base">VOLTGRID SYSTEMS</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Solving power engineering scarcity through on-demand high-voltage expertise and heavy industrial equipment dispatch.
          </p>
        </div>

        {/* Col 2: Capabilities */}
        <div>
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider mb-3">Core Capabilities</h4>
          <ul className="space-y-2">
            <li>High-Voltage Transformer Installation</li>
            <li>PLC & Industrial Automation Control</li>
            <li>Primary/Secondary Injection Relay Testing</li>
            <li>Mobile Generator & Fleet Rental</li>
          </ul>
        </div>

        {/* Col 3: Contact & Legal */}
        <div>
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider mb-3">Technical Dispatch</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Industrial Zone, Power Hub 4</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> +1 (555) 000-0000</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> dispatch@voltgridsystems.com</li>
            <li className="flex items-center gap-2 pt-2 text-amber-400 cursor-pointer hover:underline">
              <FileText className="w-4 h-4" /> Download Capability Statement (PDF)
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-slate-900 text-center text-slate-600">
        © {new Date().getFullYear()} VoltGrid Engineering Ltd. All rights reserved.
      </div>
    </footer>
  );
}

