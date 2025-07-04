import React, { useState } from 'react';

const items = [
  {
    title: 'Best Quality Designs',
    content: `We deliver pixel-perfect visuals that reflect your brand's essence.`,
  },
  {
    title: '16x7 Live Support',
    content: `Our team is available almost all week to assist you instantly.`,
  },
  {
    title: 'Result Oriented Projects',
    content: `Every project is structured with clear KPIs and measurable outcomes.`,
  },
  {
    title: 'Award Winning Support Team',
    content: `Recognized experts handle your queries with top-notch care.`,
  },
  {
    title: 'Experienced Professionals',
    content: `Our seasoned team offers insights that drive success.`,
  },
];

const AboutDropdown = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 py-16 px-4">
      {/* Text + Accordion */}
      <div className="w-full lg:w-1/2 space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-gray-300 py-4 cursor-pointer"
            onClick={() => toggle(idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className={`text-2xl transform transition-transform ${openIndex === idx ? 'rotate-45' : ''}`}>
                +
              </span>
            </div>
            {openIndex === idx && (
              <p className="mt-2 text-gray-600">
                {item.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Right-side image */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.RdwfJLjzXGsQDy68KR0dUgHaES?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Office team working"
          className="rounded-2xl shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default AboutDropdown;
