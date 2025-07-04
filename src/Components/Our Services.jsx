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

const OurServices = () => {
  return (
    <section className="w-full bg-white text-[#0f172a] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-xl text-gray-300">How we can help you?</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-[#1e293b] rounded-2xl p-6 shadow-lg shadow-blue-900/20 hover:shadow-blue-700/30 transition-all duration-300 border border-blue-800 hover:scale-[1.015]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-full text-white">
                {service.icon}
              </div>
              <h3 className="text-xl text-white font-semibold">{service.title}</h3>
            </div>
            <p className="text-sm text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
