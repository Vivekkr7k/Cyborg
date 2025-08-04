import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/GlobalAPI';

const BlogContent = () => {
  const [featured, setFeatured] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINTS.BLOGS)
      .then(res => {
        const data = res.data || [];
        const feat = data.find(d => d.type === 'Featured') || data[0];
        const others = data.filter(d => d._id !== feat?._id);
        setFeatured(feat || null);
        setPosts(others);
      })
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  if (!featured) return <p>Loading…</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Featured Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase text-gray-500 tracking-wide flex items-center gap-2">
            {featured.type === 'Featured' && (
              <span className="inline-block bg-yellow-300 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-semibold">
                FEATURED
              </span>
            )}
          </p>
          <h2 className="text-4xl font-semibold text-gray-900">{featured.heading}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{featured.subtext}</p>
          <a href="#read" className="text-cyan-600 font-semibold hover:underline">
            Read the full story →
          </a>
        </div>
        <div className="flex-1">
          {featured.image && (
            <img
              src={featured.image}
              alt={featured.heading}
              className="rounded-3xl shadow-xl w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Other Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {post.image && (
              <img src={post.image} alt={post.heading} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {post.heading}
                {post.type === 'Featured' && (
                  <span className="ml-2 inline-block bg-yellow-300 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-semibold">
                    FEATURED
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{post.subtext}</p>
              <a href={`#post-${post._id}`} className="inline-block mt-2 text-cyan-600 font-medium hover:underline">
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogContent;
