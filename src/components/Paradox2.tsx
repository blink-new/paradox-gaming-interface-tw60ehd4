import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crosshair } from 'lucide-react';

export default function Paradox2() {
  const [isAimbot, setIsAimbot] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAimbot(!isAimbot);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="flex-1 relative overflow-hidden bg-black">
      {/* Crosshair grid background */}
      <div className="absolute inset-0 opacity-20">
        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px h-full bg-[#ff0033]"
            style={{ left: `${(i + 1) * 5}%` }}
            animate={{
              opacity: isAimbot ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Horizontal lines */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px w-full bg-[#ff0033]"
            style={{ top: `${(i + 1) * 6.67}%` }}
            animate={{
              opacity: isAimbot ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
      </div>

      {/* Central crosshair */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={isAimbot ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        } : {
          scale: [1, 0.9, 1],
          rotate: [0, -2, 0]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Crosshair 
          className={`w-16 h-16 ${isAimbot ? 'text-[#ff0033]' : 'text-[#ff003350]'}`}
          style={{
            filter: isAimbot ? 'drop-shadow(0 0 20px #ff0033)' : 'none'
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-12">
          {/* Title */}
          <motion.h1 
            className="text-6xl font-orbitron font-black text-[#ff0033] text-glow"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PARADOX 2
          </motion.h1>

          {/* Toggle container */}
          <motion.div 
            className="relative bg-gradient-to-r from-[#1a0005] to-[#0a0a0a] p-8 rounded-2xl border-2 border-[#ff0033] border-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Mode labels */}
            <div className="flex justify-between items-center mb-8">
              <span className={`font-rajdhani font-bold text-xl ${isAimbot ? 'text-[#ff0033] text-glow' : 'text-[#ff003350]'}`}>
                AIMBOT
              </span>
              <span className={`font-rajdhani font-bold text-xl ${!isAimbot ? 'text-[#ff0033] text-glow' : 'text-[#ff003350]'}`}>
                AIMDRAG
              </span>
            </div>

            {/* Cyber skull toggle */}
            <div className="relative">
              <motion.div
                className="w-64 h-32 bg-gradient-to-r from-[#ff003320] to-[#ff003310] rounded-full border-2 border-[#ff0033] relative cursor-pointer"
                onClick={handleToggle}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Toggle track */}
                <motion.div
                  className="absolute inset-2 bg-[#0a0a0a] rounded-full"
                />

                {/* Skull slider */}
                <motion.div
                  className="absolute top-1/2 w-24 h-24 transform -translate-y-1/2 transition-all duration-500"
                  animate={{
                    left: isAimbot ? '8px' : 'calc(100% - 104px)',
                    rotate: isTransitioning ? 180 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative w-full h-full">
                    {/* Skull base */}
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-[#ff0033] to-[#aa0022] rounded-full border-2 border-[#ff0044] flex items-center justify-center relative overflow-hidden"
                      animate={isTransitioning ? {
                        scale: [1, 0.8, 1.2, 1],
                      } : {}}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Skull eyes */}
                      <div className="flex space-x-3">
                        <motion.div
                          className="w-3 h-4 bg-black rounded-full"
                          animate={isAimbot ? {
                            boxShadow: [
                              '0 0 5px #ff0033',
                              '0 0 15px #ff0033, 0 0 25px #ff0033',
                              '0 0 5px #ff0033'
                            ]
                          } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-3 h-4 bg-black rounded-full"
                          animate={isAimbot ? {
                            boxShadow: [
                              '0 0 5px #ff0033',
                              '0 0 15px #ff0033, 0 0 25px #ff0033',
                              '0 0 5px #ff0033'
                            ]
                          } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>

                      {/* Skull mouth/jaw */}
                      <motion.div
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-t-lg"
                        animate={!isAimbot ? {
                          y: [0, 2, 0],
                          scaleY: [1, 1.3, 1]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />

                      {/* Liquid metal effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff004450] to-transparent rounded-full"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Status indicator */}
            <div className="mt-8 text-center">
              <motion.div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  isAimbot 
                    ? 'bg-[#ff003320] border-[#ff0033] text-[#ff0033]' 
                    : 'bg-[#ff003310] border-[#ff003350] text-[#ff003380]'
                }`}
                animate={{
                  boxShadow: isAimbot ? [
                    '0 0 10px #ff0033',
                    '0 0 20px #ff0033, 0 0 30px #ff0033',
                    '0 0 10px #ff0033'
                  ] : 'none'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    isAimbot ? 'bg-[#ff0033]' : 'bg-[#ff003350]'
                  }`}
                  animate={isAimbot ? {
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-rajdhani font-bold">
                  {isAimbot ? 'AIMBOT ACTIVE' : 'AIMDRAG MODE'}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional controls */}
          <motion.div 
            className="flex space-x-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button className="px-6 py-3 bg-[#1a0005] border border-[#ff0033] rounded-lg font-rajdhani text-[#ff0033] hover:bg-[#ff003320] transition-all duration-300">
              CALIBRATE
            </button>
            <button className="px-6 py-3 bg-[#1a0005] border border-[#ff0033] rounded-lg font-rajdhani text-[#ff0033] hover:bg-[#ff003320] transition-all duration-300">
              RESET
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}