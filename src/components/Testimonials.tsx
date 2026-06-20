import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  isDarkMode: boolean;
}

const testimonials = [
  {
    id: 1,
    name: "Maneesh Dhooper",
    role: "CMO, PlanetSpark",
    text: "Sarthak is an exceptional data analyst whose ability to translate complex datasets into actionable business strategies is unmatched. His automated pipelines and dashboards helped us identify inefficiencies and save over $1M in annualized ad spend. He operates with the strategic mindset of a co-founder.",
    image: "/maneesh.jpeg"
  },
  {
    id: 2,
    name: "Shailja Mittal",
    role: "Founder, RxMen",
    text: "Sarthak worked as a Business Analyst with us at RxMen, driving key product optimizations and A/B testing that significantly shortened our customer journey. His custom Power BI dashboards and automated data workflows eliminated hours of manual analysis, letting us focus on scaling the product.",
    image: "/shailja.png"
  },
  {
    id: 3,
    name: "Strategic Partner",
    role: "Director of Analytics (Demo)",
    text: "Sarthak's technical depth in Python and Power BI is remarkable. He single-handedly re-engineered CRM query pipelines and dashboard designs. A rare talent who bridges the gap between raw data engineering and executive strategy.",
    image: "https://ui-avatars.com/api/?name=Strategic+Partner&background=00f0ff&color=000&rounded=true&font-size=0.33"
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode }) => {
  // Quadruple the array to ensure enough width for continuous scrolling on wide displays
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[500px] h-[500px] top-0 left-0 bg-cyber-secondary/5"
        style={{ pointerEvents: 'none' }}
      />

      <div className="w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-bold tracking-wider uppercase font-mono ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            // Social <span className="text-cyber-secondary">Proof</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-secondary to-cyber-primary mx-auto mt-4" />
        </div>

        {/* Marquee Wrapper with side-fading gradients */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Fading gradient masks on edges */}
          <div className={`absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r ${
            isDarkMode ? 'from-[#020208] to-transparent' : 'from-slate-50 to-transparent'
          }`} />
          <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l ${
            isDarkMode ? 'from-[#020208] to-transparent' : 'from-slate-50 to-transparent'
          }`} />

          {/* Marquee flex container */}
          <div className="flex w-max animate-marquee">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className={`w-[300px] sm:w-[360px] flex-shrink-0 p-6 rounded-2xl border flex flex-col justify-between mx-4 transition-all ${
                  isDarkMode 
                    ? 'glass-card border-white/10 hover:border-cyber-secondary/50 shadow-neon-purple/5' 
                    : 'glass-card-light border-black/5 hover:border-purple-300/50 shadow-md'
                }`}
              >
                <div>
                  <Quote className={`w-5 h-5 mb-3 opacity-20 ${isDarkMode ? 'text-cyber-secondary' : 'text-purple-500'}`} />
                  <p className={`text-xs sm:text-sm italic leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                    "{item.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-dashed border-white/10">
                  <div className={`w-8 h-8 rounded-full overflow-hidden border ${
                    isDarkMode ? 'border-cyber-secondary/30' : 'border-purple-300'
                  }`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name.replace(' ', '+')}&background=00f0ff&color=000`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-mono text-cyber-secondary">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
