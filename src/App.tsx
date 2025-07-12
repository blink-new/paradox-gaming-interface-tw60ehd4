import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoaderScreen from './components/LoaderScreen';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Paradox2 from './components/Paradox2';
import DiscordTab from './components/DiscordTab';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'discord':
        return <DiscordTab />;
      case 'shutdown':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-orbitron font-black text-[#ff0033] text-glow">
                SYSTEM SHUTDOWN
              </div>
              <div className="text-xl font-rajdhani text-[#ff003380]">
                Initiating shutdown sequence...
              </div>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-orbitron font-black text-[#ff0033] text-glow">
                NETWORK
              </div>
              <div className="text-xl font-rajdhani text-[#ff003380]">
                Spider web connections coming soon...
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-orbitron font-black text-[#ff0033] text-glow">
                SETTINGS
              </div>
              <div className="text-xl font-rajdhani text-[#ff003380]">
                Serrated edge sliders coming soon...
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a0005] overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoaderScreen key="loader" onLoadComplete={handleLoadComplete} />
        ) : (
          <div key="main" className="flex h-screen">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 ml-20">
              {activeTab === 'home' && (
                <div className="grid grid-cols-2 h-full">
                  <HomePage />
                  <Paradox2 />
                </div>
              )}
              {activeTab !== 'home' && renderActiveTab()}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;