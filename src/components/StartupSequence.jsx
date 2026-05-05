import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Network } from 'lucide-react';

export default function StartupSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const messages = [
    "INITIALIZING NEXUS_CORE...",
    "ESTABLISHING SECURE TUNNEL...",
    "SCANNING GAME_GRID ASSETS...",
    "BYPASSING FIREWALL_V4...",
    "OPTIMIZING RENDER_PIPELINE...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentMsg = 0;
    let timer;
    const interval = setInterval(() => {
      if (currentMsg < messages.length) {
        setLogs(prev => [...prev.slice(-8), messages[currentMsg]]);
        setProgress(Math.round(((currentMsg + 1) / messages.length) * 100));
        currentMsg++;
      } else {
        clearInterval(interval);
        timer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 50);
      }
    }, 5); // Near-instant 5ms cycles for "Core" loading

    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [onComplete, messages]);

  return (
    <div 
      className="fixed inset-0 bg-[#080808] flex items-center justify-center p-6 z-[100] font-mono cursor-pointer"
      onClick={onComplete} // Allow skipping
    >
      <div className="max-w-md w-full space-y-8 pointer-events-none">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="bg-yellow-400 p-3 rotate-12 shadow-[4px_4px_0_#fff]">
            <Terminal className="text-black" size={32} />
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tighter italic text-white text-center">Nexus Labs</h1>
          <span className="text-[10px] text-white/20 animate-pulse uppercase tracking-[0.3em]">Click to Bypass</span>
        </div>

        <div className="bg-white/5 border-2 border-white/10 p-4 rounded-sm space-y-2 h-48 overflow-hidden relative">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-xs flex items-center gap-2"
            >
              <span className="text-yellow-400">{">"}</span>
              <span className="text-white/60">{log}</span>
            </motion.div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111] to-transparent"></div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-white/40">
            <span>Security protocols active</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {progress === 100 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="w-full bg-white text-black font-bold py-4 rounded-sm hover:bg-yellow-400 transition-colors uppercase tracking-widest text-sm shadow-[6px_6px_0_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Enter Game Grid
          </motion.button>
        )}

        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center gap-1 opacity-20">
            <ShieldCheck size={14} />
            <span className="text-[8px] uppercase font-bold">Encrypted</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-20">
            <Cpu size={14} />
            <span className="text-[8px] uppercase font-bold">High Perf</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-20">
            <Network size={14} />
            <span className="text-[8px] uppercase font-bold">Direct Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}
