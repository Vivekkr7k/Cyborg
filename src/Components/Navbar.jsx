import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-900 text-xl sm:text-sm md:text-md xl:text-md py-2 px-4 flex justify-between items-center">
        <div className="text-white">
          contact@cyborgsapient.com | +91 9164752256
        </div>
        <div className="flex gap-3 text-white">
          <FaFacebookF className="hover:text-black cursor-pointer" />
          <FaTwitter className="hover:text-black cursor-pointer" />
          <FaInstagram className="hover:text-black cursor-pointer" />
          <FaLinkedinIn className="hover:text-black cursor-pointer" />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-4 py-4 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-24 md:w-32">
            <img
              src="https://cyborgsapient.com/assets/images/logo.png"
              alt="CyborgSapient"
              className="w-full max-h-24"
            />
          </div>

          {/* Desktop Nav Links */}
 <div className="hidden md:flex gap-8 text-gray-700 font-medium text-base lg:text-lg">
  <Link to="/" className="hover:text-blue-600 transition">HOME</Link>
  <Link to="/blog" className="hover:text-blue-600 transition">BLOG</Link>
  <Link to="/services" className="hover:text-blue-600 transition">SERVICES</Link>
  <Link to="/influencer" className="glow transition">INFLUENCER</Link>
  <Link to="/upskill" className="hover:text-blue-600 transition">UPSKILL</Link>
</div>




          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/contact"
              className="border border-gray-300 px-4 py-1.5 rounded-full text-base hover:border-blue-600 hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="border border-gray-300 px-4 py-1.5 rounded-full text-base hover:border-blue-600 hover:text-blue-600 transition"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <HiX size={28} className="text-gray-800" />
              ) : (
                <HiMenu size={28} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3 text-base text-gray-700">
            <Link to="/" className="block hover:text-blue-600">Home</Link>
            <Link to="/products" className="block hover:text-blue-600">Products</Link>
            <Link to="/services" className="block hover:text-blue-600">Services</Link>
            <Link to="/blog" className="block hover:text-blue-600">Blog</Link>
            <Link to="/careers" className="block hover:text-blue-600">Careers</Link>
            <hr className="my-2" />
            <Link
              to="/contact"
              className="block border border-gray-300 px-4 py-2 rounded-full text-center hover:border-blue-600 hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="block border border-gray-300 px-4 py-2 rounded-full text-center hover:border-blue-600 hover:text-blue-600 transition"
            >
              About Us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
