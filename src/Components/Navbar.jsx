import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/blog", label: "BLOG" },
  { to: "/services", label: "SERVICES" },
  { to: "/influencer", label: "INFLUENCER", special: true },
  { to: "/upskill", label: "UPSKILL" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="w-full z-50 sticky top-0 backdrop-blur-lg bg-white/80 shadow-md"
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-900 text-xs md:text-sm py-2 px-4 flex justify-between items-center">
        <div className="text-white font-medium tracking-wide">
          contact@cyborgsapient.com | +91 9164752256
        </div>
        <div className="flex gap-3 text-white text-lg">
          <a href="#" aria-label="Facebook"><FaFacebookF className="hover:text-cyan-300 transition" /></a>
          <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-cyan-300 transition" /></a>
          <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-cyan-300 transition" /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="hover:text-cyan-300 transition" /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-24 md:w-32 flex-shrink-0"
        >
          <img
            src="https://cyborgsapient.com/assets/images/logo.png"
            alt="CyborgSapient"
            className="w-full max-h-20"
          />
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-800 font-semibold text-base lg:text-lg items-center">
          {navLinks.map((link, i) => (
            link.special ? (
              <motion.div
                key={link.to}
                animate={{
                  scale: [1, 1.18, 1],
                  color: [
                    '#06b6d4', // cyan-500
                    '#f472b6', // pink-400
                    '#fbbf24', // yellow-400
                    '#818cf8', // violet-400
                    '#06b6d4'  // cyan-500
                  ],
                  transition: {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.25, 0.5, 0.75, 1]
                  }
                }}
                style={{
                  fontWeight: 700, // match other nav links
                  fontSize: '1rem', // match other nav links
                  letterSpacing: '0.04em',
                  padding: '0.1em 0.7em',
                  borderRadius: '0.7em',
                  zIndex: 2,
                  position: 'relative',
                  background: 'none',
                  boxShadow: 'none',
                }}
              >
                <Link
                  to={link.to}
                  className="px-3 py-1 rounded-lg"
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.08, color: '#06b6d4' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link to={link.to} className="hover:text-cyan-600 transition-all duration-200">
                  {link.label}
                </Link>
              </motion.div>
            )
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <motion.div whileHover={{ scale: 1.06 }}>
            <Link
              to="/contact"
              className="border border-cyan-500 px-5 py-2 rounded-full text-base font-semibold text-cyan-700 bg-white hover:bg-cyan-50 hover:text-cyan-900 transition"
            >
              Contact Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.06 }}>
            <Link
              to="/about"
              className="border border-gray-300 px-5 py-2 rounded-full text-base font-semibold text-gray-700 bg-white hover:bg-gray-100 hover:text-cyan-700 transition"
            >
              About Us
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <HiX size={32} className="text-gray-800" />
            ) : (
              <HiMenu size={32} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 pt-2 bg-white/95 shadow-lg rounded-b-2xl text-base text-gray-800 font-semibold"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                link.special ? (
                  <motion.div
                    key={link.to}
                    className="relative"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      backgroundImage:
                        'linear-gradient(90deg, #06b6d4, #f472b6, #fbbf24, #a78bfa, #06b6d4)',
                      backgroundSize: '300% 300%',
                      filter: 'brightness(1.2) drop-shadow(0 0 6px #fff)',
                      fontWeight: 800,
                      fontSize: '1.1em',
                      letterSpacing: '0.04em',
                      textShadow: '0 0 8px #fff, 0 0 16px #06b6d4',
                      transition: 'filter 0.2s',
                    }}
                  >
                    <Link
                      to={link.to}
                      className="px-3 py-1 rounded-lg"
                      style={{ position: 'relative', zIndex: 2 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-2 px-2 rounded hover:bg-cyan-50 hover:text-cyan-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <hr className="my-2 border-gray-200" />
              <Link
                to="/contact"
                className="block border border-cyan-500 px-4 py-2 rounded-full text-center text-cyan-700 bg-white hover:bg-cyan-50 hover:text-cyan-900 transition mb-2"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="block border border-gray-300 px-4 py-2 rounded-full text-center text-gray-700 bg-white hover:bg-gray-100 hover:text-cyan-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
