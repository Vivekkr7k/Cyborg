import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RegisterInfluencer from '../Influencer/RegisterInfluencer';
import InfluencerProfile from '../Influencer/InfluencerProfile';
import HireMeForm from '../Influencer/HireMeForm';
import { API_ENDPOINTS, getImageUrl } from '../../utils/GlobalAPI';

const Into = () => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHireForm, setShowHireForm] = useState(false);
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
  const [backendInfluencers, setBackendInfluencers] = useState([]);
  const [loadingInfluencers, setLoadingInfluencers] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sliderKey, setSliderKey] = useState(0);

  // Force re-render on resize to fix responsive bugs
  useEffect(() => {
    const handleResize = () => setSliderKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    key: sliderKey,
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    pauseOnHover: true,
    swipe: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Enhanced image handling function
  const getInfluencerImage = (influencer) => {
    if (influencer.influencerImage) {
      if (influencer.influencerImage.startsWith('http')) {
        return influencer.influencerImage;
      }
      return getImageUrl(influencer.influencerImage);
    }
    
    if (influencer.screenshot) {
      if (influencer.screenshot.startsWith('http')) {
        return influencer.screenshot;
      }
      return getImageUrl(influencer.screenshot);
    }
    
    return `https://i.pravatar.cc/600?u=${influencer._id || Math.random()}`;
  };

  // Enhanced field helper with proper fallbacks and formatting
  const getInfluencerData = (influencer, field) => {
    const fieldMappings = {
      name: influencer.influencerName || influencer.name || 'Unknown Influencer',
      bio: influencer.bio || 'No bio available',
      influencerImage: getInfluencerImage(influencer),
      instaSubs: influencer.instaSubs || 'N/A',
      revenue: influencer.revenue ? `$${influencer.revenue}k` : 'N/A',
      engagement: influencer.engagementPercentage ? `${influencer.engagementPercentage}%` : 'N/A',
      avgViews: influencer.averageViews ? `${influencer.averageViews}k` : 'N/A',
      platform: influencer.platform || 'Instagram', // Default to Instagram
      clients: Array.isArray(influencer.clients) 
        ? influencer.clients 
        : (influencer.brandsWorkedWith ? influencer.brandsWorkedWith.split(',') : []),
      price: influencer.price ? `$${influencer.price}/hire` : 'Contact for pricing',
      followers: influencer.instaSubs || 'N/A',
      category: influencer.category || 'Other',
      awards: Array.isArray(influencer.awards) ? influencer.awards : []
    };
    
    return fieldMappings[field];
  };

  // Platform icon component
  const PlatformIcon = ({ platform }) => {
    const platformIcons = {
      instagram: <FaInstagram className="inline ml-1 text-pink-600" />,
      youtube: <FaYoutube className="inline ml-1 text-red-600" />,
      tiktok: <FaTiktok className="inline ml-1 text-black" />
    };
    
    const normalizedPlatform = platform?.toLowerCase() || 'instagram';
    return platformIcons[normalizedPlatform] || platformIcons.instagram;
  };

  // Memoized premium & normal influencers
  const filteredInfluencers = useMemo(() => {
    return backendInfluencers.filter(influencer => {
      const matchesCategory = selectedCategory === 'All' || getInfluencerData(influencer, 'category') === selectedCategory;
      const nameVal = (getInfluencerData(influencer, 'name') || '').toLowerCase();
      const bioVal = (getInfluencerData(influencer, 'bio') || '').toLowerCase();
      const matchesSearch =
        nameVal.includes(searchTerm.toLowerCase()) ||
        bioVal.includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [backendInfluencers, selectedCategory, searchTerm]);

  const [featuredInfluencers, normalInfluencers] = useMemo(() => {
    const featured = filteredInfluencers.filter(
      (influencer) => influencer.influencerType === 'Featured Influencer'
    );
    const normal = filteredInfluencers.filter(
      (influencer) => influencer.influencerType !== 'Featured Influencer'
    );
    return [featured, normal];
  }, [filteredInfluencers]);

  // Navigation handlers
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % featuredInfluencers.length);
  }, [featuredInfluencers.length]);
  
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + featuredInfluencers.length) % featuredInfluencers.length);
  }, [featuredInfluencers.length]);

  useEffect(() => {
    if (showModal || showProfileModal || featuredInfluencers.length === 0) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [showModal, showProfileModal, featuredInfluencers.length, next]);

  useEffect(() => {
    document.body.style.overflow = showModal || showProfileModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal, showProfileModal]);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.INFLUENCER);
        const data = await response.json();
        setBackendInfluencers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setLoadingInfluencers(false);
      }
    };
    fetchInfluencers();
  }, []);

  const handleHireClick = useCallback((influencerId) => {
    setSelectedInfluencerId(influencerId);
    setShowHireForm(true);
  }, []);

  return (
    <div className="relative">
      {/* Main Content */}

      {/* --- Featured Influencers Carousel --- */}
      <div className="w-full px-4 py-12 bg-gradient-to-br from-blue-50 to-cyan-50 font-[Montserrat]">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Featured Influencers</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover top talent with proven engagement, global reach, and industry-leading partnerships.
          </p>
        </div>
        
        {loadingInfluencers ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div>
            <p className="mt-2 text-cyan-700 font-medium">Loading influencers...</p>
          </div>
        ) : featuredInfluencers.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl max-w-2xl mx-auto shadow-sm">
            <p className="text-gray-600">No featured influencers found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <section className="w-full pb-8">
            <div className="max-w-5xl mx-auto">
              <Slider {...sliderSettings}>
                {featuredInfluencers.map((p, idx) => (
                  <div key={p._id || idx}>
                    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 min-h-[360px] mx-2">
                      <div className="relative">
                        <img
                          src={getInfluencerData(p, 'influencerImage')}
                          alt={getInfluencerData(p, 'name')}
                          className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-md"
                          onError={(e) => {
                            e.target.src = `https://i.pravatar.cc/600?u=${p._id || idx}`;
                          }}
                        />
                        {getInfluencerData(p, 'awards').length > 0 && (
                          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-800 rounded-full px-2 py-1 text-xs font-bold">
                            {getInfluencerData(p, 'awards').length} Awards
                          </div>
                        )}
                      </div>
                      <div className="text-left w-full">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-gray-800">
                            {getInfluencerData(p, 'name')}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {getInfluencerData(p, 'category')}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">
                          {getInfluencerData(p, 'bio')}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Followers</div>
                            <div className="font-semibold text-gray-800">{getInfluencerData(p, 'instaSubs')}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Monthly Revenue</div>
                            <div className="font-semibold text-gray-800">{getInfluencerData(p, 'revenue')}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Engagement Rate</div>
                            <div className="font-semibold text-gray-800">{getInfluencerData(p, 'engagement')}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Avg. Views</div>
                            <div className="font-semibold text-gray-800">{getInfluencerData(p, 'avgViews')}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Platform</div>
                            <div className="font-semibold text-gray-800">
                              {getInfluencerData(p, 'platform')}
                              <PlatformIcon platform={getInfluencerData(p, 'platform')} />
                            </div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="text-gray-500 text-xs">Price</div>
                            <div className="font-semibold text-gray-800">{getInfluencerData(p, 'price')}</div>
                          </div>
                        </div>
                        
                        {/* Clients */}
                        {getInfluencerData(p, 'clients').length > 0 && (
                          <div className="mt-5">
                            <p className="font-semibold text-gray-800 mb-2">Brands Worked With:</p>
                            <div className="flex flex-wrap gap-2">
                              {getInfluencerData(p, 'clients').map((client, i) => (
                                <span
                                  key={client + '_' + i}
                                  className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full font-medium"
                                >
                                  {client.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Hire Me Button */}
                        <button
                          onClick={() => handleHireClick(p._id)}
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
                        >
                          Hire {getInfluencerData(p, 'name').split(' ')[0]}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        )}
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, bio or category..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex gap-2">
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Food">Food & Beverage</option>
                <option value="Travel">Travel</option>
                <option value="Finance">Finance</option>
                <option value="Fitness">Fitness</option>
                <option value="Fashion">Fashion</option>
                <option value="Gaming">Gaming</option>
                <option value="Tech">Technology</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- All Influencers Grid --- */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {selectedCategory === 'All' ? 'All Influencers' : `${selectedCategory} Influencers`}
              <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {filteredInfluencers.length} found
              </span>
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredInfluencers.length} of {backendInfluencers.length} influencers
            </div>
          </div>

          {loadingInfluencers ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-600"></div>
              <p className="mt-4 text-cyan-700 font-medium">Loading influencers...</p>
            </div>
          ) : filteredInfluencers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No influencers found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
                >
                  Reset filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInfluencers.map((p, idx) => (
                <div
                  key={p._id || idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-5">
                    <div className="flex items-start">
                      <img
                        src={getInfluencerData(p, 'influencerImage')}
                        alt={getInfluencerData(p, 'name')}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        onError={(e) => {
                          e.target.src = `https://i.pravatar.cc/600?u=${p._id || idx}`;
                        }}
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-gray-800">
                            {getInfluencerData(p, 'name')}
                          </h3>
                          {getInfluencerData(p, 'awards').length > 0 && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                              {getInfluencerData(p, 'awards').length} Award{getInfluencerData(p, 'awards').length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {getInfluencerData(p, 'bio')}
                        </p>
                        <div className="mt-2">
                          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                            {getInfluencerData(p, 'category')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-gray-500 text-xs">Followers</div>
                        <div className="font-semibold text-gray-800">{getInfluencerData(p, 'followers')}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-gray-500 text-xs">Engagement</div>
                        <div className="font-semibold text-gray-800">{getInfluencerData(p, 'engagement')}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-gray-500 text-xs">Avg. Views</div>
                        <div className="font-semibold text-gray-800">{getInfluencerData(p, 'avgViews')}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-gray-500 text-xs">Platform</div>
                        <div className="font-semibold text-gray-800 flex items-center">
                          {getInfluencerData(p, 'platform')}
                          <PlatformIcon platform={getInfluencerData(p, 'platform')} />
                        </div>
                      </div>
                    </div>

                    {getInfluencerData(p, 'clients').length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs font-medium text-gray-500 mb-1">Worked With</div>
                        <div className="flex flex-wrap gap-1">
                          {getInfluencerData(p, 'clients').slice(0, 3).map((client, i) => (
                            <span
                              key={client + '_' + i}
                              className="bg-blue-50 text-blue-700 px-2 py-0.5 text-xs rounded-full"
                            >
                              {client.trim()}
                            </span>
                          ))}
                          {getInfluencerData(p, 'clients').length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded-full">
                              +{getInfluencerData(p, 'clients').length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-medium text-gray-500">Price</div>
                        <div className="font-bold text-gray-800">{getInfluencerData(p, 'price')}</div>
                      </div>
                      <button
                        onClick={() => handleHireClick(p._id)}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition"
                      >
                        Hire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Buttons - Fixed */}
      <div className="fixed z-50 bottom-6 right-6 space-y-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowProfileModal(true);
          }}
          className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all group relative"
          aria-label="Open Profile"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-opacity">
            Profile
          </span>
        </button>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className="flex items-center justify-center w-14 h-14 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full shadow-lg transition-all group relative"
          aria-label="Register as Influencer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-opacity">
            Register
          </span>
        </button>
      </div>

      {/* Modals - Professionally Fixed */}
     {typeof window !== 'undefined' && createPortal(
  <AnimatePresence>
    {showProfileModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        onClick={(e) => {
          // Close modal when clicking on backdrop
          if (e.target === e.currentTarget) {
            setShowProfileModal(false);
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Influencer Profile</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowProfileModal(false);
              }}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto p-6">
            <InfluencerProfile 
              onClose={() => setShowProfileModal(false)}
              // Pass any required props for authentication state
              isAuthenticated={true} // Or your actual auth state
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>,
  document.body
)}

      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Register as Influencer</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="overflow-y-auto p-6">
                  <RegisterInfluencer onClose={() => setShowModal(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showHireForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[102] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Hire Influencer</h2>
                  <button
                    onClick={() => {
                      setShowHireForm(false);
                      setSelectedInfluencerId(null);
                    }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <HireMeForm
                    influencerId={selectedInfluencerId}
                    onClose={() => {
                      setShowHireForm(false);
                      setSelectedInfluencerId(null);
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Into;