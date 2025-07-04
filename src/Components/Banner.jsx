import React, { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1581091012184-7f3dd220200d?auto=format&fit=crop&w=1400&q=80",
    title: "Modern Web & App Development",
    subtitle: "We build scalable, responsive, and sleek web & mobile applications."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    title: "Digital Marketing Strategy",
    subtitle: "From SEO to social media, we scale your brand with impact."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    title: "SEO & Optimization Services",
    subtitle: "Get found online. Drive traffic. Convert leads."
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.url}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
            <p className="text-lg md:text-xl max-w-2xl">{banner.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Optional: Indicators */}
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
