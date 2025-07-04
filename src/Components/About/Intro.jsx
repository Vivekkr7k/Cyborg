import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaBrain, FaShip } from 'react-icons/fa';

const Intro = () => {
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 md:px-6 py-20 gap-y-16">
      
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center"
      >
        About Us
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-400 text-center"
      >
        Digital Marketing Solutions
      </motion.p>

      {/* Top Block: Text + Image */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center ml-24"
      >
        {/* Left: Text */}
        <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-5">
          <p>
            <span className="text-cyan-400 font-semibold">CYBORGSAPIENT</span> is not just another digital marketing agency — 
            we’re an <span className="text-white font-semibold">extension of your marketing team</span>.
          </p>
          <p>
            Our mission is to bring the <span className="text-blue-400">strategy</span>, <span className="text-blue-400">expertise</span>, and <span className="text-blue-400">execution</span> you need — exactly where you need it most.
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center items-center">
          <img 
            src="https://tse4.mm.bing.net/th/id/OIP.OArUrA1EIGO8KAE6JKEgIQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="About Us Visual" 
            className="w-64 h-64 md:w-72 md:h-72 rounded-xl shadow-lg object-contain bg-white p-4"
          />
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-yellow-400/30 transition duration-300 flex flex-col items-center text-center space-y-4"
        >
          <FaUserFriends className="text-yellow-300 text-3xl" />
          <p className="text-gray-300 text-base leading-relaxed">
            With over <span className="text-yellow-300 font-medium">400 million+ users online in India</span>,
            finding potential customers isn't like searching for a needle in a haystack anymore.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-400/30 transition duration-300 flex flex-col items-center text-center space-y-4"
        >
          <FaBrain className="text-cyan-300 text-3xl" />
          <p className="text-gray-300 text-base leading-relaxed">
            At <span className="text-cyan-300 font-semibold">CyborgSapient</span>, we are a team of forward-thinking experts helping your business grow.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-green-400/30 transition duration-300 flex flex-col items-center text-center space-y-4"
        >
          <FaShip className="text-green-400 text-3xl" />
          <p className="text-gray-300 text-base leading-relaxed">
            Today, it’s no longer about survival of the fittest.
            It’s about the <span className="text-green-400 font-semibold">survival of the smartest</span>. Are you ready to take control and <span className="text-white font-semibold">rudder the ship</span>?
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
