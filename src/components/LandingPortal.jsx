import { motion } from 'framer-motion';
import { Zap, ShieldCheck } from 'lucide-react';

export default function LandingPortal({ onStart }) {
  return (
    <div className="fixed inset-0 bg-[#050505] z-[200] overflow-hidden flex flex-col items-center justify-center font-sans px-4">
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <motion.span 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block bg-yellow-400 text-black px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
        >
          System v2.4.0 Deployment
        </motion.span>
        
        <h1 className="text-7xl md:text-[120px] font-display uppercase italic leading-none tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent select-none">
          Nexus<br />Games
        </h1>

        <p className="text-white/60 text-lg md:text-xl font-medium max-w-xl mx-auto mb-12">
          Experience low-latency, high-performance gaming directly in your browser. 
          Bypassing restrictions since 2024. No downloads. Just action.
        </p>

        <div className="flex flex-col items-center justify-center gap-10">
          <button 
            onClick={onStart}
            className="group relative px-12 py-5 bg-white text-black font-bold text-xl uppercase tracking-wider skew-x-[-15deg] transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-[10px_10px_0_rgba(250,204,21,0.2)]"
          >
            <span className="inline-block skew-x-[15deg] flex items-center gap-3">
              Initiate Grid <Zap size={24} fill="currentColor" />
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-[10px] tracking-widest text-white/30 uppercase font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              Proxy Online
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" />
              AES-256 Valid
            </div>
            <div>v4.1.14 Stable</div>
          </div>
        </div>
      </motion.div>

      {/* Frame Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-white/5 -rotate-12 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 border-r-2 border-b-2 border-white/5 rotate-12 pointer-events-none"></div>
      
      {/* HUD Elements */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 font-mono text-[9px] text-white/20 uppercase tracking-tighter pointer-events-none">
        <span>LATENCY: 0.02ms</span>
        <span>UPTIME: 100%</span>
        <span>LOAD: 12%</span>
      </div>
    </div>
  );
}
