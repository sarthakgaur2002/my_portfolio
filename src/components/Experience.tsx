import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';

interface ExperienceProps {
  isDarkMode: boolean;
}

interface Job {
  id: number;
  company: string;
  companyLogo: string;
  role: string;
  duration: string;
  tools: string[];
  responsibilities: string[];
  achievements: string[];
}

export const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  const experiences: Job[] = [
    {
      id: 1,
      company: 'PlanetSpark',
      companyLogo: '/planetspark.png',
      role: 'Data Scientist (Promoted from Data Analyst, Oct \'25)',
      duration: '09/2024 - Present',
      tools: ['Google Sheets/Excel', 'SQL', 'Python', 'Jira', 'Metabase', 'Power BI', 'Power Automate'],
      responsibilities: [
        'Automated end-to-end data sync across SharePoint, production DB, and Microsoft Teams via Power Automate, eliminating 90% of manual data entry and cutting ad optimization cycles by 2 days/week.',
        'Consolidated 250+ metrics across Google & Facebook Ads to identify underperforming segments, cutting 100+ inefficient campaigns and generating $1M in annualized spend savings.',
        'Translated stakeholder requirements into structured User Stories and Jira epics, driving 100% on-time sprint delivery across 8 bi-weekly Scrum cycles.',
        'Built K-12 learning-trend dashboards across grades, subjects, and regions to surface counselor-targeting insights and optimize student onboarding flows.'
      ],
      achievements: [
        'Promoted to Senior Data Analyst within 1 year for outstanding analytical contributions and automation initiatives.',
        'Saved $1M in marketing ad budget by optimizing Facebook & Google Ad campaign segments.'
      ]
    },
    {
      id: 2,
      company: 'InFeedo',
      companyLogo: '/infeedo.png',
      role: 'Business Analyst',
      duration: '09/2023 - 08/2024',
      tools: ['Excel', 'Salesforce', 'SQL', 'Power BI', 'Rattle', 'Jira', 'Leadsquared', 'Google Looker Studio'],
      responsibilities: [
        'Re-engineered CRM lead-qualification logic in Salesforce, boosting lead conversion by 35% and reducing customer acquisition cost (CAC) by 20%. Deployed an Early Warning System cutting lead leakage by 10%.',
        'Managed 5 cross-functional projects end-to-end (scoping, sprints, QA, go-live), leading 8-person squads to 100% on-time delivery through Agile sprints.',
        'Developed 20+ dynamic reports and dashboards across 50+ datasets, increasing data transparency by 25% and enabling faster strategic decisions for senior leadership.'
      ],
      achievements: [
        'Boosted lead conversion by 35% and reduced CAC by 20% through CRM logic optimization.',
        'Achieved 100% on-time delivery on 5 major cross-functional business intelligence projects.'
      ]
    },
    {
      id: 3,
      company: 'InFeedo',
      companyLogo: '/infeedo.png',
      role: 'Business Analyst Intern',
      duration: '06/2023 - 08/2023',
      tools: ['Excel', 'Salesforce', 'SQL', 'Power BI', 'Rattle', 'Salesforce Analytics'],
      responsibilities: [
        'Cleaned and standardized 5 core data sources, reducing downstream reporting errors by 30% and improving data-integration pipeline efficiency by 20%.',
        'Developed performance dashboards improving operational visibility by 15% and conducted QA audits on 10+ weekly reports before senior-leadership review.'
      ],
      achievements: [
        'Reduced reporting data errors by 30% and improved integration pipeline efficiency by 20%.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[400px] h-[400px] top-1/4 left-10 bg-cyber-secondary/5"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
            // Professional <span className="text-cyber-primary">Experience</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto mt-4" />
        </div>

        {/* Vertical Timeline - Left Aligned to utilize right space */}
        <div className="relative pl-6 md:pl-10">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-10 top-0 h-full w-[2px] bg-gradient-to-b from-cyber-primary via-cyber-secondary to-transparent opacity-30 z-0" />

          <div className="space-y-12">
            {experiences.map((job, idx) => (
              <div key={job.id} className="relative w-full">
                
                {/* Timeline Node */}
                <div className="absolute -left-12 md:-left-16 top-6 transform z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-8 h-8 rounded-full border-2 bg-[#020208] flex items-center justify-center cursor-pointer ${
                      idx === 0 
                        ? 'border-cyber-primary shadow-neon-blue' 
                        : 'border-cyber-secondary shadow-neon-purple'
                    }`}
                  >
                    <Briefcase size={14} className={idx === 0 ? 'text-cyber-primary' : 'text-cyber-secondary'} />
                  </motion.div>
                </div>

                {/* Content Card (Full Width) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6 }}
                  className={`p-6 sm:p-8 rounded-2xl border text-left ml-4 transition-all hover:shadow-neon-blue/5 hover:border-cyber-primary/20 ${
                    isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {/* Company Logo */}
                      <img 
                        src={job.companyLogo} 
                        alt={`${job.company} logo`} 
                        className={`w-12 h-12 rounded-full object-cover shadow-sm border-2 ${
                          idx === 0 
                            ? 'border-cyber-primary shadow-neon-blue/20' 
                            : 'border-cyber-secondary shadow-neon-purple/20'
                        }`}
                      />
                      
                      <div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {job.role}
                        </h3>
                        <h4 className="text-md sm:text-lg font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
                          {job.company}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-cyber-primary mt-2 sm:mt-0 bg-cyber-primary/10 px-3 py-1.5 rounded-full border border-cyber-primary/20">
                      <Calendar size={14} />
                      <span className="font-mono text-xs font-bold">{job.duration}</span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-3 mb-6 mt-6">
                    {job.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start space-x-3 text-sm">
                        <ChevronRight size={16} className="text-cyber-primary flex-shrink-0 mt-0.5" />
                        <span className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Achievements */}
                  <div className="mb-6 pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-2 text-xs font-bold font-mono text-green-400 mb-3">
                      <Award size={16} />
                      <span className="uppercase tracking-widest">Key Achievements</span>
                    </div>
                    {job.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className={`text-sm font-medium flex items-start space-x-2 mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                        <span className="mt-0.5">✔</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tools list */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-3 py-1 rounded-md text-xs font-mono border ${
                          idx === 0 
                            ? 'bg-cyber-primary/5 text-cyber-primary border-cyber-primary/20' 
                            : 'bg-cyber-secondary/5 text-cyber-secondary border-cyber-secondary/20'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
