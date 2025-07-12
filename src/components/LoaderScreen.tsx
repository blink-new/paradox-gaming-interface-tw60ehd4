import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderScreenProps {
  onLoadComplete: () => void;
}

export default function LoaderScreen({ onLoadComplete }: LoaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Generate particles when progress is high
  useEffect(() => {
    if (progress > 70) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 400,
        y: Math.random() * 400
      }));
      setParticles(newParticles);
    }
  }, [progress]);

  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a0005] bg-hexagon"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-[#ff0033] rounded-full"
          style={{ left: particle.x, top: particle.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}

      {/* Main loader container */}
      <div className="flex flex-col items-center space-y-8">
        {/* Gothic ring loader */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Outer decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#ff003330] animate-spin" 
               style={{ width: '280px', height: '280px' }}>
            {/* Gothic spikes */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-[#ff0033] rotate-45"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-140px)`
                }}
              />
            ))}
          </div>

          {/* Main progress ring */}
          <svg width="250" height="250" className="relative z-10">
            {/* Background ring */}
            <circle
              cx="125"
              cy="125"
              r="120"
              fill="none"
              stroke="#ff003320"
              strokeWidth="8"
            />
            
            {/* Progress ring with liquid metal effect */}
            <motion.circle
              cx="125"
              cy="125"
              r="120"
              fill="none"
              stroke="url(#liquidGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 125 125)"
              className="drop-shadow-[0_0_20px_#ff0033]"
              animate={{
                filter: progress > 90 ? [
                  'drop-shadow(0 0 20px #ff0033)',
                  'drop-shadow(0 0 30px #ff0033) drop-shadow(0 3px 0 #ff0033)',
                  'drop-shadow(0 0 20px #ff0033)'
                ] : 'drop-shadow(0 0 20px #ff0033)'
              }}
              transition={{ duration: 0.8, repeat: progress > 90 ? Infinity : 0 }}
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0033" />
                <stop offset="50%" stopColor="#aa0022" />
                <stop offset="100%" stopColor="#ff0044" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center logo/symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-6xl font-orbitron font-black text-[#ff0033] text-glow"
              animate={{
                textShadow: [
                  '0 0 10px #ff0033',
                  '0 0 20px #ff0033, 0 0 30px #ff0033',
                  '0 0 10px #ff0033'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ψ
            </motion.div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl font-orbitron font-bold text-[#ff0033] text-glow tracking-wider">
            LOADING PARADOX...
          </h1>
          <div className="text-xl font-rajdhani text-[#ff0033] opacity-75">
            {progress}%
          </div>
        </motion.div>

        {/* Gothic decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div 
            className="flex space-x-4 text-[#ff0033] opacity-50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-orbitron">◊</span>
            <span className="font-orbitron">♦</span>
            <span className="font-orbitron">◊</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}