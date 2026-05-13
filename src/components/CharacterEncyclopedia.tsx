import { motion, AnimatePresence } from 'motion/react';
import { Book, X, Zap, Shield, Flame, Droplets, Mountain, Wind, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

const CHARACTERS = [
  {
    id: '1',
    name: 'Aurelius Dawnseeker',
    title: 'The Eternal Knight',
    description: 'A champion of the Light who has guarded Eldoria for centuries.',
    lore: 'Aurelius was the first to receive the blessing of the Sun God. His shield is said to be forged from the first ray of dawn.',
    element: 'Light',
    rarity: 'Legendary',
    icon: Sun
  },
  {
    id: '2',
    name: 'Vaelin Frostbane',
    title: 'Shadow Weaver',
    description: 'A rogue who manipulates the mists of Shadowfen.',
    lore: 'Born in the heart of the black swamps, Vaelin learned to whisper to the shadows. Many fear his cold touch.',
    element: 'Shadow',
    rarity: 'Epic',
    icon: Moon
  },
  {
    id: '3',
    name: 'Grimm Rockheart',
    title: 'High Forge-Master',
    description: 'The eldest dwarf of Ironhold, master of fire and metal.',
    lore: 'Grimm has crafted every legendary blade in the kingdom. His beard is singed by the dragon-fires of the deep forge.',
    element: 'Fire',
    rarity: 'Rare',
    icon: Flame
  }
];

export function CharacterEncyclopedia() {
  const [selectedChar, setSelectedChar] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CHARACTERS.map((char) => (
        <motion.div
          key={char.id}
          layoutId={`char-${char.id}`}
          onClick={() => setSelectedChar(char)}
          className="ornament p-6 cursor-pointer group hover:glow-gold relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-myth-gold/30 group-hover:text-myth-gold">
            <char.icon size={20} />
          </div>
          <h3 className="text-xl font-serif text-myth-gold mb-1">{char.name}</h3>
          <p className="medieval-text text-purple-400 mb-4 italic opacity-80">{char.title}</p>
          <p className="text-gray-400 text-sm line-clamp-2 italic">"{char.description}"</p>

          <div className="mt-6 flex items-center justify-between border-t border-myth-gold/10 pt-4">
            <span className={`medieval-text text-[8px] px-2 py-0.5 border ${
              char.rarity === 'Legendary' ? 'border-myth-gold text-myth-gold' :
              char.rarity === 'Epic' ? 'border-purple-500 text-purple-500' :
              'border-blue-500 text-blue-500'
            }`}>
              {char.rarity}
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-myth-gold" />
              <div className="w-1 h-1 bg-myth-gold/50" />
              <div className="w-1 h-1 bg-myth-gold/20" />
            </div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedChar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChar(null)}
              className="absolute inset-0 bg-myth-dark/90 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`char-${selectedChar.id}`}
              className="relative w-full max-w-2xl bg-[#0f0f12] border border-myth-gold/40 ornament p-1 overflow-hidden"
            >
              <div className="bg-[#0f0f12] p-10 h-full">
                <button
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-myth-gold transition-colors"
                  id="close-button"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-24 h-24 border-2 border-myth-gold p-1 mb-6 rotate-45 flex items-center justify-center">
                    <selectedChar.icon size={40} className="text-myth-gold -rotate-45" />
                  </div>
                  <h2 className="text-4xl font-serif text-white tracking-[0.2em]">{selectedChar.name}</h2>
                  <p className="medieval-text text-myth-gold mt-2">{selectedChar.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10 border-y border-myth-gold/10 py-6">
                  <div className="text-center">
                    <h4 className="medieval-text text-purple-400 mb-2">Element</h4>
                    <p className="text-white font-serif">{selectedChar.element}</p>
                  </div>
                  <div className="text-center border-l border-myth-gold/10">
                    <h4 className="medieval-text text-purple-400 mb-2">Rarity</h4>
                    <p className="text-myth-gold font-serif">{selectedChar.rarity}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-myth-gold/20" />
                    <h4 className="medieval-text text-myth-gold/60 mb-3">The Ancient Lore</h4>
                    <p className="text-gray-300 leading-relaxed font-serif text-xl italic tracking-wide">
                      "{selectedChar.lore}"
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-myth-gold/10">
                  <button className="w-full py-4 bg-myth-gold/5 border border-myth-gold/30 medieval-text text-myth-gold hover:bg-myth-gold/20 transition-all">
                    Unseal Hidden Knowledge
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
