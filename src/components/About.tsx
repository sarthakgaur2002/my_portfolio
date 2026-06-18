import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Download, BarChart2, Database } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Typing effect state
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    'Data Analyst',
    'Business Analyst',
    'Product-minded Analyst',
    'Dashboard & Insights Specialist'
  ];

  // Typing effect logic
  useEffect(() => {
    let timer: number;
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        } else {
          timer = setTimeout(handleType, typingSpeed);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Max rotation 15deg
    setRotateX(-y / (box.height / 30));
    setRotateY(x / (box.width / 30));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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

  const stats = [
    { value: '2+', label: 'Years of Experience' },
    { value: '250+', label: 'Metrics Tracked & Managed' },
    { value: '$1M+', label: 'Marketing Budget Saved' },
    { value: '30+', label: 'Dashboards Developed' }
  ];

  const journeySteps = [
    {
      year: '2020 - 2024',
      title: 'B.Tech in Electronics & Communication',
      institution: 'Guru Tegh Bahadur Institute of Technology',
      desc: 'Built foundation in AI, Machine Learning, Robotics, and Embedded Systems. Graduated with a 9.0 CGPA.'
    },
    {
      year: 'Summer 2023',
      title: 'Business Analyst Intern',
      institution: 'InFeedo',
      desc: 'Cleaned and integrated 5 core data sources. Reduced downstream reporting errors by 30%.'
    },
    {
      year: '2023 - 2024',
      title: 'Business Analyst',
      institution: 'InFeedo',
      desc: 'Re-engineered Salesforce CRM logic, boosting lead conversion by 35% and saving 20% in CAC.'
    },
    {
      year: '2024 - Present',
      title: 'Senior Data Analyst (Promoted Oct 2025)',
      institution: 'PlanetSpark',
      desc: 'Automated DB sync pipelines reducing cycle times by 2 days/week. Optimised marketing campaigns saving $1M+.'
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Glow highlight */}
      <div 
        className="blur-blob w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-secondary/5"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-bold tracking-wider uppercase font-mono ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            // Who <span className="text-cyber-primary">am I?</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto mt-4" />
        </div>

        {/* Top Row: Identity Reveal & 3D Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center mb-24">
          
          {/* Identity Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left relative z-10">


            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyan-400 to-cyber-secondary font-black drop-shadow-sm">
                Sarthak Gaur
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl sm:text-2xl font-bold font-mono h-10 flex items-center ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}
            >
              &gt; I'm a <span className={`ml-2 text-cyber-primary ${isDarkMode ? 'neon-glow-blue' : ''}`}>{displayText}</span>
              <span className="animate-pulse font-light text-cyber-primary">|</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`space-y-4 text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}
            >
              <p>
                I am a <strong>Senior Data Analyst</strong> with a strong engineering background in Electronics & Communication. I specialize in turning complex raw datasets into clear, actionable business strategies. My mindset is centered on <strong>product and efficiency</strong>: whether it's optimizing ad spend to save millions, re-engineering CRM pipelines to maximize conversions, or building automated ETL workflows.
              </p>
              <p>
                With expertise in Python, SQL, Power BI, and automation platforms like Power Automate, I bridge the gap between technical infrastructure and executive leadership.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="group flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-primary to-cyan-500 hover:from-cyan-500 hover:to-cyber-primary shadow-neon-blue hover:scale-105 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'border-white/10 text-white hover:border-cyber-primary bg-white/5'
                    : 'border-black/10 text-slate-800 hover:border-cyber-lightPrimary bg-black/5'
                }`}
              >
                <MessageSquare size={18} />
                <span>Contact Me</span>
              </button>

              <a
                href="/sarthak_resume.png"
                download="Sarthak_Gaur_Resume.png"
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'border-cyber-secondary/40 text-cyber-secondary hover:border-cyber-secondary hover:bg-cyber-secondary/10'
                    : 'border-purple-600/40 text-purple-600 hover:border-purple-600 hover:bg-purple-50'
                }`}
              >
                <Download size={18} />
                <span>Resume</span>
              </a>
            </motion.div>
          </div>

          {/* 3D Image Card & Floating Stats */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
            {/* Visual background circles */}
            <div className="absolute w-72 h-72 rounded-full border border-cyber-primary/20 animate-pulse-slow z-0" />
            <div className="absolute w-96 h-96 rounded-full border border-cyber-secondary/10 animate-spin-slow z-0" />

            {/* 3D Interactive Tilt Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative cursor-pointer z-10 select-none"
              style={{
                perspective: 1000,
              }}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX, rotateY }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`w-64 h-80 sm:w-72 sm:h-96 rounded-2xl p-2 relative overflow-hidden transition-all duration-300 ${
                  isDarkMode 
                    ? 'glass-card border-cyber-primary/30 shadow-neon-blue' 
                    : 'glass-card-light border-cyber-lightPrimary/30 shadow-lg'
                }`}
              >
                {/* Neon glow borders */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyber-primary/20 via-transparent to-cyber-secondary/20 pointer-events-none" />
                
                {/* Sarthak's photo */}
                <img
                  src="/sarthak_photo.jpg"
                  alt="Sarthak Gaur Portrait"
                  className="w-full h-full object-cover rounded-xl grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>

              {/* FLOATING STATS CARD 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-6 -left-12 p-3 rounded-xl border flex items-center space-x-3 pointer-events-none ${
                  isDarkMode 
                    ? 'bg-[#0b0c16]/90 border-cyber-primary/30 shadow-neon-blue text-white' 
                    : 'bg-white/95 border-blue-200 shadow-md text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono">AD SPEND SAVED</div>
                  <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyan-400">$1.0M+</div>
                </div>
              </motion.div>

              {/* FLOATING STATS CARD 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-8 -right-8 p-3 rounded-xl border flex items-center space-x-3 pointer-events-none ${
                  isDarkMode 
                    ? 'bg-[#0b0c16]/90 border-cyber-secondary/30 shadow-neon-purple text-white' 
                    : 'bg-white/95 border-purple-200 shadow-md text-slate-800'
                }`}
              >
                <div className="p-2 rounded-lg bg-cyber-secondary/10 text-cyber-secondary">
                  <Database size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono">CONVERSION BOOST</div>
                  <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary to-pink-500">+35%</div>
                </div>
              </motion.div>

              {/* FLOATING TECH BADGES */}
              <div className="absolute -right-12 top-10 flex flex-col space-y-3">
                <div className="w-10 h-10 rounded-full bg-cyber-bg/90 border border-cyber-primary/40 flex items-center justify-center text-xs font-bold text-cyber-primary shadow-neon-blue hover:scale-110 transition-transform">
                  SQL
                </div>
                <div className="w-10 h-10 rounded-full bg-cyber-bg/90 border border-cyber-secondary/40 flex items-center justify-center text-xs font-bold text-cyber-secondary shadow-neon-purple hover:scale-110 transition-transform">
                  PY
                </div>
                <div className="w-10 h-10 rounded-full bg-cyber-bg/90 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-400 shadow-neon-cyan hover:scale-110 transition-transform">
                  BI
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 rounded-xl border text-center hover:-translate-y-2 transition-transform ${
                isDarkMode 
                  ? 'glass-card border-white/5 shadow-neon-blue/5 hover:border-cyber-primary/30 hover:shadow-neon-blue' 
                  : 'glass-card-light border-black/5 shadow-sm hover:border-cyber-lightPrimary/30'
              }`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary font-mono mb-2">
                {stat.value}
              </div>
              <div className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Timeline Journey */}
        <div className="mt-20">
          <h3 className={`text-2xl font-bold font-mono mb-10 text-center lg:text-left ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            // Professional <span className="text-cyber-secondary">Journey</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-0 w-full h-[2px] bg-gradient-to-r from-cyber-primary via-cyan-400 to-cyber-secondary opacity-30 z-0" />

            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`p-5 rounded-xl border z-10 text-left relative ${
                  isDarkMode ? 'glass-card border-white/5 hover:border-cyber-secondary/40 transition-colors' : 'glass-card-light border-black/5'
                }`}
              >
                {/* Timeline node */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    idx === 3 
                      ? 'bg-cyber-secondary border-cyber-secondary shadow-neon-purple animate-pulse' 
                      : 'bg-cyber-primary border-cyber-primary shadow-neon-blue'
                  }`} />
                  <span className="font-mono text-xs font-bold text-cyber-primary">{step.year}</span>
                </div>

                <h4 className={`font-bold text-base leading-tight mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {step.title}
                </h4>
                <div className={`text-xs font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  {step.institution}
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
