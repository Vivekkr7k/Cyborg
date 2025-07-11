import React from 'react'
import Navbar from '../Components/Navbar'

const courses = [
	{
		title: 'Web Development Bootcamp',
		desc: 'Become a full-stack web developer with hands-on projects in HTML, CSS, JavaScript, and backend frameworks.',
		price: '₹2,999',
		img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
		lessons: 40,
		duration: '30h',
		level: 'All Levels',
	},
	{
		title: 'React Mastery',
		desc: 'Master React.js from basics to advanced concepts, including hooks, context, and building real-world apps.',
		price: '₹1,999',
		img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
		lessons: 28,
		duration: '18h',
		level: 'Intermediate',
	},
	{
		title: 'SEO Fundamentals',
		desc: 'Learn the latest SEO strategies to rank your website higher on Google and drive organic traffic.',
		price: '₹1,499',
		img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
		lessons: 16,
		duration: '7h',
		level: 'Beginner',
	},
	{
		title: 'Digital Marketing Pro',
		desc: 'Comprehensive digital marketing course covering social media, email, PPC, analytics, and more.',
		price: '₹2,499',
		img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
		lessons: 32,
		duration: '20h',
		level: 'All Levels',
	},
	{
		title: 'AI Automation for Business',
		desc: 'Automate your business workflows using AI tools, chatbots, and no-code platforms.',
		price: '₹3,499',
		img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
		lessons: 22,
		duration: '12h',
		level: 'Intermediate',
	},
	{
		title: 'Instagram Growth Hacking',
		desc: 'Grow your Instagram audience and engagement with proven strategies and automation tools.',
		price: '₹999',
		img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
		lessons: 12,
		duration: '5h',
		level: 'Beginner',
	},
];

const UpSkill = () => {
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{courses.map((course, i) => (
							<div
								key={i}
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
													{course.level[0]}
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
				</div>
			</section>
		</>
	);
};

export default UpSkill;
