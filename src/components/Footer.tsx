import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`relative border-t py-12 overflow-hidden ${
      isDarkMode ? 'bg-[#020208] border-white/5' : 'bg-slate-50 border-black/5'
    }`}>
      {/* Footer Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        {/* Logo and Top Trigger */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-primary to-cyber-secondary flex items-center justify-center font-bold text-sm text-white shadow-neon-blue">
              SG
            </div>
            <span className={`text-lg font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              SARTHAK<span className="text-cyber-primary">.</span>GAUR
            </span>
          </div>

          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} font-mono`}>
            Built with passion &amp; data.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/sarthakgaur2002"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'border-white/5 text-gray-400 hover:text-cyber-primary hover:border-cyber-primary hover:shadow-neon-blue/20' 
                  : 'border-black/5 text-slate-600 hover:text-cyber-lightPrimary hover:border-cyber-lightPrimary'
              }`}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/sarthakgaur2002"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'border-white/5 text-gray-400 hover:text-cyber-secondary hover:border-cyber-secondary hover:shadow-neon-purple/20' 
                  : 'border-black/5 text-slate-600 hover:text-cyber-lightSecondary hover:border-cyber-lightSecondary'
              }`}
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:sarthakgaur2002@gmail.com"
              className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'border-white/5 text-gray-400 hover:text-cyber-primary hover:border-cyber-primary hover:shadow-neon-blue/20' 
                  : 'border-black/5 text-slate-600 hover:text-cyber-lightPrimary hover:border-cyber-lightPrimary'
              }`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono">
          <p>© {currentYear} Sarthak Gaur. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            SYSTEM STATUS: <span className="text-green-500 animate-pulse">● OPTIMIZED</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
