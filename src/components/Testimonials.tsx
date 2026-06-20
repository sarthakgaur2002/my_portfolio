import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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
    name: "Business Leader",
    role: "Director of Analytics (Placeholder)",
    text: "Sarthak's technical depth in Python and Power BI is remarkable. He single-handedly re-engineered our CRM logic which boosted conversions by 35%. A rare talent who bridges the gap between data engineering and executive strategy perfectly.",
    image: "https://ui-avatars.com/api/?name=Business+Leader&background=00f0ff&color=000&rounded=true&font-size=0.33"
  },
  {
    id: 3,
    name: "Stakeholder",
    role: "VP of Sales (Placeholder)",
    text: "Working with Sarthak fundamentally changed how we operate. His data models cut our reporting time from hours to minutes, giving us real-time visibility into our pipeline. He doesn't just deliver data; he delivers solutions.",
    image: "https://ui-avatars.com/api/?name=Stake+Holder&background=a855f7&color=fff&rounded=true&font-size=0.33"
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9
      };
    }
  };

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[500px] h-[500px] top-0 left-0 bg-cyber-secondary/5"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
            // Social <span className="text-cyber-secondary">Proof</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-secondary to-cyber-primary mx-auto mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative h-[400px] sm:h-[350px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={`absolute w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl border flex flex-col items-center text-center ${
                isDarkMode 
                  ? 'glass-card border-white/10 shadow-neon-purple/20' 
                  : 'glass-card-light border-black/10 shadow-xl'
              }`}
            >
              <Quote className={`w-12 h-12 mb-6 opacity-20 ${isDarkMode ? 'text-cyber-secondary' : 'text-purple-500'}`} />
              
              <p className={`text-lg sm:text-xl italic font-medium leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 mb-4 ${
                  isDarkMode ? 'border-cyber-secondary shadow-neon-purple' : 'border-purple-400'
                }`}>
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${testimonials[currentIndex].name.replace(' ', '+')}&background=00f0ff&color=000`;
                    }}
                  />
                </div>
                <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {testimonials[currentIndex].name}
                </h4>
                <p className={`text-sm font-mono text-cyber-secondary mt-1`}>
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-20">
            <button 
              onClick={handlePrev}
              className={`p-3 rounded-full border transition-all ${
                isDarkMode 
                  ? 'bg-[#0a0b16] border-white/10 hover:border-cyber-secondary text-white hover:text-cyber-secondary shadow-lg' 
                  : 'bg-white border-black/10 hover:border-purple-500 text-slate-800 hover:text-purple-600 shadow-md'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-20">
            <button 
              onClick={handleNext}
              className={`p-3 rounded-full border transition-all ${
                isDarkMode 
                  ? 'bg-[#0a0b16] border-white/10 hover:border-cyber-secondary text-white hover:text-cyber-secondary shadow-lg' 
                  : 'bg-white border-black/10 hover:border-purple-500 text-slate-800 hover:text-purple-600 shadow-md'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? isDarkMode ? 'bg-cyber-secondary shadow-neon-purple scale-125' : 'bg-purple-600 scale-125'
                  : isDarkMode ? 'bg-white/20 hover:bg-white/40' : 'bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
