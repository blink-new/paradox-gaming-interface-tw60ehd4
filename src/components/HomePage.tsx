import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Animated circuit background */}
      <div className="absolute inset-0 opacity-30">
        {/* Circuit lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#ff0022] to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Pulsing nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 bg-[#ff0022] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-12">
          {/* Main PARADOX title */}
          <motion.div
            className="relative"
            onHoverStart={() => setIsGlitching(true)}
            onHoverEnd={() => setIsGlitching(false)}
          >
            <motion.h1 
              className="text-8xl font-orbitron font-black text-[#ff0033] select-none cursor-pointer"
              style={{
                textShadow: '0 0 20px #ff0033, 0 0 40px #ff0033, 0 0 60px #ff0033'
              }}
              animate={isGlitching ? {
                x: [0, -2, 2, -1, 1, 0],
                textShadow: [
                  '0 0 20px #ff0033, 0 0 40px #ff0033',
                  '2px 0 0 #ff0033, -2px 0 0 #00ff00, 0 0 0 #ff0033',
                  '0 0 20px #ff0033, 0 0 40px #ff0033'
                ]
              } : {
                textShadow: [
                  '0 0 20px #ff0033, 0 0 40px #ff0033',
                  '0 0 30px #ff0033, 0 0 50px #ff0033, 0 0 70px #ff0033',
                  '0 0 20px #ff0033, 0 0 40px #ff0033'
                ]
              }}
              transition={{ 
                duration: isGlitching ? 0.1 : 3,
                repeat: Infinity,
                ease: isGlitching ? "linear" : "easeInOut"
              }}
            >
              PARADOX
            </motion.h1>

            {/* Holographic overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff003350] to-transparent"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl font-rajdhani text-[#ff0033] opacity-75 tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            GAMING INTERFACE v2.0
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex space-x-8 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#1a0005] to-[#ff003320] border-2 border-[#ff0033] rounded-lg font-rajdhani font-bold text-[#ff0033] tracking-wider group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px #ff0033'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">ENTER SYSTEM</span>
              <motion.div
                className="absolute inset-0 bg-[#ff0033] opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-[#ff003350] rounded-lg font-rajdhani font-bold text-[#ff003580] tracking-wider hover:border-[#ff0033] hover:text-[#ff0033] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ACCESS LOGS
            </motion.button>
          </motion.div>

          {/* Gothic decorative elements */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <motion.div 
              className="flex space-x-8 text-[#ff0033] opacity-40"
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-2xl font-orbitron">◊</span>
              <span className="text-3xl font-orbitron">♦</span>
              <span className="text-2xl font-orbitron">◊</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 right-8 opacity-50">
        <motion.div
          className="w-16 h-16 border-2 border-[#ff0033] rounded-lg rotate-45"
          animate={{ rotate: [45, 135, 45] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="absolute bottom-8 left-8 opacity-50">
        <motion.div
          className="w-12 h-12 border-2 border-[#ff0033] rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
}