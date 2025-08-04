
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const UpSkill = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
	const fetchCourses = async () => {
	  setLoading(true);
	  setError('');
	  try {
		const res = await fetch('http://localhost:5000/api/courses');
		if (!res.ok) throw new Error('Failed to fetch courses');
		const data = await res.json();
		setCourses(data);
	  } catch (err) {
		setError(err.message || 'Error fetching courses');
	  } finally {
		setLoading(false);
	  }
	};
	fetchCourses();
  }, []);

  return (
	<>
	  <Navbar />
	  <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 py-16 font-montserrat">
		<div className="max-w-7xl mx-auto px-4">
		  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4 tracking-tight">
			Upskill Yourself
		  </h1>
		  <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
			Explore our curated courses designed for creators, influencers, and
			entrepreneurs. Learn from industry experts and take your skills to the
			next level.
		  </p>
		  {error && <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>}
		  {loading ? (
			<div className="text-center text-blue-600">Loading...</div>
		  ) : (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			  {courses.map((course, i) => (
				<div
				  key={course._id || i}
				  className="bg-white rounded-2xl border border-blue-100 group hover:border-cyan-400 transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg overflow-hidden"
				>
				  <div className="h-40 w-full overflow-hidden">
					<img
					  src={course.img}
					  alt={course.title}
					  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
					/>
				  </div>
				  <div className="p-5 flex flex-col flex-1">
					<h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
					  {course.title}
					</h3>
					<p className="text-sm text-slate-600 mb-4 flex-1">
					  {course.desc}
					</p>
					<div className="flex items-center justify-between text-xs text-slate-500 mb-4">
					  <span className="inline-flex items-center gap-1">
						<svg
						  width="16"
						  height="16"
						  fill="none"
						  viewBox="0 0 24 24"
						>
						  <path
							d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
							stroke="#06b6d4"
							strokeWidth="2"
							strokeLinecap="round"
						  />
						</svg>
						{course.lessons} Lessons
					  </span>
					  <span className="inline-flex items-center gap-1">
						<svg
						  width="16"
						  height="16"
						  fill="none"
						  viewBox="0 0 24 24"
						>
						  <path
							d="M12 8v4l3 3"
							stroke="#06b6d4"
							strokeWidth="2"
							strokeLinecap="round"
						  />
						</svg>
						{course.duration}
					  </span>
					  <span className="inline-flex items-center gap-1">
						<svg
						  width="16"
						  height="16"
						  fill="none"
						  viewBox="0 0 24 24"
						>
						  <circle
							cx="12"
							cy="12"
							r="10"
							stroke="#06b6d4"
							strokeWidth="2"
						  />
						  <text
							x="12"
							y="16"
							textAnchor="middle"
							fontSize="10"
							fill="#06b6d4"
						  >
							{course.level && course.level[0]}
						  </text>
						</svg>
						{course.level}
					  </span>
					</div>
					<div className="flex items-center justify-between mt-auto">
					  <span className="text-2xl font-bold text-cyan-700">
						{course.price}
					  </span>
					  <button className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all text-sm">
						Buy Now
					  </button>
					</div>
				  </div>
				</div>
			  ))}
			</div>
		  )}
		</div>
	  </section>
	</>
  );
};

export default UpSkill;
