import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderScreenProps {
  onLoadComplete: () => void;
}

export default function LoaderScreen({ onLoadComplete }: LoaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('INITIALIZING SYSTEM...');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const loadingTexts = [
    'INITIALIZING SYSTEM...',
    'CONNECTING TO SERVERS...',
    'LOADING MODULES...',
    'CONFIGURING INTERFACE...',
    'SYNTHETIC READY'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 1500);
          return 100;
        }
        
        // Update loading text based on progress
        const textIndex = Math.floor((prev / 100) * loadingTexts.length);
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex]);
        }
        
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Generate floating particles
  useEffect(() => {
    const particleInterval = setInterval(() => {
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      
      setParticles(prev => [...prev.slice(-20), ...newParticles]);
    }, 200);

    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgb(139, 92, 246)"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{ left: particle.x, top: particle.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [0, -100]
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        
        {/* Top branding */}
        <motion.div 
          className="absolute top-8 right-8 flex items-center space-x-6 text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-purple-400 font-mono">SYNTHETIC</span>
          <span className="text-gray-500">Server</span>
          <span className="text-purple-300">144FPS</span>
          <span className="text-gray-500">62PING</span>
          <span className="text-purple-300 font-mono">12:15PM</span>
        </motion.div>

        {/* Central loader */}
        <div className="flex flex-col items-center space-y-12">
          
          {/* Main logo/symbol */}
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Outer ring */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                {/* Background circle */}
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="rgb(75, 85, 99)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="rgb(139, 92, 246)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  className="drop-shadow-[0_0_8px_rgb(139,92,246)]"
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-center"
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgb(139, 92, 246)',
                      '0 0 20px rgb(139, 92, 246)',
                      '0 0 10px rgb(139, 92, 246)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    Ψ
                  </div>
                  <div className="text-lg font-mono text-purple-300">
                    {Math.round(progress)}%
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.h1 
              className="text-2xl font-mono text-purple-400 tracking-wider"
              key={currentText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentText}
            </motion.h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div 
            className="w-80 h-1 bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 320 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Loading dots */}
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom decorative elements */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8 text-gray-500 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>SYS_OK</span>
          <span>NET_CONNECTED</span>
          <span>AUTH_VERIFIED</span>
        </motion.div>

        {/* Hexagonal icons in top left (like reference) */}
        <motion.div 
          className="absolute top-8 left-8 grid grid-cols-3 gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gray-800 border border-gray-600 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              <div className="w-3 h-3 bg-purple-400/30 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}