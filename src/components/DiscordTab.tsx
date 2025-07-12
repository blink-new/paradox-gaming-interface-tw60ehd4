import { motion } from 'framer-motion';
import { Send, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

export default function DiscordTab() {
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const mockMessages = [
    { user: 'ShadowKnight', message: 'Anyone up for a match?', time: '14:32' },
    { user: 'BloodReaper', message: 'Aimbot settings are perfect now', time: '14:35' },
    { user: 'DarkLord99', message: 'PARADOX interface is sick!', time: '14:38' },
  ];

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="h-full bg-gradient-to-br from-[#1a0005] to-[#0a0a0a] p-8">
        <motion.div 
          className="h-full bg-black bg-opacity-50 rounded-2xl border-2 border-[#ff0033] border-glow overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ff003320] to-[#ff003310] p-4 border-b border-[#ff0033]">
            <h2 className="font-orbitron font-bold text-xl text-[#ff0033] text-glow">
              # PARADOX-GAMING
            </h2>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 space-y-4 h-[calc(100%-140px)] overflow-y-auto">
            {mockMessages.map((msg, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-8 h-8 bg-[#ff0033] rounded-full flex items-center justify-center font-orbitron font-bold text-black text-sm">
                  {msg.user[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-rajdhani font-bold text-[#ff0033]">{msg.user}</span>
                    <span className="text-xs text-[#ff003350]">{msg.time}</span>
                  </div>
                  <p className="text-[#ff0033] opacity-80 font-rajdhani">{msg.message}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-[#ff0033] bg-[#1a0005]">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-[#0a0a0a] border border-[#ff0033] rounded-lg px-4 py-2 text-[#ff0033] placeholder-[#ff003350] font-rajdhani focus:outline-none focus:border-[#ff0044] focus:ring-2 focus:ring-[#ff003350]"
                />
              </div>
              <motion.button
                className="p-2 bg-[#ff0033] text-black rounded-lg hover:bg-[#ff0044] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted 
                    ? 'bg-[#ff003350] text-[#ff0033]' 
                    : 'bg-[#ff0033] text-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}