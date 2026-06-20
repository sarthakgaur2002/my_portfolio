import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDarkMode
            ? 'bg-cyber-bg/80 border-b border-white/5 backdrop-blur-md shadow-glass shadow-black/20'
            : 'bg-white/80 border-b border-black/5 backdrop-blur-md shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => scrollTo('home')}
            className="flex items-center cursor-pointer group"
          >
            <span className={`text-lg font-bold tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'} hover:text-cyber-primary transition-colors`}>
              SARTHAK<span className="text-cyber-primary">.</span>GAUR
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 py-2 hover:text-cyber-primary ${
                  activeSection === item.id
                    ? isDarkMode ? 'text-cyber-primary' : 'text-cyber-lightPrimary'
                    : isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full ${
                    isDarkMode ? 'bg-cyber-primary shadow-neon-blue' : 'bg-cyber-lightPrimary'
                  }`} />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 hover:border-cyber-primary hover:text-cyber-primary text-gray-300' 
                  : 'border-black/10 hover:border-cyber-lightPrimary hover:text-cyber-lightPrimary text-slate-600'
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a
              href="/sarthak_resume.pdf"
              download="Sarthak_Gaur_Resume.pdf"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm border transition-all duration-300 ${
                isDarkMode
                  ? 'border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 hover:border-cyber-primary shadow-neon-blue'
                  : 'border-cyber-lightPrimary/40 text-cyber-lightPrimary hover:bg-cyber-lightPrimary/10 hover:border-cyber-lightPrimary'
              }`}
            >
              <Download size={16} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 hover:border-cyber-primary text-gray-300' 
                  : 'border-black/10 hover:border-cyber-lightPrimary text-slate-600'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 text-white hover:border-cyber-primary' 
                  : 'border-black/10 text-slate-900 hover:border-cyber-lightPrimary'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-20 left-0 w-full border-b transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          isDarkMode 
            ? 'bg-cyber-bg/95 border-white/5 shadow-glass' 
            : 'bg-white/95 border-black/5 shadow-lg'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeSection === item.id
                  ? isDarkMode
                    ? 'bg-cyber-primary/10 text-cyber-primary border-l-4 border-cyber-primary'
                    : 'bg-cyber-lightPrimary/10 text-cyber-lightPrimary border-l-4 border-cyber-lightPrimary'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-white/5'
                    : 'text-slate-600 hover:bg-black/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 px-4">
            <a
              href="/sarthak_resume.pdf"
              download="Sarthak_Gaur_Resume.pdf"
              className={`flex items-center justify-center space-x-2 w-full py-3 rounded-lg text-center font-semibold text-sm border transition-all ${
                isDarkMode
                  ? 'border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 shadow-neon-blue'
                  : 'border-cyber-lightPrimary/40 text-cyber-lightPrimary hover:bg-cyber-lightPrimary/10'
              }`}
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
