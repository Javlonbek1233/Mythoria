import { motion } from 'motion/react';
import { Cloud, CloudRain, CloudLightning, Sun, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

type WeatherType = 'calm' | 'rainy' | 'stormy' | 'windy';

export function DynamicWeather() {
  const [weather, setWeather] = useState<WeatherType>('calm');

  useEffect(() => {
    const interval = setInterval(() => {
      const types: WeatherType[] = ['calm', 'rainy', 'stormy', 'windy'];
      setWeather(types[Math.floor(Math.random() * types.length)]);
    }, 30000); // Change weather every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {weather === 'rainy' && (
        <div className="absolute inset-0 bg-blue-900/10 transition-colors duration-1000">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-8 bg-blue-400/30"
              initial={{ x: Math.random() * 100 + 'vw', y: -100 }}
              animate={{ y: '110vh' }}
              transition={{
                duration: 0.5 + Math.random(),
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {weather === 'stormy' && (
        <>
          <div className="absolute inset-0 bg-purple-900/20 transition-colors duration-1000" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0, 0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5
            }}
            className="absolute inset-0 bg-white"
          />
        </>
      )}

      {weather === 'windy' && (
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-white/10"
              style={{ width: Math.random() * 200 + 'px', top: Math.random() * 100 + 'vh' }}
              initial={{ x: '-100vw' }}
              animate={{ x: '100vw' }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      )}

      {/* Weather Indicator (Subtle) */}
      <div className="absolute bottom-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded border border-white/5 flex items-center gap-2 text-xs text-gray-500 font-serif">
        {weather === 'calm' && <Sun size={12} />}
        {weather === 'rainy' && <CloudRain size={12} />}
        {weather === 'stormy' && <CloudLightning size={12} />}
        {weather === 'windy' && <Wind size={12} />}
        <span className="uppercase tracking-widest">{weather}</span>
      </div>
    </div>
  );
}
