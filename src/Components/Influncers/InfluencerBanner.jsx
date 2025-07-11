import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const InfluencerBanner = () => {
  const bannerImages = [
    'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
    'https://images.unsplash.com/photo-1614286701035-4d2e68c6f0cc',
    'https://images.unsplash.com/photo-1603575448362-13f7a24e9b0f',
    'https://images.unsplash.com/photo-1611601185363-89f110e4d172',
    'https://images.unsplash.com/photo-1520975922071-ae6b1f2d3e0e',
  ];

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={0}
        slidesPerView={1}
      >
        {bannerImages.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Influencer Banner ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfluencerBanner;
