import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/GlobalAPI";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.BANNERS);
        setBanners(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide every 5 seconds (only if we have banners)
  useEffect(() => {
    if (banners.length === 0) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading) {
    return (
      <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <p>Loading banners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <p>No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.image} // Now using the base64 image from the API
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
            <p className="text-lg md:text-xl max-w-2xl">{banner.subtext}</p>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;