import React from 'react';
import { FaEye, FaBullseye, FaGem } from 'react-icons/fa';

const Mission = () => {
  return (
    <div className="w-full bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Vision Card */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
          <FaEye className="text-cyan-400 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-white">VISION</h3>
          <p className="text-slate-300 leading-relaxed text-base">
            To pioneer innovation at the intersection of technology and creativity, empowering Cyborgsapient Pvt Ltd to solve complex customer challenges and drive sustainable growth.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
          <FaBullseye className="text-blue-400 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-white">MISSION</h3>
          <p className="text-slate-300 leading-relaxed text-base">
            We aim to continuously innovate and deliver solutions that exceed expectations. Through strong marketing and a growth mindset, we support both customer and team success while contributing to society.
          </p>
        </div>

        {/* Values Card */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-md p-6 flex flex-col items-start transition-transform hover:scale-105 duration-300">
          <FaGem className="text-indigo-400 text-4xl mb-4 self-center" />
          <h3 className="text-2xl font-semibold mb-3 text-white self-center">VALUES</h3>
          <ul className="text-slate-300 text-base space-y-2 list-disc list-inside text-left">
            <li><span className="font-medium text-white">Integrity</span></li>
            <li><span className="font-medium text-white">Respect</span></li>
            <li><span className="font-medium text-white">Growth Mindset</span></li>
            <li><span className="font-medium text-white">Value Creation</span></li>
            <li><span className="font-medium text-white">Societal Contribution</span></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Mission;
