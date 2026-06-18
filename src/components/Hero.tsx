import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface HeroProps {
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const sequences = [
    { text: "Ready to scale your business?", highlight: "scale" },
    { text: "Decoding complex data into actionable insights.", highlight: "actionable insights" },
    { text: "Let's build the future together.", highlight: "future" }
  ];

  useEffect(() => {
    // Cycle through sequences every 4 seconds
    const interval = setInterval(() => {
      setSequenceIndex((prev) => (prev + 1) % sequences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sequences.length]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const renderTextWithHighlight = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyan-400 to-cyber-secondary font-black drop-shadow-sm filter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[400px] h-[400px] top-1/4 left-1/4 bg-cyber-primary" 
        style={{ opacity: isDarkMode ? 0.2 : 0.08, animationDuration: '8s' }}
      />
      <div 
        className="blur-blob w-[400px] h-[400px] bottom-1/4 right-1/4 bg-cyber-secondary" 
        style={{ opacity: isDarkMode ? 0.2 : 0.08, animationDuration: '10s' }}
      />

      {/* Radial overlay to focus the center */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-[radial-gradient(ellipse_at_center,rgba(11,12,22,0)_0%,rgba(11,12,22,0.8)_80%)]' : 'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_80%)]'}`} pointer-events-none="true" />

      <div className="cyber-grid absolute inset-0 z-0 opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center justify-center text-center flex-grow">
        
        <div className="h-40 flex items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={sequenceIndex}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight absolute w-full ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {renderTextWithHighlight(sequences[sequenceIndex].text, sequences[sequenceIndex].highlight)}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>


    </section>
  );
};
