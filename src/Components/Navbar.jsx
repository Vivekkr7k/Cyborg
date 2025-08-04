import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
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
    <nav className="w-full z-50 sticky top-0 bg-white border-b border-gray-200">
      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white text-sm py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt size={14} />
              <span className="text-xs sm:text-sm">+91 9164752256</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope size={14} />
              <span className="text-xs sm:text-sm hidden sm:inline">contact@cyborgsapient.com</span>
              <span className="text-xs sm:hidden">contact@cyborgsapient.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#"><FaFacebookF size={16} className="hover:text-blue-300 transition" /></a>
            <a href="#"><FaTwitter size={16} className="hover:text-blue-300 transition" /></a>
            <a href="#"><FaInstagram size={16} className="hover:text-blue-300 transition" /></a>
            <a href="#"><FaLinkedinIn size={16} className="hover:text-blue-300 transition" /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="https://cyborgsapient.com/assets/images/logo.png"
            alt="CyborgSapient"
            className="h-14"
          />
        </Link>

        {/* Tablet Navigation - Show key links on medium screens */}
        <div className="hidden md:flex lg:hidden items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors uppercase text-sm font-medium"
          >
            HOME
          </Link>
          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600 transition-colors uppercase text-sm font-medium"
          >
            SERVICES
          </Link>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/influencer"
              className="font-bold px-2 py-1 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse text-sm"
            >
              INFLUENCER
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1 space-x-10">
          {navLinks.map((link) => (
            <div key={link.to}>
              {link.special ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={link.to}
                    className="font-bold px-3 py-2 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse text-base"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <Link
                  to={link.to}
                  className="text-gray-700 hover:text-blue-600 transition-colors uppercase text-base font-medium tracking-wider"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-base font-medium"
            >
              Contact Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/about"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-base font-medium"
            >
              About Us
            </Link>
          </motion.div>
        </div>

        {/* Tablet Buttons */}
        <div className="hidden md:flex lg:hidden items-center space-x-3 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Contact
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-700 focus:outline-none ml-auto"
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white overflow-hidden"
          >
            <div className="px-6 py-6 space-y-5 border-t border-gray-200">
              {navLinks.map((link) => (
                <div key={link.to}>
                  {link.special ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        to={link.to}
                        className="block py-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 text-base"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <Link
                      to={link.to}
                      className="block py-3 text-gray-700 hover:text-blue-600 transition-colors uppercase text-base font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex space-x-4 pt-6">
                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                  <Link
                    to="/contact"
                    className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-base font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                  <Link
                    to="/about"
                    className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;