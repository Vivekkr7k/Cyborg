import React from "react";
import {
  FaRegLightbulb,
  FaRocket,
  FaUndoAlt,
  FaPuzzlePiece,
  FaFilter,
  FaProjectDiagram,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaRegLightbulb size={28} />,
    title: "Request Services",
    step: "Step 1",
    desc:
      "Upgrade your UI/UX with our plans. Submit unlimited requests and get premium designs in 24–48 hours.",
  },
  {
    icon: <FaRocket size={28} />,
    title: "Receive Deliverable",
    step: "Step 2",
    desc:
      "Access high-quality designs in 1–3 days. Move fast, stay agile, and impress your SaaS users.",
  },
  {
    icon: <FaUndoAlt size={28} />,
    title: "Free Revisions",
    step: "Step 3",
    desc:
      "Collaborate with us to shape your perfect design. Unlimited iterations until you're satisfied.",
  },
];

const features = [
  {
    icon: <FaPuzzlePiece size={36} />,
    title: "Strategy Builder",
    desc: "Step-by-step plans built for your SaaS growth.",
  },
  {
    icon: <FaFilter size={36} />,
    title: "Conversion Oriented",
    desc: "Boost website & campaign conversions consistently.",
  },
  {
    icon: <FaProjectDiagram size={36} />,
    title: "Refining Strategies",
    desc: "We review & optimize based on real-time feedback.",
  },
  {
    icon: <FaCogs size={36} />,
    title: "Process Driven",
    desc: "Execution through automation and efficient flows.",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.7,
      type: "spring",
    },
  }),
};

const How = () => {
  return (
    <div className="w-full font-sans">
      {/* How We Get Things Done - Modern Gradient */}
      <section className="py-20 px-4 max-w-7xl mx-auto rounded-3xl mt-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <h2 className="text-5xl font-extrabold text-center mb-20 text-gray-900 tracking-tight">
          How We Get Things Done
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/90 rounded-2xl p-8 border border-cyan-100 flex flex-col gap-4 items-start shadow-none hover:shadow-lg hover:shadow-cyan-200/40 transition duration-300 relative overflow-hidden group"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
               
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-full text-white group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="text-cyan-600 text-lg font-semibold">
                    {item.step}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-base text-gray-600 group-hover:text-gray-900 transition-colors">
                {item.desc}
              </p>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-100 rounded-full opacity-30 group-hover:opacity-50 blur-2xl z-0 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA - Gradient */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-700 py-24 text-center px-4 ">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Grow With Us Now
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-cyan-100 mb-8">
          At CyborgSapient, we focus on your business growth with premium design
          support, rapid deliverables, and expert strategy.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-cyan-700 px-8 py-4 rounded-full text-lg font-medium hover:bg-cyan-100 transition"
        >
          Get Your Free Quote
        </a>
      </section>

      {/* Features - Modern */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-white text-gray-900 rounded-3xl ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Us</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-500 mb-8">
            Our brilliant team of thinkers conjures up the silliest concepts from
            their toolkit. Are you prepared to witness the wonders we produce?
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border border-cyan-100 flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              variants={cardVariants}
            >
              <div className="text-cyan-600 mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-base text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clients - WHITE */}
      <section className="bg-white py-20 text-center border-t border-gray-200">
        <h2 className="text-4xl font-semibold text-blue-900 mb-10">
          Trusted by Forward-Thinking Brands
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-blue-50 border border-blue-200 h-16 flex items-center justify-center text-blue-700 text-sm rounded-lg"
            >
              Client {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - GRADIENT */}
      <section className="bg-gradient-to-br from-blue-800 to-gray-900 text-white py-24 text-center px-4">
        <h2 className="text-5xl font-bold mb-4">IDEA?</h2>
        <p className="text-2xl mb-8 text-gray-200">
          Stop thinking. Start growing.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default How;
