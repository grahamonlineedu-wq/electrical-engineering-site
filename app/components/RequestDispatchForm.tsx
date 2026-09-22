'use client';

import React, { useState } from 'react';
import { Truck, Zap, AlertTriangle, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RequestDispatchForm() {
  const [requestType, setRequestType] = useState<'equipment' | 'dispatch'>('equipment');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      requestType,
      company: formData.get('company'),
      contactName: formData.get('contactName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      equipmentCategory: formData.get('equipmentCategory') || null,
      durationDate: formData.get('durationDate') || null,
      emergencyLevel: formData.get('emergencyLevel') || null,
      voltageClass: formData.get('voltageClass') || null,
      scopeNotes: formData.get('scopeNotes'),
    };

    try {
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit dispatch request');

      setSubmitted(true);
    } catch (err) {
      setError('Transmission failed. Please verify network or call emergency hotline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full mb-3">
          <Zap className="w-3.5 h-3.5" /> Rapid Response Network
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Deployment & Dispatch Portal
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Request industrial-grade electrical machinery or dispatch emergency engineering personnel.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1.5 mb-8 bg-slate-950 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => { setRequestType('equipment'); setSubmitted(false); setError(''); }}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
            requestType === 'equipment'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          Equipment Rental
        </button>

        <button
          type="button"
          onClick={() => { setRequestType('dispatch'); setSubmitted(false); setError(''); }}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
            requestType === 'dispatch'
              ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Emergency Engineer
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
          {error}
        </div>
      )}

      {submitted ? (
        <div className="py-12 text-center space-y-4 bg-slate-950/50 rounded-xl border border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-2 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Request Dispatched Successfully</h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            Our technical dispatch unit has received your alert. A certified chief engineer will contact you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Company Name</label>
              <input
                name="company"
                type="text"
                required
                placeholder="e.g. Apex Engineering Ltd"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Contact Person</label>
              <input
                name="contactName"
                type="text"
                required
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Direct Phone</label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Corporate Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="engineer@company.com"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
          </div>

          {requestType === 'equipment' ? (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Equipment Category</label>
                  <select name="equipmentCategory" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm">
                    <option value="Industrial Generator (500 kVA - 2.5 MVA)">Industrial Generator (500 kVA - 2.5 MVA)</option>
                    <option value="High-Voltage Insulation Test Set">High-Voltage Insulation Test Set</option>
                    <option value="Infrared Thermal Imaging Rig">Infrared Thermal Imaging Rig</option>
                    <option value="Transformer Oil Filtration Plant">Transformer Oil Filtration Plant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Required Date</label>
                  <div className="relative">
                    <input
                      name="durationDate"
                      type="date"
                      required
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                    />
                    <Calendar className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Emergency Severity</label>
                  <select name="emergencyLevel" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-red-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm">
                    <option value="Critical Outage / Plant Stoppage">Critical Outage / Plant Stoppage</option>
                    <option value="Fault Risk / Partial Power Loss">Fault Risk / Partial Power Loss</option>
                    <option value="Urgent Inspection">Urgent Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Voltage System Class</label>
                  <select name="voltageClass" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm">
                    <option value="Low Voltage (< 1kV)">Low Voltage (&lt; 1kV)</option>
                    <option value="Medium Voltage (1kV - 33kV)">Medium Voltage (1kV - 33kV)</option>
                    <option value="High Voltage (> 33kV)">High Voltage (&gt; 33kV)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Site Location & Scope Details</label>
            <textarea
              name="scopeNotes"
              rows={3}
              required
              placeholder="Specify plant address, power specs, or fault symptoms..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : requestType === 'equipment'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              {loading
                ? 'Transmitting Request...'
                : requestType === 'equipment'
                ? 'Confirm Equipment Deployment Request'
                : 'Dispatch Emergency Engineering Team'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
	
