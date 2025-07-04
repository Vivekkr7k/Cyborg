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

const How = () => {
  return (
    <div className="w-full font-sans">
      {/* How We Get Things Done - BLUE */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-white bg-[#0f172a] rounded-2xl mt-10">
        <h2 className="text-5xl font-semibold text-center mb-20">
          How We Get Things Done
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
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
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1e293b] rounded-2xl p-8 shadow-xl shadow-blue-900/30 hover:shadow-blue-800/40 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 p-4 rounded-full text-white">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-lg">{item.step}</p>
                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-lg text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - WHITE */}
      <section className="bg-white py-24 text-center px-6 ">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
          Grow With Us Now
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
          At CyborgSapient, we focus on your business growth with premium
          design support, rapid deliverables, and expert strategy.
        </p>
        <a
          href="#contact"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Your Free Quote
        </a>
      </section>

      {/* Features - BLUE */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#0f172a] text-white rounded-2xl ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Us</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300 mb-8">
            Our brilliant team of thinkers conjures up the silliest concepts from their toolkit. Are you prepared to witness the wonders we produce?
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#1e293b] p-8 rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-blue-800/30 transition"
            >
              <div className="text-blue-500 mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-lg text-gray-300">{item.desc}</p>
            </div>
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
      <section className="bg-gradient-to-br from-blue-800 to-gray-900 text-white py-24 text-center px-6">
        <h2 className="text-5xl font-bold mb-4">IDEA?</h2>
        <p className="text-2xl mb-8 text-gray-200">
          Stop thinking. Start growing.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default How;
