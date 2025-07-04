import React from 'react';
import { FaChartLine, FaUsers, FaBullhorn, FaThumbsUp } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaChartLine className="text-cyan-400 text-3xl" />,
    title: 'Grow Your Sales',
    desc: 'Accelerate revenue with targeted strategies designed to attract and convert.',
  },
  {
    icon: <FaUsers className="text-green-400 text-3xl" />,
    title: 'Drive Insane Traffic',
    desc: 'Skyrocket web visitors using organic, paid, and social campaigns.',
  },
  {
    icon: <FaBullhorn className="text-blue-400 text-3xl" />,
    title: 'Convert Raving Fans',
    desc: 'Turn visitors into evangelists with optimized funnels and remarketing.',
  },
  {
    icon: <FaThumbsUp className="text-purple-400 text-3xl" />,
    title: 'Maximize ROI',
    desc: 'Higher conversions, smarter spend, faster results—guaranteed.',
  }
];

const Why = () => {
  return (
    <section className="bg-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center text-white space-y-4">
        <h2 className="text-4xl font-bold">Why Choose Us</h2>
        <p className="text-lg mx-auto max-w-3xl">
          Choose us only if you’re ready to grow your sales, drive insane traffic, and convert visitors into raving fans. If you prefer staying where you are, feel free to choose someone else—if you’re here to out‑hustle the competition, you’re in the right place.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
        {/* Left – Relevant Visual */}
        <div>
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.Q9nVCL1l4mR_VhGP2g2TWAHaEc?r=0&w=1000&h=600&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Team analyzing traffic and conversion strategy"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right – Benefits */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-6 hover:scale-105 transform transition">
                <div className="mb-4">{b.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-slate-300">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#contact"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-full transition"
            >
              Let’s Grow Your Business Together!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
