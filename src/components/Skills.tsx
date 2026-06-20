import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { BarChart, Database, Terminal, Settings, TrendingUp } from 'lucide-react';

interface SkillsProps {
  isDarkMode: boolean;
}

interface SkillItem {
  name: string;
  level: number; // 1-5 representation
  category: 'analytics' | 'visualization' | 'databases' | 'programming' | 'tools';
}

export const Skills: React.FC<SkillsProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'analytics' | 'visualization' | 'databases' | 'programming' | 'tools'>('all');
  const [clickedSkills, setClickedSkills] = useState<Record<string, boolean>>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Radar chart data indicating domain proficiency
  const radarData = [
    { subject: 'Data Analysis', A: 95, B: 100, fullMark: 100, pointer: hoveredIndex === 0 ? 100 : 0 },
    { subject: 'Visualisation', A: 90, B: 100, fullMark: 100, pointer: hoveredIndex === 1 ? 100 : 0 },
    { subject: 'SQL & DBs', A: 88, B: 100, fullMark: 100, pointer: hoveredIndex === 2 ? 100 : 0 },
    { subject: 'Scripting', A: 85, B: 100, fullMark: 100, pointer: hoveredIndex === 3 ? 100 : 0 },
    { subject: 'Business Analysis', A: 92, B: 100, fullMark: 100, pointer: hoveredIndex === 4 ? 100 : 0 },
    { subject: 'Automation', A: 90, B: 100, fullMark: 100, pointer: hoveredIndex === 5 ? 100 : 0 },
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: null },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'visualization', label: 'Visualization', icon: BarChart },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'programming', label: 'Programming', icon: Terminal },
    { id: 'tools', label: 'Tools & Agile', icon: Settings },
  ];

  const skillsData: SkillItem[] = [
    // Analytics
    { name: 'Data Analysis & Visualisation', level: 5, category: 'analytics' },
    { name: 'Funnel Analysis', level: 4, category: 'analytics' },
    { name: 'Cohort Analysis', level: 5, category: 'analytics' },
    { name: 'A/B Testing', level: 4, category: 'analytics' },
    { name: 'Business Analysis', level: 5, category: 'analytics' },
    { name: 'Product Analytics', level: 4, category: 'analytics' },
    
    // Visualization
    { name: 'Power BI', level: 5, category: 'visualization' },
    { name: 'Google Looker Studio', level: 4, category: 'visualization' },
    { name: 'Salesforce Analytics', level: 4, category: 'visualization' },
    { name: 'Excel / Sheets', level: 5, category: 'visualization' },
    { name: 'Seaborn & Matplotlib', level: 4, category: 'visualization' },
    { name: 'Dashboarding', level: 5, category: 'visualization' },
    
    // Databases
    { name: 'SQL', level: 5, category: 'databases' },
    { name: 'MySQL', level: 5, category: 'databases' },
    { name: 'Power Query', level: 5, category: 'databases' },
    { name: 'Data Modelling', level: 4, category: 'databases' },
    
    // Programming
    { name: 'Python', level: 5, category: 'programming' },
    { name: 'Pandas', level: 5, category: 'programming' },
    { name: 'NumPy', level: 4, category: 'programming' },
    { name: 'API Integration', level: 4, category: 'programming' },
    
    // Tools & Agile
    { name: 'Jira & Confluence', level: 5, category: 'tools' },
    { name: 'Power Automate', level: 5, category: 'tools' },
    { name: 'Power Apps', level: 4, category: 'tools' },
    { name: 'Salesforce CRM', level: 4, category: 'tools' },
    { name: 'Agile & Scrum', level: 5, category: 'tools' },
    { name: 'Workflow Automation', level: 5, category: 'tools' },
    { name: 'Stakeholder Management', level: 5, category: 'tools' },
    { name: 'BRD / PRD Development', level: 4, category: 'tools' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeTab);

  const handleSkillClick = (name: string) => {
    setClickedSkills(prev => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setClickedSkills(prev => ({ ...prev, [name]: false }));
    }, 600); // Reset animation state after 600ms
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[300px] h-[300px] top-10 right-10 bg-cyber-primary/10"
        style={{ pointerEvents: 'none' }}
      />
      <div 
        className="blur-blob w-[300px] h-[300px] bottom-10 left-10 bg-cyber-secondary/5"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-bold tracking-wider uppercase font-mono ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            // Technical <span className="text-cyber-primary">Skills</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Recharts Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-center items-center h-[380px] sm:h-[420px] ${
              isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
            }`}
          >
            <h3 className={`text-lg font-bold font-mono mb-4 text-center ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              &gt; Analytics Domain Radar
            </h3>
            
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="70%" 
                  data={radarData}
                  onMouseMove={(state) => {
                    if (state && state.activeTooltipIndex !== undefined) {
                      setHoveredIndex(state.activeTooltipIndex);
                    } else {
                      setHoveredIndex(null);
                    }
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <PolarGrid stroke={isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ 
                      fill: isDarkMode ? '#e5e7eb' : '#334155', 
                      fontSize: 10,
                      fontWeight: 'bold',
                      fontFamily: 'Outfit'
                    }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: isDarkMode ? '#9ca3af' : '#64748b', fontSize: 8 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? 'rgba(11, 12, 22, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDarkMode ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      color: isDarkMode ? '#fff' : '#000',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Radar
                    name="Proficiency"
                    dataKey="A"
                    stroke="#00f0ff"
                    strokeWidth={2}
                    fill="url(#colorRadar)"
                    fillOpacity={0.6}
                    dot={{ r: 3, fill: '#00f0ff', strokeWidth: 2, stroke: isDarkMode ? '#0a0b16' : '#fff' }}
                    activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0, className: 'animate-pulse' }}
                  />
                  {/* Dynamic neon pointer ray following the mouse */}
                  <Radar
                    name="Pointer"
                    dataKey="pointer"
                    stroke="#a855f7"
                    strokeWidth={hoveredIndex !== null ? 3 : 0}
                    fill="none"
                    dot={false}
                    activeDot={false}
                  />
                  <defs>
                    <linearGradient id="colorRadar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right: Skills Category Grid & Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id as any)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium text-xs font-mono border transition-all ${
                      activeTab === cat.id
                        ? isDarkMode
                          ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary shadow-neon-blue'
                          : 'bg-cyber-lightPrimary/10 border-cyber-lightPrimary text-cyber-lightPrimary'
                        : isDarkMode
                          ? 'border-white/5 bg-cyber-card text-gray-400 hover:border-white/10 hover:text-white'
                          : 'border-black/5 bg-cyber-lightCard text-slate-600 hover:border-black/10 hover:text-slate-800'
                    }`}
                  >
                    {IconComponent && <IconComponent size={14} />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Glowing Interactive Badges Container */}
            <motion.div
              layout
              className={`p-6 rounded-2xl border min-h-[250px] flex flex-wrap gap-3 items-start justify-center lg:justify-start ${
                isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const isClicked = clickedSkills[skill.name];
                  
                  return (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: isClicked ? [1, 1.18, 0.95, 1.05, 1] : 1,
                        y: isClicked ? -8 : 0,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 10
                        }
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => handleSkillClick(skill.name)}
                      className={`cursor-pointer px-4 py-2.5 rounded-xl border font-medium text-sm flex items-center space-x-2 select-none transition-all ${
                        isClicked
                          ? isDarkMode
                            ? 'border-cyber-primary bg-cyber-primary/20 text-cyber-primary shadow-neon-blue'
                            : 'border-cyber-lightPrimary bg-cyber-lightPrimary/20 text-cyber-lightPrimary'
                          : isDarkMode
                            ? 'border-white/5 bg-[#0b0c16]/50 text-gray-300 hover:border-cyber-primary/50 hover:text-white hover:shadow-neon-blue/10 hover:-translate-y-0.5'
                            : 'border-black/5 bg-white/70 text-slate-700 hover:border-cyber-lightPrimary/50 hover:text-slate-900 hover:-translate-y-0.5'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary" />
                      <span>{skill.name}</span>
                      
                      {/* Interactive Particle Burst simulation */}
                      {isClicked && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-primary"></span>
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-slate-400'} text-center lg:text-left`}>
              &gt;&gt; Click on a skill badge to trigger a neon pulse bounce effect
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
