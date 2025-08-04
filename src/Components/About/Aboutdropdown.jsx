import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    title: 'Best Quality Designs',
    content: `We deliver pixel-perfect visuals that reflect your brand's essence.`,
    icon: '🎨'
  },
  {
    title: '16x7 Live Support',
    content: `Our team is available almost all week to assist you instantly.`,
    icon: '🕒'
  },
  {
    title: 'Result Oriented Projects',
    content: `Every project is structured with clear KPIs and measurable outcomes.`,
    icon: '📊'
  },
  {
    title: 'Award Winning Support Team',
    content: `Recognized experts handle your queries with top-notch care.`,
    icon: '🏆'
  },
  {
    title: 'Experienced Professionals',
    content: `Our seasoned team offers insights that drive success.`,
    icon: '👔'
  },
];

const AboutDropdown = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-20 px-6">
      {/* Text + 3D Accordion */}
      <div className="w-full lg:w-1/2 space-y-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              y: openIndex === idx ? -5 : 0,
              scale: openIndex === idx ? 1.02 : 1
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative"
          >
            {/* 3D Card Effect */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${openIndex === idx ? 'from-blue-500/10 to-blue-600/10' : 'from-gray-100/50 to-gray-200/50'} shadow-lg transform ${openIndex === idx ? 'rotate-1 -skew-y-1' : ''} -z-10`}></div>
            
            <motion.div
              className={`p-6 rounded-xl cursor-pointer ${openIndex === idx ? 'bg-white shadow-2xl border-l-4 border-blue-500' : 'bg-white/90 shadow-md hover:shadow-lg'}`}
              onClick={() => toggle(idx)}
              whileHover={{ y: -3 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <motion.span
                  className="text-2xl text-gray-500"
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                >
                  ▼
                </motion.span>
              </div>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-gray-600 pl-14"
                  >
                    {item.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Right-side 3D image */}
      <motion.div 
        className="w-full lg:w-1/2 relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl rotate-3 -z-10"></div>
        <div className="absolute -inset-4 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-2xl -rotate-2 -z-20"></div>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Professional team collaborating"
          className="rounded-xl shadow-2xl w-full object-cover relative z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-xl"></div>
      </motion.div>
    </div>
  );
};

export default AboutDropdown;