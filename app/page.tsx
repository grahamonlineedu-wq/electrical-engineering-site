import Navbar from './components/Navbar';
import RequestDispatchForm from './components/RequestDispatchForm';
import EquipmentGrid from './components/EquipmentGrid';
import Footer from './components/Footer';
import { Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <Zap className="w-4 h-4" /> Electrical Engineering & Equipment Fleet
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Bridging the Scarcity Gap in <span className="text-amber-500">Power Engineering</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Immediate access to certified high-voltage engineers, diagnostic testing, and heavy equipment deployment for critical power infrastructure.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400" /> Licensed Technical Experts</span>
              <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-amber-400" /> Calibrated Industrial Gear</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> 24/7 Rapid Response</span>
            </div>
          </div>

          {/* Core Components */}
          <RequestDispatchForm />
          <EquipmentGrid />
        </main>
      </div>

      <Footer />
    </div>
  );
}

