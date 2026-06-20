import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Using FormSubmit for zero-config email routing
  const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/sarthakgaur2002@gmail.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Validation checks
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      // Direct FormSubmit integration
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || 'Portfolio Inquiry',
          message: formState.message,
          _subject: `New Portfolio Contact from ${formState.name}`,
          _replyto: formState.email,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background neon glows */}
      <div 
        className="blur-blob w-[300px] h-[300px] top-1/2 left-[-150px] bg-cyber-primary/10"
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
            // Contact <span className="text-cyber-primary">Me</span>
          </motion.h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Let's connect and build something impactful.
            </h3>
            <p className={`text-base leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              I am open to Data Engineer, Data Analyst, Business Analyst, Data Consultant, or similar roles. Reach out if you want to optimize your marketing performance or build automated reporting pipelines!
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email */}
              <a 
                href="mailto:sarthakgaur2002@gmail.com"
                className={`p-4 rounded-xl border flex items-center space-x-4 transition-all duration-300 hover:translate-x-2 ${
                  isDarkMode 
                    ? 'glass-card border-white/5 hover:border-cyber-primary hover:shadow-neon-blue/10' 
                    : 'glass-card-light border-black/5 hover:border-cyber-lightPrimary'
                }`}
              >
                <div className="p-3 rounded-lg bg-cyber-primary/10 text-cyber-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">EMAIL ME</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    sarthakgaur2002@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+917701997081"
                className={`p-4 rounded-xl border flex items-center space-x-4 transition-all duration-300 hover:translate-x-2 ${
                  isDarkMode 
                    ? 'glass-card border-white/5 hover:border-cyber-secondary hover:shadow-neon-purple/10' 
                    : 'glass-card-light border-black/5 hover:border-cyber-lightSecondary'
                }`}
              >
                <div className="p-3 rounded-lg bg-cyber-secondary/10 text-cyber-secondary">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">CALL ME</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    +91 77019-97081
                  </div>
                </div>
              </a>

              {/* Location */}
              <div 
                className={`p-4 rounded-xl border flex items-center space-x-4 ${
                  isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
                }`}
              >
                <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono">LOCATION</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    New Delhi, India
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="flex space-x-3 pt-4">
              <a
                href="https://linkedin.com/in/sarthakgaur2002"
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-lg border transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'border-white/10 text-gray-400 hover:text-cyber-primary hover:border-cyber-primary hover:shadow-neon-blue/20' 
                    : 'border-black/10 text-slate-600 hover:text-cyber-lightPrimary hover:border-cyber-lightPrimary'
                }`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/sarthakgaur2002"
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-lg border transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'border-white/10 text-gray-400 hover:text-cyber-secondary hover:border-cyber-secondary hover:shadow-neon-purple/20' 
                    : 'border-black/10 text-slate-600 hover:text-cyber-lightSecondary hover:border-cyber-lightSecondary'
                }`}
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${
              isDarkMode ? 'glass-card border-white/5' : 'glass-card-light border-black/5'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={`block w-full px-4 py-3 rounded-lg bg-black/20 border transition-all focus:outline-none focus:ring-0 peer ${
                      isDarkMode 
                        ? 'border-white/10 text-white focus:border-cyber-primary focus:shadow-neon-blue' 
                        : 'border-black/10 text-slate-800 focus:border-cyber-lightPrimary'
                    }`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 text-gray-400 peer-focus:text-cyber-primary bg-[#020208]/90"
                    style={{ backgroundColor: isDarkMode ? undefined : '#ffffff' }}
                  >
                    Your Name *
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={`block w-full px-4 py-3 rounded-lg bg-black/20 border transition-all focus:outline-none focus:ring-0 peer ${
                      isDarkMode 
                        ? 'border-white/10 text-white focus:border-cyber-primary focus:shadow-neon-blue' 
                        : 'border-black/10 text-slate-800 focus:border-cyber-lightPrimary'
                    }`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 text-gray-400 peer-focus:text-cyber-primary bg-[#020208]/90"
                    style={{ backgroundColor: isDarkMode ? undefined : '#ffffff' }}
                  >
                    Your Email *
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder=" "
                  className={`block w-full px-4 py-3 rounded-lg bg-black/20 border transition-all focus:outline-none focus:ring-0 peer ${
                    isDarkMode 
                      ? 'border-white/10 text-white focus:border-cyber-primary focus:shadow-neon-blue' 
                      : 'border-black/10 text-slate-800 focus:border-cyber-lightPrimary'
                  }`}
                />
                <label
                  htmlFor="subject"
                  className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 text-gray-400 peer-focus:text-cyber-primary bg-[#020208]/90"
                  style={{ backgroundColor: isDarkMode ? undefined : '#ffffff' }}
                >
                  Subject
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className={`block w-full px-4 py-3 rounded-lg bg-black/20 border transition-all focus:outline-none focus:ring-0 peer ${
                    isDarkMode 
                      ? 'border-white/10 text-white focus:border-cyber-primary focus:shadow-neon-blue' 
                      : 'border-black/10 text-slate-800 focus:border-cyber-lightPrimary'
                  }`}
                />
                <label
                  htmlFor="message"
                  className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 text-gray-400 peer-focus:text-cyber-primary bg-[#020208]/90"
                  style={{ backgroundColor: isDarkMode ? undefined : '#ffffff' }}
                >
                  Your Message *
                </label>
              </div>

              {/* Status alerts */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 rounded-lg border border-green-500/25 bg-green-500/10 text-green-400 flex items-center space-x-2 text-sm font-mono"
                  >
                    <CheckCircle size={16} />
                    <span>TRANSMISSION SUCCESSFUL // I will get back to you shortly!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 rounded-lg border border-red-500/25 bg-red-500/10 text-red-400 flex items-center space-x-2 text-sm font-mono"
                  >
                    <AlertCircle size={16} />
                    <span>{errorMessage || 'TRANSMISSION FAILED. Please try again.'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group flex items-center justify-center space-x-2 w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-primary to-cyan-500 hover:from-cyan-500 hover:to-cyber-primary shadow-neon-blue disabled:opacity-50 transition-all duration-300"
              >
                <span>{status === 'loading' ? 'Transmitting Data...' : 'Send Message'}</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
