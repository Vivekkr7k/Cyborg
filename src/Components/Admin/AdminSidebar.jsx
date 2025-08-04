import React, { useState } from 'react';
import {
  FaChevronDown, FaChevronUp, FaHome, FaServicestack, FaBlog,
  FaInfoCircle, FaChalkboardTeacher, FaCog, FaUserShield,
  FaEnvelopeOpenText, FaUserFriends, FaHandshake
} from 'react-icons/fa';

const sidebarOptions = [
  {
    label: 'Inquiry',
    icon: <FaEnvelopeOpenText className="inline mr-2" />,
    children: [],
  },
  {
    label: 'Influencer Request',
    icon: <FaUserFriends className="inline mr-2" />,
    children: [],
  },
  {
    label: 'HireMeRequest',
    icon: <FaHandshake className="inline mr-2" />,
    children: [],
  },
  {
    label: 'Content Edit',
    icon: <FaCog className="inline mr-2" />,
    children: [
      { label: 'Homepage', icon: <FaHome className="inline mr-2" /> },
      { label: 'Services', icon: <FaServicestack className="inline mr-2" /> },
      { label: 'Blog', icon: <FaBlog className="inline mr-2" /> },
      { label: 'About Us', icon: <FaInfoCircle className="inline mr-2" /> },
      { label: 'UpSkill', icon: <FaChalkboardTeacher className="inline mr-2" /> },
    ],
  },
  {
    label: 'User Management',
    icon: <FaUserShield className="inline mr-2" />,
    children: [
      { label: 'Admins' },
      { label: 'Users' },
    ],
  },
  {
    label: 'Settings',
    icon: <FaCog className="inline mr-2" />,
    children: [],
  },
];

const AdminSidebar = ({ onSelect }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeOption, setActiveOption] = useState('');

  const handleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  const handleOptionClick = (label) => {
    setActiveOption(label);
    if (onSelect) onSelect(label);
  };

  return (
    <aside className="h-full min-h-screen w-64 bg-gradient-to-b from-blue-900 to-cyan-800 text-white shadow-xl flex flex-col py-8 px-4 font-montserrat">
      <div className="mb-10 flex items-center justify-center">
        <img src="https://cyborgsapient.com/assets/images/logo.png" alt="Logo" className="w-14 h-14 rounded-full bg-white p-2 shadow" />
      </div>
      <nav className="flex-1">
        {sidebarOptions.map((option, idx) => (
          <div key={option.label} className="mb-2">
            {option.children.length === 0 ? (
              <button
                className={`w-full flex items-center px-3 py-2 rounded-lg hover:bg-cyan-700 transition text-left ${activeOption === option.label ? 'bg-cyan-700' : ''}`}
                onClick={() => handleOptionClick(option.label)}
              >
                <span className="flex items-center">{option.icon}{option.label}</span>
              </button>
            ) : (
              <>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-cyan-700 transition ${openDropdown === idx ? 'bg-cyan-700' : ''}`}
                  onClick={() => handleDropdown(idx)}
                >
                  <span className="flex items-center">{option.icon}{option.label}</span>
                  {openDropdown === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openDropdown === idx && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {option.children.map(child => (
                      <button
                        key={child.label}
                        className={`flex items-center px-2 py-1 rounded hover:bg-cyan-600 transition text-left ${activeOption === child.label ? 'bg-cyan-600' : ''}`}
                        onClick={() => handleOptionClick(child.label)}
                      >
                        {child.icon}{child.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto text-xs text-cyan-100 text-center opacity-70">© 2025 CyborgSapient Admin</div>
    </aside>
  );
};

export default AdminSidebar;
