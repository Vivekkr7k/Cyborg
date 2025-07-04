import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const featured = [
  {
    name: 'Alice Johnson',
    bio: 'Lifestyle & Travel storyteller going beyond the horizon.',
    subs: { instagram: '800K', youtube: '1.2M', tiktok: '600K' },
    price: '$3,200',
    img: 'https://i.pravatar.cc/600?u=alice',
  },
  {
    name: 'Brian Lee',
    bio: 'Tech reviewer passionate about gadgets.',
    subs: { instagram: '500K', youtube: '900K', tiktok: '400K' },
    price: '$2,000',
    img: 'https://i.pravatar.cc/600?u=brian',
  },
];

const profiles = [
  {
    name: 'Cindy Wang',
    bio: 'Food & wellness enthusiast cooking healthy moments.',
    subs: { instagram: '300K', youtube: '', tiktok: '350K' },
    price: '$1,500',
    img: 'https://i.pravatar.cc/400?u=cindy',
    socials: ['instagram', 'tiktok'],
  },
  {
    name: 'David Kim',
    bio: 'Fitness coach transforming lives one rep at a time.',
    subs: { instagram: '450K', youtube: '330K', tiktok: '' },
    price: '$1,800',
    img: 'https://i.pravatar.cc/400?u=david',
    socials: ['instagram', 'youtube'],
  },
  {
    name: 'Eva Patel',
    bio: 'Fashionista blending elegance and street vibes.',
    subs: { instagram: '250K', youtube: '', tiktok: '290K' },
    price: '$1,200',
    img: 'https://i.pravatar.cc/400?u=eva',
    socials: ['instagram', 'tiktok'],
  },
];

const variants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

const Icon = ({ platform }) =>
  platform === 'instagram' ? (
    <FaInstagram className="text-pink-500" />
  ) : platform === 'youtube' ? (
    <FaYoutube className="text-red-600" />
  ) : platform === 'tiktok' ? (
    <FaTiktok className="text-black" />
  ) : null;

const Into = () => {
  const [index, setIndex] = useState(0);
  const length = featured.length;

  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white font-montserrat">
      <MotionConfig transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <div
          className="relative max-w-5xl mx-auto px-4"
          style={{ height: '400px', overflow: 'hidden' }} // Fix container height and hide overflow
        >
          <AnimatePresence initial={false} mode="sync">
            {featured.map((p, i) =>
              i === index ? (
                <motion.div
                  key={p.name}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8 absolute top-0 left-0 right-0 bottom-0"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="rounded-2xl w-full md:w-1/2 h-64 object-cover shadow-md"
                  />

                  <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-4xl font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-gray-700">{p.bio}</p>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                      {Object.entries(p.subs).map(
                        ([plat, cnt]) =>
                          cnt && (
                            <div key={plat} className="flex items-center space-x-2">
                              <Icon platform={plat} />
                              <span className="font-medium">{cnt}</span>
                            </div>
                          )
                      )}
                    </div>

                    <div className="mt-2 text-lg font-medium text-gray-800">{p.price} / hire</div>
                    <button className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
                      Hire Me
                    </button>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          <div className="absolute inset-y-1/2 flex justify-between w-full px-4 pointer-events-auto">
            <button onClick={prev} className="bg-white p-3 rounded-full shadow-md hover:shadow-lg">
              ‹
            </button>
            <button onClick={next} className="bg-white p-3 rounded-full shadow-md hover:shadow-lg">
              ›
            </button>
          </div>
        </div>
      </MotionConfig>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4">
        {profiles.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 space-y-4"
          >
            <img src={p.img} alt={p.name} className="rounded-xl w-full h-48 object-cover" />
            <h4 className="text-2xl font-semibold">{p.name}</h4>
            <p className="text-gray-700">{p.bio}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-1">
                {Object.entries(p.subs).map(
                  ([plat, cnt]) =>
                    cnt && (
                      <div key={plat} className="flex items-center space-x-2">
                        <Icon platform={plat} />
                        <span>{cnt}</span>
                      </div>
                    )
                )}
              </div>
              <div className="text-right font-medium">{p.price}</div>
            </div>
            <div className="flex space-x-4 text-xl">
              {p.socials.map((plat) => (
                <Icon key={plat} platform={plat} />
              ))}
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg shadow">
              Hire Me
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Into;
