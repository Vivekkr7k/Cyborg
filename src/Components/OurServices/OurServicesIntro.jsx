import React from 'react';

const OurServicesIntro = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        {/* Text Column */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          {/* <h3 className="text-xl text-gray-600">
            What Our Agency Provides
          </h3> */}
          <p className="text-gray-700 leading-relaxed">
            Connoisseur of what our customer needs sets us apart. With technology nipping the old strategy,
            evolving digital era transcending the traditional strategy has become imperative. At CyborgSapient,
            we help you stay abreast of the latest business strategy. Scroll down to know about our services.
          </p>
          {/* <a
            href="#services"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Explore Our Services →
          </a> */}
        </div>

        {/* Image Column */}
        <div className="lg:w-1/2">
          <img
            src="https://img.freepik.com/premium-photo/multiethnic-business-team-discussing-strategy-meeting-room-office-generative-ai_868783-4041.jpg?w=2000"
            alt="Team discussing strategy"
            className="rounded-3xl shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>
);}

export default OurServicesIntro;
