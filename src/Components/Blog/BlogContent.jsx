import React from 'react';

const featured = {
  title: 'How to Boost Your Traffic in 2025',
  excerpt: 'Discover the latest strategies to drive organic traffic and convert your visitors into long-term customers.',
  imgUrl: 'https://aemorph.com/wp-content/uploads/boost-web-traffic.jpg',
};

const posts = [
  {
    id: 1,
    title: '7 SEO Tips You Can’t Ignore',
    excerpt: 'Quick wins and long-term strategies to rank higher in search.',
    imgUrl: 'https://imagesuggest.com/wp-content/uploads/2021/07/13-Image-SEO-Tips-You-Cant-Ignore-2-768x478.png',
  },
  {
    id: 2,
    title: 'Social Media Ads That Convert',
    excerpt: 'Craft ads that speak to your audience and drive action.',
    imgUrl: 'https://threezi.com/wp-content/uploads/2025/01/how-to-create-a-irrestible-Social-media-Ads-that-convert.jpg',
  },
  {
    id: 3,
    title: 'Email Campaigns That Work',
    excerpt: 'Personalize, segment, and automate your way to higher ROI.',
    imgUrl: 'https://th.bing.com/th/id/OIP.mxGyam3N6BvpznbF8nYiNgHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 4,
    title: 'Understanding Analytics',
    excerpt: 'Learn which metrics matter and avoid vanity data.',
    imgUrl: 'https://subscribed.fyi/wp-content/uploads/2024/01/Understanding-Analytics-Insights_-Unveiling-the-Core-Concepts.png',
  },
];

const BlogContent = () => (
  <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
    {/* Featured Blog */}
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1 space-y-4">
        <p className="text-sm uppercase text-gray-500 tracking-wide">Featured</p>
        <h2 className="text-4xl font-semibold text-gray-900">{featured.title}</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{featured.excerpt}</p>
        <a
          href="#read"
          className="text-cyan-600 font-semibold hover:underline"
        >
          Read the full story →
        </a>
      </div>
      <div className="flex-1">
        <img
          src={featured.imgUrl}
          alt={featured.title}
          className="rounded-3xl shadow-xl w-full object-cover"
        />
      </div>
    </div>

    {/* Blog Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {posts.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={post.imgUrl}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
            <a
              href={`#post-${post.id}`}
              className="inline-block mt-2 text-cyan-600 font-medium hover:underline"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BlogContent;
