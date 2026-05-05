import { useState, useMemo, useEffect } from 'react';
import { Search, Gamepad2, Trophy, Zap, X, Maximize2, ShieldCheck, Cpu, Network, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gamesDataRaw from './data/games.json';

const gamesData = Array.isArray(gamesDataRaw) ? gamesDataRaw : [];

function StartupSequence({ onComplete }) {
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
  }, [onComplete]);

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

function LandingPortal({ onStart }) {
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

export default function App() {
  const [appState, setAppState] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('nexus_returning_user')) {
      return 'lobby';
    }
    return 'landing';
  });

  useEffect(() => {
    if (appState === 'lobby') {
      localStorage.setItem('nexus_returning_user', 'true');
    }
  }, [appState]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const handleStart = useMemo(() => () => setAppState('booting'), []);
  const handleBootComplete = useMemo(() => () => setAppState('lobby'), []);

  const categories = useMemo(() => {
    if (!gamesData || !Array.isArray(gamesData)) return [];
    const cats = gamesData.map(g => g.category);
    return Array.from(new Set(cats));
  }, []);

  const filteredGames = useMemo(() => {
    if (!gamesData || !Array.isArray(gamesData)) return [];
    return gamesData.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {appState === 'landing' && (
        <LandingPortal onStart={handleStart} />
      )}
      {appState === 'booting' && (
        <StartupSequence onComplete={handleBootComplete} />
      )}

      <div 
        className={`flex flex-col min-h-screen transition-opacity duration-500 ${appState === 'lobby' ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: appState === 'lobby' ? 'auto' : 'none' }}
      >
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b-2 border-white/10 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActiveGame(null); setSelectedCategory(null);}}>
            <div className="bg-yellow-400 p-1 rounded-sm rotate-3">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <h1 className="font-display text-2xl tracking-tighter uppercase italic">Nexus Games</h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search classics..."
                className="w-full bg-white/5 border-2 border-white/10 rounded-full py-2 pl-10 pr-4 focus:border-yellow-400 focus:outline-none transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="hidden md:flex items-center gap-2 bg-white text-black font-bold px-4 py-2 rounded-sm hover:bg-yellow-400 transition-colors uppercase text-sm">
              <Zap size={16} fill="currentColor" />
              Surprise Me
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:px-8">
        {activeGame ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveGame(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
                Back to Lobby
              </button>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>

            <div className="relative aspect-video w-full bg-black border-4 border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <iframe
                id="game-frame"
                src={activeGame.iframeUrl}
                className="w-full h-full border-none"
                title={activeGame.name}
                allowFullScreen
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/5 p-6 rounded-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-display uppercase italic">{activeGame.name}</h2>
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-sm uppercase">
                    {activeGame.category}
                  </span>
                </div>
                <p className="text-white/60 max-w-2xl">{activeGame.description}</p>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 md:flex-none bg-yellow-400 text-black font-bold px-8 py-3 rounded-sm hover:scale-105 active:scale-95 transition-transform uppercase">
                  Add to Favs
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#111] p-8 md:p-12 rounded-2xl border-2 border-white/5 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
                <div className="flex-1 space-y-6 z-10">
                  <div className="space-y-1">
                    <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase font-bold">Trending Now</span>
                  <h2 className="text-5xl md:text-7xl font-display leading-[0.85] uppercase italic">{gamesData[0]?.name || "Nexus Featured"}</h2>
                  </div>
                  <p className="text-xl text-white/60 max-w-lg">{gamesData[0]?.description || "Experience high-performance gaming directly in your browser. Bypassing restrictions since 2024."}</p>
                  <button 
                    onClick={() => setActiveGame(gamesData[0])}
                    className="bg-white text-black px-10 py-4 font-bold text-lg uppercase skew-x-[-12deg] hover:bg-yellow-400 hover:scale-105 transition-all"
                  >
                    <span className="inline-block skew-x-[12deg]">Play Now</span>
                  </button>
                </div>
                <div className="hidden md:block flex-1 relative h-64 w-full">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800')] bg-cover bg-center rounded-xl rotate-3 grayscale opacity-40"></div>
                   <div className="absolute inset-0 border-4 border-yellow-400/20 translate-x-4 translate-y-4 rounded-xl -z-10"></div>
                </div>
              </div>
            </div>

            {/* Categories & Grid */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    !selectedCategory ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/60'
                  }`}
                >
                  All Games
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, idx) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setActiveGame(game)}
                  >
                    <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden rounded-lg mb-3 border-2 border-white/5 group-hover:border-yellow-400/50 transition-colors">
                      <img
                        src={game.thumbnail}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <button className="w-full bg-white text-black font-bold py-2 rounded-sm uppercase text-xs scale-90 group-hover:scale-100 transition-transform">
                          Launch Game
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg uppercase italic tracking-tight">{game.name}</h3>
                        <p className="text-white/40 text-xs line-clamp-1">{game.description}</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-white/10 px-1.5 py-0.5 rounded text-white/60 uppercase">
                        {game.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black border-t-2 border-white/5 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="space-y-4">
             <h2 className="font-display text-3xl uppercase italic tracking-tighter">Nexus <span className="text-yellow-400">Labs</span></h2>
             <p className="text-white/40 max-w-sm text-sm">Providing the fastest, cleanest, and most reliable gaming experience. Optimized for performance and privacy.</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs tracking-widest text-white/80">Platfrom</h4>
              <ul className="text-sm text-white/40 space-y-2">
                <li className="hover:text-yellow-400 cursor-pointer">Support</li>
                <li className="hover:text-yellow-400 cursor-pointer">Changelog</li>
                <li className="hover:text-yellow-400 cursor-pointer">API</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs tracking-widest text-white/80">Social</h4>
              <ul className="text-sm text-white/40 space-y-2">
                <li className="hover:text-yellow-400 cursor-pointer">Discord</li>
                <li className="hover:text-yellow-400 cursor-pointer">Twitter</li>
                <li className="hover:text-yellow-400 cursor-pointer">GitHub</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          <p>© 2026 Nexus Games Infrastructure</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><Zap size={10} /> 99.9% Uptime</span>
            <span className="flex items-center gap-1.5"><Trophy size={10} /> Best Performance 2026</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
