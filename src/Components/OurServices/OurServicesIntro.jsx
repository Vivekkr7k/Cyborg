import React from 'react';

const OurServicesIntro = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 px-4 md:px-8">
        {/* Text Column */}
        <div className="lg:w-1/2 flex flex-col gap-8 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              Our Services
            </h2>
            <h3 className="text-xl md:text-2xl text-cyan-700 font-semibold mb-4">
              What We Offer for Your Growth
            </h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Connoisseur of what our customer needs sets us apart. With technology nipping the old strategy,
              evolving digital era transcending the traditional strategy has become imperative. At CyborgSapient,
              we help you stay abreast of the latest business strategy. Scroll down to know about our services.
            </p>
            <a
              href="#services"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-7 rounded-lg transition shadow-md hover:shadow-lg text-lg"
            >
              Explore Our Services →
            </a>
          </div>
        </div>
        {/* Image Column */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="relative group w-full max-w-md">
            <img
              src="https://img.freepik.com/premium-photo/multiethnic-business-team-discussing-strategy-meeting-room-office-generative-ai_868783-4041.jpg?w=2000"
              alt="Team discussing strategy"
              className="rounded-3xl border-4 border-cyan-100 group-hover:border-cyan-400 transition w-full object-cover shadow-none"
              style={{ aspectRatio: '16/10' }}
            />
            <div className="absolute inset-0 rounded-3xl group-hover:bg-cyan-50/30 transition" />
          </div>
        </div>
      </div>
    </section>
);}

export default OurServicesIntro;
