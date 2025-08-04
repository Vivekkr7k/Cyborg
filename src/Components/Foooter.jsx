import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaAngleRight,
} from "react-icons/fa";

const Footer = () => {
  const quickLinksCol1 = [
    "About",
    "Services",
    "Career",
    "Influencer",
    "Blog",
  ];
  const quickLinksCol2 = [
    "Contact",
    "Terms and Conditions",
    "Privacy Policy",
    "Refund Policy",
  ];

  return (
    <footer className="bg-[#0f172a] text-gray-300 w-full font-sans">
      {/* Use full-width bg but center content inside */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-12 border-b border-gray-700 pb-12">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">CyborgSapient</h2>
            <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-300">
              Logo Here
            </div>
            <p className="text-sm leading-relaxed">
              Why get your business online? We're the growth engine behind your digital presence.
            </p>
            <div className="flex gap-4 mt-4 text-white">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 columns inside) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-6">
              <ul className="space-y-3 text-sm">
                {quickLinksCol1.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
                    <FaAngleRight className="text-xs" /> {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm">
                {quickLinksCol2.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
                    <FaAngleRight className="text-xs" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <p>Pooja Garden, Kalkere, Bangalore</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <a href="mailto:contact@cyborgsapient.com" className="hover:text-blue-400 transition">
                  contact@cyborgsapient.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500" />
                <span>+91 9164752256</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500" />
                <span>+91 9071013799</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Copyright © 2025{" "}
          <span className="text-white font-semibold">Cyborgsapient.com</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
