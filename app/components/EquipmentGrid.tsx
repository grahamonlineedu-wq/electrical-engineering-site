'use client';

import React from 'react';
import { Cpu, CheckCircle2, Shield, Wrench } from 'lucide-react';

const equipmentList = [
  {
    name: 'Industrial Standby Generator (1.5 MVA)',
    category: 'Power Generation',
    specs: '415V / 11kV Output • Continuous Duty Cycle',
    status: 'Available for Immediate Dispatch',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    name: 'Primary & Secondary Injection Test Set',
    category: 'Diagnostics & Calibration',
    specs: 'Relay Testing • CT/VT Ratio Analysis',
    status: 'Available for Immediate Dispatch',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    name: 'FLIR Industrial Infrared Thermal Camera',
    category: 'Preventive Inspection',
    specs: 'High-Res Thermography • Real-time Hotspot Detect',
    status: 'In Deployment (Returns in 48h)',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    name: 'Mobile Transformer Oil Filtration Unit',
    category: 'Substation Servicing',
    specs: '6000 LPH Flow Rate • Vacuum Degassing',
    status: 'Available for Immediate Dispatch',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
];

export default function EquipmentGrid() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 p-6">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
          On-Demand Heavy Equipment Fleet
        </h3>
        <p className="text-slate-400 text-sm mt-2">
          Calibrated, ISO-certified industrial machinery ready for rapid deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentList.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">
                  {item.category}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.status}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{item.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{item.specs}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Fully Certified
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-slate-400" /> Serviced Weekly
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

