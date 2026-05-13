import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const REGIONS = [
  { id: 'eldoria', name: 'Eldoria', x: 250, y: 150, description: 'The Kingdom of Light and Order.' },
  { id: 'shadowfen', name: 'Shadowfen', x: 150, y: 450, description: 'A misty swamp of ancient secrets.' },
  { id: 'ironhold', name: 'Ironhold', x: 600, y: 100, description: 'Forged in the heart of the mountains.' },
  { id: 'mistral', name: 'Mistral Isles', x: 700, y: 400, description: 'Floating islands in the eternal sky.' },
];

export function InteractiveMap({ onRegionSelect }: { onRegionSelect: (region: any) => void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full bg-myth-dark overflow-hidden group">
      {/* Mystical Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,29,150,0.1)_0%,transparent_70%)]" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c5a059 1px, transparent 0)', backgroundSize: '20px 20px' }} />

      {/* SVG Map Path (Stylized) */}
      <svg viewBox="0 0 800 600" className="w-full h-full preserve-3d">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Decorative Geometric Lines */}
        <path
          d="M 50 50 L 750 50 L 750 550 L 50 550 Z"
          stroke="rgba(197, 160, 89, 0.1)"
          fill="none"
          strokeWidth="1"
        />

        {REGIONS.map((region) => (
          <motion.g
            key={region.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => onRegionSelect(region)}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {/* Region Marker - Geometric style */}
            <rect
              x={region.x - 10}
              y={region.y - 10}
              width="20"
              height="20"
              transform={`rotate(45 ${region.x} ${region.y})`}
              fill={hoveredRegion === region.id ? '#c5a059' : 'transparent'}
              stroke="#c5a059"
              strokeWidth="2"
              filter={hoveredRegion === region.id ? 'url(#glow)' : ''}
              className="transition-all duration-300"
            />
            
            {/* Outer Ring */}
            <circle
              cx={region.x}
              cy={region.y}
              r="25"
              fill="none"
              stroke="#c5a059"
              strokeWidth="1"
              strokeOpacity="0.1"
              className="animate-pulse"
            />

            {/* Region Label */}
            <text
              x={region.x}
              y={region.y + 45}
              textAnchor="middle"
              className="fill-white font-serif text-[10px] tracking-widest uppercase pointer-events-none opacity-60"
            >
              {region.name}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Region Info Overlay */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-6 left-6 ornament p-6 max-w-xs ornament-tl ornament-tr shadow-2xl z-20"
          >
            <h3 className="text-myth-gold medieval-text text-sm mb-2 border-b border-myth-gold/20 pb-2">
              {REGIONS.find(r => r.id === hoveredRegion)?.name}
            </h3>
            <p className="text-gray-400 font-serif italic text-sm leading-relaxed">
              "{REGIONS.find(r => r.id === hoveredRegion)?.description}"
            </p>
            <div className="mt-4 flex gap-2">
              <div className="w-1 h-1 bg-myth-gold" />
              <div className="w-1 h-1 bg-myth-gold/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compass / Metadata Decor */}
      <div className="absolute top-6 right-6 w-32 h-32 opacity-20 pointer-events-none border border-myth-gold/10 rounded-full flex items-center justify-center">
         <div className="absolute w-full h-[1px] bg-myth-gold/20 rotate-45" />
         <div className="absolute w-full h-[1px] bg-myth-gold/20 -rotate-45" />
         <div className="w-16 h-16 border border-myth-gold/20 flex items-center justify-center text-[8px] medieval-text text-myth-gold">
            AXIS_α
         </div>
      </div>
    </div>
  );
}
