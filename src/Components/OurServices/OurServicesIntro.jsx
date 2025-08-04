import React from 'react';

const OurServicesIntro = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 py-16 px-4 font-[Montserrat]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600 leading-tight mb-4">
            Our Services
          </h2>
          <h3 className="text-lg md:text-xl text-cyan-700 font-semibold mb-4">
            What We Offer for Your Growth
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            Connoisseur of what our customer needs sets us apart. With technology nipping the old strategy,
            evolving digital era transcending the traditional strategy has become imperative. At CyborgSapient,
            we help you stay abreast of the latest business strategy. Scroll down to know about our services.
          </p>
          <a
            href="#services"
            className="inline-block bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl text-sm shadow-lg hover:scale-105 transform transition duration-300"
          >
            Explore Our Services →
          </a>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/40 border border-cyan-100 hover:border-cyan-300 transition-all duration-300">
            <img
              src="https://img.freepik.com/premium-photo/multiethnic-business-team-discussing-strategy-meeting-room-office-generative-ai_868783-4041.jpg?w=2000"
              alt="Team discussing strategy"
              className="object-cover w-full h-full rounded-3xl scale-100 hover:scale-105 transition duration-500"
              style={{ aspectRatio: '16/10' }}
            />
            <div className="absolute inset-0 bg-cyan-50/10 hover:bg-cyan-100/10 transition rounded-3xl" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurServicesIntro;
