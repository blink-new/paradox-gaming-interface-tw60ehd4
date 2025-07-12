import { motion } from 'framer-motion';
import { Home, MessageCircle, Power, Wifi, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'PARADOX', icon: Home },
    { id: 'discord', label: 'Discord', icon: MessageCircle },
    { id: 'shutdown', label: 'Shut Down', icon: Power },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-[#1a0005] to-[#0a0a0a] border-r-2 border-[#ff0033] border-glow z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center py-8 space-y-6">
        {/* Logo */}
        <motion.div 
          className="text-2xl font-orbitron font-black text-[#ff0033] text-glow mb-8"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Ψ
        </motion.div>

        {/* Navigation items */}
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              relative w-14 h-14 rounded-lg border-2 transition-all duration-300
              flex items-center justify-center group
              ${activeTab === item.id 
                ? 'bg-[#ff0033] border-[#ff0044] text-black' 
                : 'bg-[#1a0005] border-[#ff0033] text-[#ff0033] hover:bg-[#ff003320] hover:border-[#ff0044]'
              }
            `}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px #ff0033, 0 0 40px #ff0033'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon className="w-6 h-6" />
            
            {/* Liquid bleeding effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ff0033] to-[#aa0022] opacity-0 group-hover:opacity-20"
              initial={false}
              animate={{ opacity: activeTab === item.id ? 0.3 : 0 }}
              whileHover={{ opacity: 0.2 }}
            />

            {/* Tooltip */}
            <motion.div
              className="absolute left-20 bg-[#1a0005] border border-[#ff0033] rounded px-2 py-1 text-sm font-rajdhani text-[#ff0033] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.div>

            {/* Active indicator */}
            {activeTab === item.id && (
              <motion.div
                className="absolute -right-1 top-1/2 w-2 h-8 bg-[#ff0033] rounded-l"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="w-8 h-1 bg-[#ff0033] rounded"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}