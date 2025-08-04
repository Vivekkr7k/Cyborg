import React from 'react';
import { FaUserFriends, FaBrain, FaShip, FaRocket, FaChartLine } from 'react-icons/fa';

const Intro = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Who We Are
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Digital Growth <span className="text-blue-600">Partners</span> For Modern Businesses
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              <span className="font-bold text-blue-600">CYBORGSAPIENT</span> is your strategic partner in navigating the digital landscape. We combine data-driven insights with creative execution to deliver measurable results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2">
                <FaRocket /> Our Services
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium flex items-center gap-2">
                <FaChartLine /> Case Studies
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-blue-200 rounded-3xl rotate-6 opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-xl object-cover w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <FaUserFriends className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Massive Audience Reach</h3>
            <p className="text-gray-600">
              With over <span className="font-semibold text-blue-600">400 million+ users</span> online in India, we help you precisely target your ideal customers through sophisticated digital channels.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <FaBrain className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Expertise</h3>
            <p className="text-gray-600">
              Our team of <span className="font-semibold text-blue-600">digital specialists</span> brings cutting-edge strategies tailored to your business objectives and market position.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <FaShip className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Future-Ready Solutions</h3>
            <p className="text-gray-600">
              In today's digital economy, we equip you to <span className="font-semibold text-blue-600">navigate change</span> and stay ahead of evolving consumer behaviors and technologies.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Retention Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">3.5x</div>
              <div className="text-blue-100">Avg. ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;