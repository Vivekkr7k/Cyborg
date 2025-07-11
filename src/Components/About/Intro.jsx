import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaBrain, FaShip } from 'react-icons/fa';

const Intro = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-[#f1f5f9] to-[#e0e7ef] flex flex-col items-center justify-start px-0 md:px-0">
      {/* Samsung-style Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-16 md:py-28 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col items-start justify-center gap-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 leading-tight">
            About Us
          </h2>
          <p className="text-xl md:text-2xl text-blue-700 font-semibold mb-4">
            Digital Marketing Solutions
          </p>
          <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 max-w-xl">
            <p>
              <span className="text-blue-600 font-bold">CYBORGSAPIENT</span> is not just another digital marketing agency —
              we’re an <span className="text-gray-900 font-bold">extension of your marketing team</span>.
            </p>
            <p>
              Our mission is to bring the <span className="text-blue-500 font-semibold">strategy</span>, <span className="text-blue-500 font-semibold">expertise</span>, and <span className="text-blue-500 font-semibold">execution</span> you need — exactly where you need it most.
            </p>
          </div>
        </motion.div>
        {/* Right: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex items-center justify-center mt-10 md:mt-0"
        >
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.OArUrA1EIGO8KAE6JKEgIQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="About Us Visual"
            className="w-64 h-64 md:w-[350px] md:h-[350px] rounded-3xl object-cover border-0"
            style={{ boxShadow: '0 0 0 0 transparent' }}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-4 md:px-0 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center text-center space-y-4 p-8 hover:bg-blue-50 transition"
        >
          <FaUserFriends className="text-blue-500 text-4xl mb-2" />
          <p className="text-gray-700 text-base leading-relaxed">
            With over <span className="text-blue-600 font-bold">400 million+ users online in India</span>,
            finding potential customers isn't like searching for a needle in a haystack anymore.
          </p>
        </motion.div>
        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center text-center space-y-4 p-8 hover:bg-blue-50 transition"
        >
          <FaBrain className="text-blue-500 text-4xl mb-2" />
          <p className="text-gray-700 text-base leading-relaxed">
            At <span className="text-blue-600 font-bold">CyborgSapient</span>, we are a team of forward-thinking experts helping your business grow.
          </p>
        </motion.div>
        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center text-center space-y-4 p-8 hover:bg-blue-50 transition"
        >
          <FaShip className="text-blue-500 text-4xl mb-2" />
          <p className="text-gray-700 text-base leading-relaxed">
            Today, it’s no longer about survival of the fittest.
            It’s about the <span className="text-blue-600 font-bold">survival of the smartest</span>. Are you ready to take control and <span className="text-gray-900 font-bold">rudder the ship</span>?
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Intro;
