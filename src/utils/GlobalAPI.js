// Global API Configuration
const API_BASE_URL = 'https://cyborgweb-backend-1.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Influencer endpoints
  INFLUENCER: `${API_BASE_URL}/api/influencer`,
  INFLUENCER_PROFILE: `${API_BASE_URL}/api/influencer/profile`,
  INFLUENCER_LOGIN: `${API_BASE_URL}/api/influencer/login`,
  
  // Hire requests
  HIRE_REQUESTS: `${API_BASE_URL}/api/hire-requests`,
  
  // Banners
  BANNERS: `${API_BASE_URL}/api/banners`,
  
  // Contact/Inquiry
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Blogs
  BLOGS: `${API_BASE_URL}/api/blogs`,
  
  // Courses
  COURSES: `${API_BASE_URL}/api/courses`,
};

// Utility function to get full URL for image paths
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

// Utility function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Export the base URL for direct use
export { API_BASE_URL }; 