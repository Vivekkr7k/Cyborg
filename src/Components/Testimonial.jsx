import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah L.",
    role: "Product Manager, SaaSFlow",
    quote:
      "CyborgSapient transformed our user experience. The turnaround time was incredible, and the designs boosted our conversions significantly!",
  },
  {
    name: "David M.",
    role: "Founder, StartupX",
    quote:
      "The team is exceptionally responsive and creative. Unlimited revisions really meant we could perfect every single detail.",
  },
  {
    name: "Aisha R.",
    role: "CMO, MarketDash",
    quote:
      "Their strategy-oriented approach and eye for detail made a measurable impact on our growth campaigns.",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-white py-24 px-6 w-full font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-10">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-blue-600 mb-4">
                <FaQuoteLeft size={24} />
              </div>
              <p className="text-gray-800 text-lg mb-6 italic">"{item.quote}"</p>
              <div>
                <h4 className="text-blue-900 font-semibold text-lg">{item.name}</h4>
                <p className="text-blue-700 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
