import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line, 
  ResponsiveContainer 
} from 'recharts';
import { Maximize2, X, AlertCircle, FileText, CheckCircle } from 'lucide-react';

interface ProjectsProps {
  isDarkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  category: 'python' | 'powerbi' | 'sql';
  tech: string[];
  problem: string;
  role: string;
  insights: string;
  impact: string;
  chartType: 'line' | 'bar' | 'area';
  chartData: any[];
}

export const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'python' | 'powerbi' | 'sql'>('all');

  // Interactive mock charts data for data-analyst flavor
  const playStoreData = [
    { category: 'Games', Rating: 4.5, count: 1200 },
    { category: 'Tools', Rating: 4.1, count: 950 },
    { category: 'Finance', Rating: 4.3, count: 500 },
    { category: 'Health', Rating: 4.6, count: 700 },
    { category: 'Social', Rating: 4.2, count: 850 },
  ];

  const adventureWorksData = [
    { month: 'Jan', Sales: 45 },
    { month: 'Feb', Sales: 52 },
    { month: 'Mar', Sales: 49 },
    { month: 'Apr', Sales: 63 },
    { month: 'May', Sales: 58 },
    { month: 'Jun', Sales: 72 },
  ];

  const cryptoData = [
    { day: 'Mon', Price: 26000 },
    { day: 'Tue', Price: 26400 },
    { day: 'Wed', Price: 25900 },
    { day: 'Thu', Price: 27100 },
    { day: 'Fri', Price: 27800 },
    { day: 'Sat', Price: 27400 },
    { day: 'Sun', Price: 28200 },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Google Play Store Apps Analysis',
      category: 'python',
      tech: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'ETL'],
      problem: 'Messy, unstructured metadata for over 10,000 Android apps made it difficult for developers to identify key drivers for high ratings and installations.',
      role: 'Built an end-to-end Python ETL pipeline that cleaned, deduplicated, and formatted messy records. Used Seaborn and Matplotlib for statistical analysis and rating distributions.',
      insights: 'Surfaced critical rating-drivers: discovered that app category size and update frequencies correlate strongly with positive reviews. Surfaced that category clusters (e.g., Health, Games) have distinct pricing thresholds.',
      impact: 'Reduced data errors by 25% across 10,000+ rows and accelerated operational reporting by replacing manual cleaning with automated ETL.',
      chartType: 'bar',
      chartData: playStoreData,
    },
    {
      id: 2,
      title: 'Adventure Works Retail Dashboard',
      category: 'powerbi',
      tech: ['Power BI', 'DAX', 'Star Schema', 'Data Modelling', 'Excel'],
      problem: 'Executive leadership lacked real-time visibility into retail revenues, operational returns, and customer segment metrics. Querying reports manually took over 2 hours.',
      role: 'Designed a comprehensive 8-view Power BI dashboard with a structured star-schema database model. Created custom DAX metrics for real-time calculations.',
      insights: 'Identified underperforming product subcategories and operational return bottlenecks, enabling managers to adjust inventory levels dynamically.',
      impact: 'Replaced manual spreadsheet reporting, reducing reporting cycle times from 2 hours to under 5 minutes per query (95% speedup).',
      chartType: 'area',
      chartData: adventureWorksData,
    },
    {
      id: 3,
      title: 'Crypto Currency Analysis Engine',
      category: 'sql',
      tech: ['Python', 'SQL', 'Power BI', 'API Integration', 'MySQL'],
      problem: 'Pricing, volume, and volatility data for cryptocurrency assets were highly fragmented across different exchanges, blocking real-time risk tracking.',
      role: 'Engineered multi-exchange data pipelines utilizing Python APIs and SQL databases to fetch real-time ticks. Built a live tracking dashboard in Power BI.',
      insights: 'Mapped volatility correlations between top assets, highlighting risk-mitigation zones for cryptocurrency trading and asset allocations.',
      impact: 'Deployed real-time automated data streams from 5 distinct exchange APIs, providing central volatility metrics updated every 60 seconds.',
      chartType: 'line',
      chartData: cryptoData,
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[400px] h-[400px] bottom-10 right-10 bg-cyber-primary/5"
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
            // Analytics <span className="text-cyber-primary">Projects</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto mt-4" />
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-2 mb-12">
          {['all', 'python', 'powerbi', 'sql'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase border transition-all ${
                filter === cat
                  ? isDarkMode
                    ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary shadow-neon-blue'
                    : 'bg-cyber-lightPrimary/10 border-cyber-lightPrimary text-cyber-lightPrimary'
                  : isDarkMode
                    ? 'border-white/5 bg-cyber-card text-gray-400 hover:border-white/10 hover:text-white'
                    : 'border-black/5 bg-cyber-lightCard text-slate-600 hover:border-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group rounded-2xl border p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-neon-blue/20 transition-all ${
                  isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {/* Inline Recharts Mini Visualizations */}
                  <div className="h-40 w-full mb-5 bg-[#0b0c16]/75 rounded-xl border border-white/5 p-3 flex flex-col justify-end">
                    <div className="text-[10px] font-mono text-gray-500 mb-1 text-left">SIMULATED INSIGHT METRICS</div>
                    <ResponsiveContainer width="100%" height="85%">
                      {project.chartType === 'bar' ? (
                        <BarChart data={project.chartData}>
                          <Bar dataKey="Rating" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : project.chartType === 'area' ? (
                        <AreaChart data={project.chartData}>
                          <defs>
                            <linearGradient id={`grad-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="Sales" stroke="#a855f7" fillOpacity={1} fill={`url(#grad-${project.id})`} />
                        </AreaChart>
                      ) : (
                        <LineChart data={project.chartData}>
                          <Line type="monotone" dataKey="Price" stroke="#06b6d4" strokeWidth={2} dot={false} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  {/* Title & Tech Stacks */}
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyber-primary transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-primary/5 text-cyber-primary border border-cyber-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Details Button Trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    {project.category.toUpperCase()} PROJECT
                  </span>
                  <div className="flex items-center space-x-1 text-cyber-primary font-bold text-xs uppercase">
                    <span>Details</span>
                    <Maximize2 size={12} className="group-hover:scale-125 transition-transform" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`max-w-2xl w-full rounded-2xl border p-6 relative shadow-glass overflow-hidden ${
                  isDarkMode ? 'bg-[#0a0b16] border-white/10 text-white' : 'bg-white border-black/10 text-slate-800'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Neon glow inside modal */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-cyber-primary to-cyber-secondary" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`absolute top-4 right-4 p-1.5 rounded-lg border transition-all ${
                    isDarkMode ? 'border-white/10 hover:border-cyber-primary text-gray-400 hover:text-white' : 'border-black/10 hover:border-cyber-lightPrimary text-slate-500'
                  }`}
                >
                  <X size={18} />
                </button>

                <h3 className="text-2xl font-bold mb-4 pr-8">{selectedProject.title}</h3>

                {/* Content Sections */}
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="space-y-1">
                    <h4 className="flex items-center space-x-2 text-sm font-bold font-mono text-cyber-primary">
                      <AlertCircle size={14} />
                      <span>PROBLEM STATEMENT</span>
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{selectedProject.problem}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="flex items-center space-x-2 text-sm font-bold font-mono text-cyber-secondary">
                      <FileText size={14} />
                      <span>MY ROLE</span>
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{selectedProject.role}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="flex items-center space-x-2 text-sm font-bold font-mono text-cyan-400">
                      <FileText size={14} />
                      <span>KEY INSIGHTS</span>
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{selectedProject.insights}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="flex items-center space-x-2 text-sm font-bold font-mono text-green-400">
                      <CheckCircle size={14} />
                      <span>IMPACT / RESULTS</span>
                    </h4>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>{selectedProject.impact}</p>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-cyber-primary/5 text-cyber-primary border border-cyber-primary/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
