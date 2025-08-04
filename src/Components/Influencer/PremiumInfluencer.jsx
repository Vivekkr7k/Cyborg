import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const influencers = [
  {
    name: 'Alex Monroe',
    bio: 'Tech Creator exploring AI & AR innovations.',
    image: 'https://i.pravatar.cc/800?img=32',
    followers: '120K',
    revenue: '$45K/mo',
    engagement: '4.5%',
    avgViews: '80K/views',
    platform: 'Instagram & YouTube',
    clients: ['Apple', 'Google', 'Meta'],
  },
  {
    name: 'Bella Chen',
    bio: 'Lifestyle & Travel curator with stunning visuals.',
    image: 'https://i.pravatar.cc/800?img=47',
    followers: '200K',
    revenue: '$60K/mo',
    engagement: '5.2%',
    avgViews: '120K/views',
    platform: 'Instagram & TikTok',
    clients: ['Nike', 'Adidas', 'Canon'],
  },
  {
    name: 'Carlos Reyes',
    bio: 'Fitness coach transforming lives daily.',
    image: 'https://i.pravatar.cc/800?img=12',
    followers: '150K',
    revenue: '$50K/mo',
    engagement: '6.1%',
    avgViews: '90K/views',
    platform: 'Instagram & YouTube',
    clients: ['Reebok', 'Under Armour', 'Fitbit'],
  },
];

const PremiumInfluencer = () => {
  const [sliderKey, setSliderKey] = useState(0);

  // Force re-render on resize to fix responsive bugs
  useEffect(() => {
    const handleResize = () => setSliderKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
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

  return (
    <section className="w-full px-4 py-12 bg-gray-50 font-[Montserrat]">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Meet Our Premium Influencers</h2>
        <p className="text-gray-500 mt-3">
          Discover top talent with proven engagement, global reach, and industry-leading partnerships.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {influencers.map((inf, idx) => (
            <div key={idx}>
              <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 min-h-[360px]">
                <img
                  src={inf.image}
                  alt={inf.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <div className="text-left w-full">
                  <h3 className="text-2xl font-bold text-gray-800">{inf.name}</h3>
                  <p className="text-gray-600 mt-2">{inf.bio}</p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-700">
                    <div><span className="font-semibold">{inf.followers}</span> Followers</div>
                    <div><span className="font-semibold">{inf.revenue}</span> Revenue</div>
                    <div><span className="font-semibold">{inf.engagement}</span> Engagement</div>
                    <div><span className="font-semibold">{inf.avgViews}</span> Avg Views</div>
                    <div className="col-span-2 sm:col-span-1"><span className="font-semibold">{inf.platform}</span></div>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold text-gray-800 mb-2">Worked with:</p>
                    <div className="flex flex-wrap gap-2">
                      {inf.clients.map((client) => (
                        <span
                          key={client}
                          className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full font-medium"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-sm rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PremiumInfluencer;
