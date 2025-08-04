import React from "react";
import {
  FaSearch,
  FaGoogle,
  FaFacebookF,
  FaYoutube,
  FaSms,
  FaEnvelope,
  FaFileAlt,
  FaWhatsapp,
  FaShoppingCart,
  FaPaintBrush,
  FaHashtag,
  FaCode,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaSearch size={28} />,
    title: "Search Engine Optimization (SEO)",
    desc: "Boost your visibility on Google, Bing, and Yahoo with white hat SEO strategies for organic growth.",
  },
  {
    icon: <FaGoogle size={28} />,
    title: "Google Ads",
    desc: "Reach targeted audiences effectively with personalized ad campaigns across Google’s ad network.",
  },
  {
    icon: <FaFacebookF size={28} />,
    title: "Facebook Ads",
    desc: "Drive traffic and awareness using strategic creatives tailored to Meta’s platform algorithms.",
  },
  {
    icon: <FaYoutube size={28} />,
    title: "YouTube Ads",
    desc: "Leverage video to capture attention with smart targeting and compelling storytelling.",
  },
  {
    icon: <FaSms size={28} />,
    title: "SMS Marketing",
    desc: "Deliver powerful CTAs through high-conversion mobile messages sent at the right moment.",
  },
  {
    icon: <FaEnvelope size={28} />,
    title: "Email Marketing",
    desc: "Turn inboxes into a growth channel with beautifully designed, data-driven email campaigns.",
  },
  {
    icon: <FaFileAlt size={28} />,
    title: "Content Marketing",
    desc: "Tell your brand story with SEO-optimized blogs, articles, and social media content.",
  },
  {
    icon: <FaWhatsapp size={28} />,
    title: "WhatsApp Marketing",
    desc: "Connect with leads and customers in real time through personalized chat experiences.",
  },
  {
    icon: <FaShoppingCart size={28} />,
    title: "E-commerce Marketing",
    desc: "Convert clicks into customers with funnel-based performance strategies for online stores.",
  },
  {
    icon: <FaPaintBrush size={28} />,
    title: "UI/UX & Graphic Design",
    desc: "Design interfaces and graphics that engage users and align with your product vision.",
  },
  {
    icon: <FaHashtag size={28} />,
    title: "Social Media Development",
    desc: "Build a loyal online community with unique visual storytelling and social strategy.",
  },
  {
    icon: <FaCode size={28} />,
    title: "Software Development",
    desc: "Build scalable digital products, from mobile apps to full-stack enterprise systems.",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.7, type: "spring" } }),
};

const OurServices = () => {
  return (
    <section className="w-full bg-gradient-to-br from-white via-blue-50 to-cyan-50 py-20 px-4 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">Our Services</h2>
        <p className="text-xl text-blue-700 font-medium">How we can help you?</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="group bg-white/80 rounded-3xl p-7 flex flex-col items-start shadow-none border border-blue-100 hover:border-cyan-400 transition-all duration-300 hover:scale-[1.03] hover:bg-white/100 relative overflow-hidden"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            variants={cardVariants}
           
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl text-gray-900 font-semibold group-hover:text-cyan-700 transition-colors">{service.title}</h3>
            </div>
            <p className="text-base text-gray-600 group-hover:text-gray-900 transition-colors">{service.desc}</p>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-100 rounded-full opacity-30 group-hover:opacity-50 blur-2xl z-0 transition" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
