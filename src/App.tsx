/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider, useAuth } from './lib/AuthContext';
import { InteractiveMap } from './components/InteractiveMap';
import { CharacterEncyclopedia } from './components/CharacterEncyclopedia';
import { MagicalArtifact } from './components/MagicalArtifact';
import { DynamicWeather } from './components/DynamicWeather';
import { MythoriaAI } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Book, ScrollText, Map as MapIcon, LogIn, LogOut, Loader2, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

function AppContent() {
  const { user, profile, loading, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'map' | 'characters' | 'quests' | 'oracle'>('map');
  const [aiLore, setAiLore] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAILore = async (subject: string) => {
    setIsGenerating(true);
    const lore = await MythoriaAI.generateLore(subject);
    setAiLore(lore || '');
    setIsGenerating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-myth-dark">
        <Loader2 className="animate-spin text-myth-gold" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <DynamicWeather />
      
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c5a059 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* GEOMETRIC HEADER */}
      <header className="flex justify-between items-center h-16 border-b border-myth-gold/30 mb-8 px-8 relative z-50 bg-myth-dark/80 backdrop-blur-md">
        <div className="flex gap-4 items-center">
          <div className="medieval-text opacity-60">VER: 2.4.1_MYTH</div>
          <div className="w-[1px] h-4 bg-myth-gold/30" />
          <div className="medieval-text">REALM: {profile?.faction || 'ELDORIA'}</div>
        </div>
        
        <div className="text-3xl font-black font-serif tracking-[0.4em] text-myth-gold glow-gold">MYTHORIA</div>
        
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <div className="flex flex-col items-end">
                <span className="medieval-text text-purple-400">Mana Level</span>
                <div className="w-32 h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(profile?.xp || 0) % 100}%` }}
                    className="h-full bg-purple-600 shadow-[0_0_8px_#9333ea]" 
                  />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-myth-gold flex items-center justify-center bg-[#1a1625] overflow-hidden group relative cursor-pointer" onClick={logout}>
                <div className="w-8 h-8 bg-gradient-to-tr from-myth-gold to-yellow-200 rounded-full opacity-80 group-hover:scale-110 transition-transform" />
                <LogOut size={12} className="absolute text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </>
          ) : (
            <button onClick={login} className="medieval-text text-myth-gold hover:text-white transition-colors flex items-center gap-2">
              <LogIn size={14} /> Initiate 
            </button>
          )}
        </div>
      </header>

      {/* Main Navigation - Integrated into layout */}
      <nav className="flex justify-center mb-8 px-4 relative z-40">
        <div className="flex bg-myth-gold/5 border border-myth-gold/20 ornament">
          {[
            { id: 'map', icon: MapIcon, label: 'World Map' },
            { id: 'characters', icon: Book, label: 'Encyclopedia' },
            { id: 'quests', icon: ScrollText, label: 'Quest Log' },
            { id: 'oracle', icon: Sparkles, label: 'Oracle AI' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-8 py-3 medieval-text transition-all ${
                activeTab === item.id
                  ? 'bg-myth-gold/20 text-white border-x border-myth-gold/30'
                  : 'text-gray-500 hover:text-myth-gold'
              }`}
            >
              <item.icon size={14} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-8 w-full pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-12 gap-8 h-full"
            >
              {/* SIDEBAR LORE & STATS */}
              <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                <div className="ornament ornament-tl ornament-tr p-6 flex flex-col flex-1">
                  <h3 className="medieval-text text-myth-gold border-b border-myth-gold/30 pb-3 mb-6">Regional Intel</h3>
                  <div className="space-y-6 flex-1">
                    <div className="fantasy-card p-4 border-none bg-white/5">
                      <span className="medieval-text text-myth-gold/60 block mb-2">Active Faction</span>
                      <p className="text-xl font-serif text-white">{profile?.faction || 'Eldoria'}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="medieval-text text-[8px] text-gray-500">Live Missions</h4>
                      <div className="p-3 border-l-2 border-myth-gold bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                        <p className="text-sm font-bold text-white">The Void Echo</p>
                        <p className="text-[10px] italic text-gray-400">Patrol the northern borders...</p>
                      </div>
                      <div className="p-3 border-l-2 border-gray-700 bg-white/5 opacity-50">
                        <p className="text-sm font-bold text-white">Stone & Fire</p>
                        <p className="text-[10px] italic text-gray-400">Locked until Level 5</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-myth-gold/10 border border-myth-gold/40 medieval-text text-myth-gold hover:bg-myth-gold/20 transition-all mt-auto shadow-lg" onClick={() => generateAILore('Daily Quest')}>
                    AI Story Forge
                  </button>
                </div>
              </div>

              {/* CENTER MAP */}
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                <div className="flex-1 relative border border-myth-gold/40 magic-gradient overflow-hidden min-h-[500px]">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                     <div className="w-[80%] aspect-square border border-myth-gold/30 rounded-full animate-pulse" />
                     <div className="w-[60%] aspect-square border border-myth-gold/20 rounded-full" />
                  </div>
                  <div className="relative h-full">
                    <InteractiveMap onRegionSelect={(region) => generateAILore(region.name)} />
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 medieval-text text-myth-gold/40 whitespace-nowrap">
                    Interactive Chronicles - Sector {profile?.level || 1}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {['Inventory', 'Artifacts', 'Guilds', 'Market'].map(item => (
                    <div key={item} className="h-16 border border-myth-gold/20 bg-white/5 flex items-center justify-center medieval-text text-gray-400 hover:border-myth-gold hover:text-white transition-all cursor-pointer">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT STATS */}
              <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                <div className="ornament ornament-tl ornament-tr p-6 flex-1">
                   <h3 className="medieval-text text-myth-gold border-b border-myth-gold/30 pb-3 mb-6">Soul Progress</h3>
                   
                   <div className="flex flex-col items-center mb-8">
                     <div className="w-32 h-32 border-2 border-myth-gold p-1 mb-4 relative flex items-center justify-center">
                        <div className="absolute inset-1 border border-myth-gold/20" />
                        <div className="w-full h-full bg-gradient-to-br from-myth-gold/20 to-purple-900/40 flex items-center justify-center">
                          <Shield size={48} className="text-myth-gold/60" />
                        </div>
                     </div>
                     <span className="text-xl text-white font-serif tracking-widest">{profile?.displayName || 'Traveler'}</span>
                     <span className="medieval-text text-myth-gold">LEVEL {profile?.level || 1} {profile?.faction}</span>
                   </div>

                   <div className="space-y-4">
                      {[
                        { label: 'Strength', val: 12 + (profile?.level || 0) },
                        { label: 'Essence', val: 24 + (profile?.level || 0) * 2 },
                        { label: 'Gold', val: profile?.gold || 0 },
                        { label: 'Total XP', val: profile?.xp || 0 },
                      ].map(stat => (
                        <div key={stat.label} className="flex justify-between items-center medieval-text border-b border-white/5 pb-2">
                           <span className="text-gray-500">{stat.label}</span>
                           <span className="text-myth-gold">{stat.val}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'characters' && (
            <motion.div
              key="characters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-12 border-l-4 border-myth-gold pl-8">
                <h2 className="text-5xl font-serif text-white mb-2">Encyclopedia</h2>
                <p className="text-gray-400 text-lg medieval-text">Forbidden Knowledge of the Ancients</p>
              </div>
              <CharacterEncyclopedia />
            </motion.div>
          )}

          {activeTab === 'oracle' && (
            <motion.div
              key="oracle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-12 ornament p-8 mb-12">
                 <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h2 className="text-6xl font-serif text-myth-gold glow-gold">Oracle's Sanctum</h2>
                    <p className="text-gray-400 font-serif italic text-xl">"Speak your truth, and the void shall whisper back."</p>
                 </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="ornament p-8 h-full flex flex-col">
                  <div className="flex-1 space-y-6 mb-8">
                    {aiLore ? (
                      <div className="p-8 border-myth-gold/20 bg-white/5 border relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-myth-gold/50" />
                        <p className="text-2xl font-serif text-purple-100/90 leading-loose italic">
                          {aiLore}
                        </p>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-600 italic">
                        The Oracle awaits your inquiry...
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-4 p-1 border border-myth-gold/30 bg-black/40">
                      <input
                        type="text"
                        placeholder="Ask the ancients..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') generateAILore((e.target as HTMLInputElement).value);
                        }}
                        className="flex-1 bg-transparent px-6 py-4 text-white focus:outline-none font-serif italic text-lg"
                      />
                      <button
                          onClick={() => {
                            const input = document.querySelector('input') as HTMLInputElement;
                            if (input.value) generateAILore(input.value);
                          }}
                          className="px-10 bg-myth-gold text-black uppercase tracking-widest font-bold hover:bg-yellow-200 transition-all disabled:opacity-50"
                          disabled={isGenerating}
                      >
                        {isGenerating ? <Loader2 className="animate-spin" /> : 'Inquire'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                  <div className="ornament p-1 bg-myth-gold/10">
                    <div className="bg-black/80 overflow-hidden relative">
                      <div className="p-4 bg-myth-gold/20 border-b border-myth-gold/30 medieval-text text-myth-gold flex justify-between">
                         <span>Chronos Stone Activity</span>
                         <span className="text-green-500">Resonating</span>
                      </div>
                      <MagicalArtifact />
                      <div className="p-6 text-center italic text-gray-500 border-t border-myth-gold/10">
                         "A fragment of creation, pulsing with arcane light."
                      </div>
                    </div>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* GEOMETRIC FOOTER */}
      <footer className="h-16 flex justify-between items-center text-[10px] tracking-[0.2em] border-t border-myth-gold/20 px-8 medieval-text opacity-60 bg-myth-dark/80 backdrop-blur-md">
        <div>© 3042 MYTHORIA CHRONICLES</div>
        <div className="flex gap-8">
           <div className="flex items-center gap-2">
             <div className="w-1 h-1 bg-myth-gold animate-pulse rounded-full" />
             LAT: 45.2N / LON: 12.9W
           </div>
           <div>SYSTEM: ONLINE</div>
        </div>
      </footer>

      {/* Floating HUD Elements */}
      {user && (
        <div className="fixed bottom-24 right-8 z-50 flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-myth-gold text-black rounded-sm rotate-45 border border-white shadow-2xl flex items-center justify-center glow-gold"
            title="Spells & Magic"
            id="spellbook-btn"
          >
            <Zap size={24} className="-rotate-45" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-purple-900 border border-purple-500 text-white rounded-sm rotate-45 shadow-2xl flex items-center justify-center glow-purple"
            title="Character Sheet"
            id="profile-btn"
          >
            <Shield size={24} className="-rotate-45" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
