import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

// Add extra details for featured influencers
const featured = [
	{
		name: 'Alice Johnson',
		bio: 'Lifestyle & Travel storyteller going beyond the horizon.',
		subs: { instagram: '800K', youtube: '1.2M', tiktok: '600K' },
		price: '$3,200',
		img: 'https://i.pravatar.cc/600?u=alice',
		clients: 42,
		revenue: '$120K',
		awards: 5,
	},
	{
		name: 'Brian Lee',
		bio: 'Tech reviewer passionate about gadgets.',
		subs: { instagram: '500K', youtube: '900K', tiktok: '400K' },
		price: '$2,000',
		img: 'https://i.pravatar.cc/600?u=brian',
		clients: 31,
		revenue: '$85K',
		awards: 3,
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

const moreProfiles = [
	{
		name: 'Grace Lin',
		bio: 'Beauty creator inspiring confidence daily.',
		subs: { instagram: '180K', youtube: '120K', tiktok: '210K' },
		price: '$1,000',
		img: 'https://i.pravatar.cc/400?u=grace',
		socials: ['instagram', 'youtube', 'tiktok'],
	},
	{
		name: 'Harsh Singh',
		bio: 'Automotive vlogger and car enthusiast.',
		subs: { instagram: '220K', youtube: '300K', tiktok: '' },
		price: '$1,400',
		img: 'https://i.pravatar.cc/400?u=harsh',
		socials: ['instagram', 'youtube'],
	},
	{
		name: 'Isabella Rossi',
		bio: 'Travel & adventure explorer sharing new worlds.',
		subs: { instagram: '160K', youtube: '', tiktok: '190K' },
		price: '$950',
		img: 'https://i.pravatar.cc/400?u=isabella',
		socials: ['instagram', 'tiktok'],
	},
	{
		name: 'Jamal Carter',
		bio: 'Music producer and beat maker.',
		subs: { instagram: '140K', youtube: '210K', tiktok: '170K' },
		price: '$1,100',
		img: 'https://i.pravatar.cc/400?u=jamal',
		socials: ['instagram', 'youtube', 'tiktok'],
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
		<div>
			<section className="py-16 bg-gradient-to-br from-white via-blue-50 to-cyan-50 min-h-screen font-montserrat">
				{/* Featured Influencers Carousel */}
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">
						Featured Influencers
					</h2>
					<MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
						<div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
							<AnimatePresence initial={false} mode="sync">
								{featured.map((p, i) =>
									i === index ? (
										<motion.div
											key={p.name}
											className="bg-gradient-to-br from-cyan-100 via-white to-blue-100/80 border-2 border-cyan-400/40 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 absolute top-0 left-0 right-0 bottom-0 mx-auto w-full max-w-3xl ring-4 ring-cyan-300/30"
											variants={variants}
											initial="enter"
											animate="center"
											exit="exit"
											style={{
												boxShadow: '0 12px 40px 0 rgba(31, 72, 160, 0.13)',
												maxWidth: '70vw',
												width: '100%',
												minWidth: 320,
												margin: '0 auto',
											}}
										>
											<img
												src={p.img}
												alt={p.name}
												className="rounded-2xl w-full md:w-1/2 h-64 object-cover shadow-lg border-2 border-cyan-200"
											/>
											<div className="w-full md:w-1/2 flex flex-col justify-between h-full">
												<div className="space-y-4">
													<h3 className="text-4xl font-extrabold text-cyan-800 leading-tight drop-shadow">
														{p.name}
													</h3>
													<p className="text-lg text-slate-700">{p.bio}</p>
													<div className="flex flex-wrap items-center gap-6 text-cyan-700 text-base">
														{Object.entries(p.subs).map(
															([plat, cnt]) =>
																cnt ? (
																	<div key={plat} className="flex items-center space-x-2">
																		<Icon platform={plat} />
																		<span className="font-semibold">{cnt}</span>
																	</div>
																) : null
														)}
													</div>
													{/* Extra details row */}
													<div className="flex flex-wrap gap-6 mt-2 text-sm text-slate-700">
														<div className="flex flex-col items-center">
															<span className="font-bold text-lg text-cyan-700">
																{p.clients}
															</span>
															<span className="text-xs">Clients</span>
														</div>
														<div className="flex flex-col items-center">
															<span className="font-bold text-lg text-cyan-700">
																{p.revenue}
															</span>
															<span className="text-xs">Revenue</span>
														</div>
														<div className="flex flex-col items-center">
															<span className="font-bold text-lg text-cyan-700">
																{p.awards}
															</span>
															<span className="text-xs">Awards</span>
														</div>
													</div>
												</div>
												<div className="flex flex-col justify-end h-full mt-6 items-center">
													<div className="mt-2 text-xl font-bold text-cyan-700 text-center">
														{p.price}{' '}
														<span className="text-base font-normal text-slate-500">
															/ hire
														</span>
													</div>
													<button className="mt-4 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 px-8 rounded-full shadow transition-all w-full max-w-xs mx-auto">
														Hire Me
													</button>
												</div>
											</div>
										</motion.div>
									) : null
								)}
							</AnimatePresence>
						</div>
					</MotionConfig>

					{/* Highlighted Cards for Featured Influencers */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 mb-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50/80 rounded-3xl py-8 px-2 shadow-lg border border-cyan-100">
						{featured.map((p) => (
							<div
								key={p.name}
								className="bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl border border-blue-100 p-5 flex flex-col items-center transition-all duration-300 group min-h-[240px] relative overflow-hidden justify-between"
								style={{ boxShadow: '0 6px 24px 0 rgba(31, 72, 160, 0.10)', maxWidth: 260 }}
							>
								<div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-200 shadow group-hover:scale-105 transition-transform duration-300 mb-3 bg-gradient-to-br from-cyan-100 to-blue-50 flex items-center justify-center">
									<img
										src={p.img}
										alt={p.name}
										className="object-cover w-full h-full"
									/>
								</div>
								<h4 className="text-lg font-bold text-slate-900 text-center mb-1">{p.name}</h4>
								<p className="text-xs text-slate-600 text-center mb-2 line-clamp-2">{p.bio}</p>
								<div className="flex flex-wrap items-center gap-3 text-xs text-cyan-700 justify-center mb-2">
									{Object.entries(p.subs).map(([plat, cnt]) =>
										cnt ? (
											<div key={plat} className="flex items-center space-x-1">
												<Icon platform={plat} />
												<span className="font-semibold">{cnt}</span>
											</div>
										) : null
									)}
								</div>
								{/* Extra details row */}
								<div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-700 w-full justify-center">
									<div className="flex flex-col items-center">
										<span className="font-bold text-cyan-700">{p.clients}</span>
										<span className="text-[10px]">Clients</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="font-bold text-cyan-700">{p.revenue}</span>
										<span className="text-[10px]">Revenue</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="font-bold text-cyan-700">{p.awards}</span>
										<span className="text-[10px]">Awards</span>
									</div>
								</div>
								<div className="flex flex-col justify-end w-full mt-3 items-center">
									<div className="text-base font-bold text-cyan-700 mb-2 text-center">{p.price}</div>
									<button className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 rounded-xl shadow transition-all text-sm mt-auto max-w-xs mx-auto">
										Hire Me
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Other Influencers Grid */}
				<div className="max-w-7xl mx-auto mt-20 px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-3xl py-10 border border-blue-100">
					<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center tracking-tight">
						Other Influencers
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{[...profiles, ...moreProfiles].map((p) => (
							<div
								key={p.name}
								className="bg-white/90 rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 p-5 flex flex-col items-center transition-all duration-300 group min-h-[200px] relative overflow-hidden"
								style={{ boxShadow: '0 4px 16px 0 rgba(31, 72, 160, 0.08)', maxWidth: 240 }}
							>
								<div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-100 shadow group-hover:scale-105 transition-transform duration-300 mb-2 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
									<img
										src={p.img}
										alt={p.name}
										className="object-cover w-full h-full"
									/>
								</div>
								<h4 className="text-base font-bold text-slate-900 text-center mb-1">{p.name}</h4>
								<p className="text-xs text-slate-600 text-center mb-2 line-clamp-2">{p.bio}</p>
								<div className="flex flex-wrap items-center gap-2 text-xs text-cyan-700 justify-center mb-2">
									{Object.entries(p.subs).map(([plat, cnt]) =>
										cnt ? (
											<div key={plat} className="flex items-center space-x-1">
												<Icon platform={plat} />
												<span className="font-semibold">{cnt}</span>
											</div>
										) : null
									)}
								</div>
								<div className="text-sm font-bold text-cyan-700 mb-2 text-center">{p.price}</div>
								<div className="flex space-x-3 text-base justify-center mb-2">
									{p.socials && p.socials.map((plat) => (
										<Icon key={plat} platform={plat} />
									))}
								</div>
								<button className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 rounded-xl shadow transition-all text-sm">
									Hire Me
								</button>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Into;
