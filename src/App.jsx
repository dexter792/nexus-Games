import { useState, useMemo, useEffect } from 'react';
import { Search, Gamepad2, Trophy, Zap, X, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import StartupSequence from './components/StartupSequence';
import LandingPortal from './components/LandingPortal';
import { gamesData, getCategories, filterGames } from './lib/games';

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

  const categories = useMemo(() => getCategories(gamesData), []);

  const filteredGames = useMemo(() => 
    filterGames(gamesData, searchQuery, selectedCategory), 
    [searchQuery, selectedCategory]
  );

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
        <nav className="sticky top-0 z-40 bg-[#080808]/80 backdrop-blur-md border-b-2 border-white/10 px-4 py-4 md:px-8">
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
                    <p className="text-xl text-white/60 max-w-lg">{gamesData[0]?.description || "Experience high-performance gaming directly in your browser."}</p>
                    <button 
                      onClick={() => setActiveGame(gamesData[0])}
                      className="bg-white text-black px-10 py-4 font-bold text-lg uppercase skew-x-[-12deg] hover:bg-yellow-400 hover:scale-105 transition-all text-sm"
                    >
                      <span className="inline-block skew-x-[12deg]">Play Now</span>
                    </button>
                  </div>
                  <div className="hidden md:block flex-1 relative h-64 w-full">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800')] bg-cover bg-center rounded-xl rotate-3 grayscale opacity-40"></div>
                  </div>
                </div>
              </div>

              {/* Grid Section */}
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
                          <button className="w-full bg-white text-black font-bold py-2 rounded-sm uppercase text-xs">
                            Launch Game
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-lg uppercase italic tracking-tight">{game.name}</h3>
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
              <p className="text-white/40 max-w-sm text-sm">Providing the fastest, cleanest, and most reliable gaming experience.</p>
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

