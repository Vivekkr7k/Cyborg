import React, { useState } from 'react';
import axios from 'axios';

const RegisterInfluencer = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    screenshot: null,
    transactionId: '',
    influencerType: 'Featured Influencer',
    password: '',
    confirmPassword: ''
  });
  
  const [preview, setPreview] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const price = form.influencerType === 'Featured Influencer' ? 199 : 99;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      setForm(f => ({ ...f, screenshot: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm(f => ({ ...f, [name]: value }));
      if (name === 'password' || name === 'confirmPassword') {
        setPasswordError('');
      }
    }
  };

  const validateForm = () => {
    if (form.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    if (form.password !== form.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      const { screenshot, ...formFields } = form;
      Object.entries(formFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      const response = await axios.post('http://localhost:5000/api/influencer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        setSuccess(true);
        setForm({
          name: '',
          phone: '',
          email: '',
          instagram: '',
          screenshot: null,
          transactionId: '',
          influencerType: 'Featured Influencer',
          password: '',
          confirmPassword: ''
        });
        setPreview(null);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Registration failed. Please try again.');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-2">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-2 flex flex-col" style={{ maxHeight: '95vh' }}>
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Influencer Registration</h2>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white text-2xl transition"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="ml-2 text-sm text-green-700">Registration successful!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Influencer Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center justify-center p-3 border rounded-lg">
                  <input
                    type="radio"
                    name="influencerType"
                    value="Featured Influencer"
                    checked={form.influencerType === 'Featured Influencer'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm">Featured (₹199)</span>
                </label>
                <label className="flex items-center justify-center p-3 border rounded-lg">
                  <input
                    type="radio"
                    name="influencerType"
                    value="Normal"
                    checked={form.influencerType === 'Normal'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm">Normal (₹99)</span>
                </label>
              </div>
            </div>

            {/* Payment Info Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 mb-3 text-xs font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  Payment Required
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=your-upi-id" 
                    alt="Payment QR" 
                    className="w-36 h-36 mx-auto mb-3" 
                  />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">UPI ID:</span>
                      <span className="font-medium">your-upi-id@upi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium">₹{price}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">
                  Scan the QR code or use this UPI ID to complete payment
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="9876543210"
                  maxLength="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password (min 6 chars) <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••"
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-600 animate-pulse">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Handle <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  instagram.com/
                </span>
                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  required
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="cursor-pointer">
                  <div className="group relative">
                    <div className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition">
                      <svg className="mx-auto h-10 w-10 text-gray-400 group-hover:text-indigo-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-1 text-xs text-gray-600 text-center">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500">Click to upload</span><br/>
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                    <input
                      name="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </label>
              </div>
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Payment preview"
                    className="h-24 w-auto rounded border border-gray-200 object-contain mx-auto"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="UPI1234567890"
              />
            </div>

            <div className="pt-2 pb-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterInfluencer;