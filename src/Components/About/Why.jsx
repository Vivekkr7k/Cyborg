import React from 'react';
import { FaChartLine, FaUsers, FaBullhorn, FaThumbsUp, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Why = () => {
  const stats = [
    { value: '95%', label: 'Client Satisfaction' },
    { value: '$109M+', label: 'Revenue Generated' },
    { value: '150+', label: 'Happy Clients' },
    { value: '24/7', label: 'Dedicated Support' }
  ];

  const benefits = [
    {
      icon: <FaChartLine />,
      title: 'Grow Your Sales',
      description: 'Accelerate revenue with targeted strategies designed to attract and convert.'
    },
    {
      icon: <FaUsers />,
      title: 'Drive Insane Traffic',
      description: 'Skyrocket web visitors using organic, paid, and social campaigns.'
    },
    {
      icon: <FaBullhorn />,
      title: 'Convert Raving Fans',
      description: 'Turn visitors into evangelists with optimized funnels and remarketing.'
    },
    {
      icon: <FaThumbsUp />,
      title: 'Maximize ROI',
      description: 'Higher conversions, smarter spend, faster results—guaranteed.'
    }
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-sm font-semibold tracking-wider text-blue-600 mb-3">
              OUR DIFFERENCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="block">Why</span>
              <span className="block text-blue-600">Choose Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose us only if you're ready to grow your sales, drive insane traffic, and convert visitors into raving fans.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Column */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team analyzing digital marketing strategy"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>
          </motion.div>

          {/* Benefits Column */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Let's Grow Your Business Together!
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;