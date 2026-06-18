import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Theme Toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#020208';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f8fafc';
    }
  }, [isDarkMode]);

  // Track Mouse coordinates for cursor glow
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <>
      {/* PORTFOLIO CONTENT */}
      <motion.div
        key="portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-[#020208] text-gray-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {/* Custom Mouse Glow Overlay */}
        <div
          className={isDarkMode ? 'cursor-glow' : 'cursor-glow-light'}
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />

        {/* Particle background layer */}
        <ParticleBackground isDarkMode={isDarkMode} />

        {/* Layout assembly */}
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main>
          <Hero isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} />
          <Skills isDarkMode={isDarkMode} />
          <Projects isDarkMode={isDarkMode} />
          <Experience isDarkMode={isDarkMode} />
          <Contact isDarkMode={isDarkMode} />
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </motion.div>
    </>
  );
}

export default App;
