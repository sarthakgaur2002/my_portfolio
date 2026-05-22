import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Cpu } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('BOOTING SYSTEM CORE...');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Loading Progress Animation
  useEffect(() => {
    if (!loading) return;
    
    const progressInterval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500); // Small delay for smooth exit
          return 100;
        }
        
        // Dynamic loading text indicators
        if (prev === 20) setLoadingText('INITIALIZING VECTOR GRID...');
        if (prev === 45) setLoadingText('ESTABLISHING INTERACTIVE NETWORKS...');
        if (prev === 70) setLoadingText('IMPORTING RESUME DATA NODES...');
        if (prev === 90) setLoadingText('SURFACING DASHBOARD INSIGHTS...');

        const step = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [loading]);

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
      <Analytics />
      <AnimatePresence mode="wait">
        {loading ? (
          /* PRELOADER SCREEN */
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#020208] flex flex-col justify-center items-center p-6 select-none"
          >
            <div className="max-w-md w-full space-y-8 text-center">
              {/* Spinner/Cpu Icon */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center mx-auto shadow-neon-blue"
              >
                <Cpu size={32} className="text-white" />
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyan-400">
                  SARTHAK GAUR
                </h2>
                <div className="text-xs font-mono text-gray-500 tracking-wider">
                  DATA ANALYST PORTFOLIO v2.0
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>{loadingText}</span>
                  <span className="text-cyber-primary font-bold">{loadProgress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* PORTFOLIO CONTENT */
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
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
