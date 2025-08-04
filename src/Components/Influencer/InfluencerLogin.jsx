import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiEdit, 
  FiLogOut, 
  FiCheck, 
  FiUpload, 
  FiInstagram, 
  FiYoutube, 
  FiTwitter,
  FiDollarSign,
  FiPercent,
  FiEye
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const profileSchema = yup.object().shape({
  influencerName: yup.string().required('Display name is required'),
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
  category: yup.string().required('Category is required'),
  instaSubs: yup.string(),
  revenue: yup.string(),
  clients: yup.string(),
  awards: yup.string(),
  price: yup.number().min(0, 'Price must be positive').typeError('Price must be a number'),
  engagementPercentage: yup.number()
    .min(0, 'Engagement must be between 0-100')
    .max(100, 'Engagement must be between 0-100')
    .typeError('Engagement must be a number'),
  averageViews: yup.number().min(0, 'Views must be positive').typeError('Views must be a number')
});

const InfluencerLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [influencerData, setInfluencerData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: 'onChange'
  });

  // Initialize form with influencer data
  useEffect(() => {
    if (influencerData) {
      reset({
        influencerName: influencerData.influencerName || '',
        bio: influencerData.bio || '',
        category: influencerData.category || 'Other',
        instaSubs: influencerData.instaSubs || '',
        revenue: influencerData.revenue || '',
        clients: influencerData.clients?.join(', ') || '',
        awards: influencerData.awards?.join(', ') || '',
        price: influencerData.price || 0,
        engagementPercentage: influencerData.engagementPercentage || 0,
        averageViews: influencerData.averageViews || 0
      });
    }
  }, [influencerData, reset]);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('influencerToken');
    if (token) {
      fetchProfile(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchProfile = useCallback(async (token) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/influencer/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setInfluencerData(response.data);
      setIsLoggedIn(true);
      setPreviewImage(
        response.data.influencerImage 
          ? `http://localhost:5000${response.data.influencerImage}`
          : ''
      );
    } catch (err) {
      console.error('Error fetching profile:', err);
      handleLogout();
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('influencerToken');
    setIsLoggedIn(false);
    setInfluencerData(null);
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else if (file) {
      setError('Image size must be less than 2MB');
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (profileImage) {
        formData.append('influencerImage', profileImage);
      }

      const token = localStorage.getItem('influencerToken');
      const response = await axios.patch(
        'http://localhost:5000/api/influencer/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      setInfluencerData(response.data);
      setEditMode(false);
      setProfileImage(null);
      setPreviewImage(
        response.data.influencerImage 
          ? `http://localhost:5000${response.data.influencerImage}`
          : ''
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const renderStatCard = (icon, title, value, unit = '') => (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
      <div className="flex items-center mb-2">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
          {icon}
        </div>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <p className="text-2xl font-bold">
        {value || 'N/A'}{unit}
      </p>
    </div>
  );

  if (loading && !influencerData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-0">
              Influencer Profile
            </h1>
            <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/20 text-white rounded-lg sm:rounded-xl hover:bg-white/30 transition-all text-sm sm:text-base"
                >
                  <FiEdit className="mr-1 sm:mr-2" />
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditMode(false);
                    setProfileImage(null);
                    setPreviewImage(
                      influencerData?.influencerImage 
                        ? `http://localhost:5000${influencerData.influencerImage}`
                        : ''
                    );
                  }}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/20 text-white rounded-lg sm:rounded-xl hover:bg-white/30 transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/20 text-white rounded-lg sm:rounded-xl hover:bg-white/30 transition-all text-sm sm:text-base"
              >
                <FiLogOut className="mr-1 sm:mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Main Content */}
        {!editMode ? (
          // View Mode
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Card (Left Column) */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 sm:mb-6">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-200 to-cyan-200 flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-bold text-white">
                          {influencerData?.name?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                    {influencerData?.influencerName || influencerData?.name}
                  </h2>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                    {influencerData?.category || 'Other'}
                  </span>

                  {/* Stats */}
                  <div className="mt-6 w-full space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-600">Followers</span>
                      <span className="font-semibold">
                        {influencerData?.instaSubs || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-600">Price</span>
                      <span className="font-semibold">
                        {influencerData?.price ? `$${influencerData.price}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        influencerData?.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : influencerData?.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {influencerData?.status?.toUpperCase() || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 flex space-x-3 sm:space-x-4">
                    <button className="p-2 sm:p-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full shadow">
                      <FiInstagram size={18} />
                    </button>
                    <button className="p-2 sm:p-3 bg-red-600 text-white rounded-full shadow">
                      <FiYoutube size={18} />
                    </button>
                    <button className="p-2 sm:p-3 bg-black text-white rounded-full shadow">
                      <FaTiktok size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details (Right Column) */}
            <div className="lg:col-span-3 space-y-6">
              {/* About Section */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {influencerData?.bio || 'No bio provided'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Clients */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Clients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(influencerData?.clients || []).length > 0 ? (
                      influencerData.clients.map((client, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {client}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No clients listed</p>
                    )}
                  </div>
                </div>

                {/* Awards */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Awards
                  </h3>
                  <ul className="space-y-2">
                    {(influencerData?.awards || []).length > 0 ? (
                      influencerData.awards.map((award, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 text-blue-600 rounded-full mr-2 sm:mr-3 mt-0.5">
                            <FiCheck size={12} />
                          </span>
                          <span className="text-sm sm:text-base">{award}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No awards listed</p>
                    )}
                  </ul>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                  Engagement Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {renderStatCard(
                    <FiDollarSign size={18} />,
                    'Price',
                    influencerData?.price,
                    ''
                  )}
                  {renderStatCard(
                    <FiPercent size={18} />,
                    'Engagement Rate',
                    influencerData?.engagementPercentage,
                    '%'
                  )}
                  {renderStatCard(
                    <FiEye size={18} />,
                    'Avg. Views',
                    influencerData?.averageViews,
                    ''
                  )}
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-sm sm:text-base">
                      {influencerData?.email || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-sm sm:text-base">
                      {influencerData?.phone || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Influencer ID</p>
                    <p className="font-medium text-sm sm:text-base">
                      {influencerData?.influencerId || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Member Since</p>
                    <p className="font-medium text-sm sm:text-base">
                      {influencerData?.createdAt 
                        ? new Date(influencerData.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Profile Image Upload */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 sm:mb-6">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : influencerData?.influencerImage ? (
                        <img
                          src={`http://localhost:5000${influencerData.influencerImage}`}
                          alt="Current"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-200 to-cyan-200 flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-bold text-white">
                            {influencerData?.name?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="profileImage"
                      className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-blue-600 rounded-lg sm:rounded-xl shadow hover:bg-gray-50 cursor-pointer transition-all text-sm sm:text-base"
                    >
                      <FiUpload className="mr-1 sm:mr-2" />
                      Change Photo
                    </label>
                    <p className="mt-2 text-xs text-gray-500">JPG, PNG up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="lg:col-span-3 space-y-6">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="influencerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name*
                      </label>
                      <input
                        id="influencerName"
                        {...register('influencerName')}
                        className={`w-full px-4 py-3 border ${
                          errors.influencerName ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
                      />
                      {errors.influencerName && (
                        <p className="mt-1 text-xs text-red-500">{errors.influencerName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <select
                        id="category"
                        {...register('category')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      >
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Finance">Finance</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Tech">Tech</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <label htmlFor="bio" className="block text-lg font-semibold text-gray-800 mb-3">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    {...register('bio')}
                    rows={4}
                    className={`w-full px-4 py-3 border ${
                      errors.bio ? 'border-red-300' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
                    placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                  />
                  {errors.bio && (
                    <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Max 500 characters
                  </p>
                </div>

                {/* Stats */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="instaSubs" className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram Subscribers
                      </label>
                      <input
                        id="instaSubs"
                        {...register('instaSubs')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="e.g. 50K"
                      />
                    </div>
                    <div>
                      <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Revenue
                      </label>
                      <input
                        id="revenue"
                        {...register('revenue')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="e.g. $5K"
                      />
                    </div>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Engagement Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        id="price"
                        type="number"
                        {...register('price')}
                        className={`w-full px-4 py-3 border ${
                          errors.price ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
                        placeholder="e.g. 500"
                      />
                      {errors.price && (
                        <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="engagementPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                        Engagement Rate (%)
                      </label>
                      <input
                        id="engagementPercentage"
                        type="number"
                        {...register('engagementPercentage')}
                        className={`w-full px-4 py-3 border ${
                          errors.engagementPercentage ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
                        placeholder="e.g. 3.5"
                      />
                      {errors.engagementPercentage && (
                        <p className="mt-1 text-xs text-red-500">{errors.engagementPercentage.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="averageViews" className="block text-sm font-medium text-gray-700 mb-1">
                        Average Views
                      </label>
                      <input
                        id="averageViews"
                        type="number"
                        {...register('averageViews')}
                        className={`w-full px-4 py-3 border ${
                          errors.averageViews ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base`}
                        placeholder="e.g. 10000"
                      />
                      {errors.averageViews && (
                        <p className="mt-1 text-xs text-red-500">{errors.averageViews.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Clients & Awards */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="clients" className="block text-lg font-semibold text-gray-800 mb-3">
                        Clients
                      </label>
                      <input
                        id="clients"
                        {...register('clients')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="Separate with commas (Nike, Adidas, Apple)"
                      />
                    </div>
                    <div>
                      <label htmlFor="awards" className="block text-lg font-semibold text-gray-800 mb-3">
                        Awards
                      </label>
                      <input
                        id="awards"
                        {...register('awards')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        placeholder="Separate with commas (Best Creator 2023, Top 100)"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setProfileImage(null);
                      setPreviewImage(
                        influencerData?.influencerImage 
                          ? `http://localhost:5000${influencerData.influencerImage}`
                          : ''
                      );
                    }}
                    className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty || loading}
                    className={`px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${
                      (!isDirty || loading) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InfluencerLogin;