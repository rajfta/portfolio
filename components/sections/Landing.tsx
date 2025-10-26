"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useRef, useState } from "react";

import { getRndInteger, memoize } from "../../util";

import { MotionWrapper, Wrapper } from "../wrappers";
import { count } from "console";

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
		},
	},
};

const memoizedGetRndNumber = memoize(getRndInteger);

const techs = [
	"/images/ethereum.png",
	"/images/react.png",
	"/images/nextjs.png",
	"/images/openai.png",
];

const FloatingTechsComponent = () => {
	return (
		<motion.div
			whileInView={scaleVariants.whileInView}
			className="ml-0 flex h-full flex-[1] flex-row flex-wrap items-start justify-center gap-8 md:ml-4 md:flex-col md:gap-4"
		>
			{techs.map((url, index) => {
				const first = index === 0;
				const second = index === 1;
				const third = index === 2;
				const fourth = index === 3;
				const classNames = [
					first && "w-12 h-12 hidden md:flex h-8 w-8 lg:h-16 lg:w-16",
					second && "h-16 w-16 lg:h-28 lg:w-28 md:ml-10",
					third &&
						"w-20 h-20 lg:h-36 lg:w-36 md:ml-20 md:my-4 translate-y-4 md:translate-y-0",
					fourth && "h-16 w-16 lg:h-28 lg:w-28 md:ml-10",
				].join(" ");

				return (
					<motion.div
						animate={{
							y: [0, -17],
							x: [0, memoizedGetRndNumber(-13, 13, index)],
						}}
						transition={{
							repeat: Infinity,
							duration: memoizedGetRndNumber(5, 7, index),
							delay: memoizedGetRndNumber(0, 5, index),
							ease: "linear",
							repeatType: "mirror",
						}}
						className={`flex items-center justify-center rounded-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] ${classNames}`}
						key={url}
					>
						<div className="relative w-2/3 h-2/3">
							<Image
								fill
								className="object-contain"
								src={url}
								alt="profile_bg"
							/>
						</div>
					</motion.div>
				);
			})}
		</motion.div>
	);
};

const FloatingTechs = memo(FloatingTechsComponent);

const Landing = () => {
	const [revealed, setRevealed] = useState(false);
	const [repeat, setRepeat] = useState(true);
	const counter = useRef(0);

	const toggle = useCallback(() => {
		counter.current++;
		setRepeat(false);
		if (counter.current > 4) {
			setRevealed(true);
			return;
		}

		setRevealed(!revealed);
	}, [revealed]);

	return (
		<MotionWrapper>
			<Wrapper
				idName="landing"
				style={{
					backgroundImage: "url('/images/bgIMG.png')",
					backgroundSize: "cover",
					backgroundRepeat: "repeat",
					backgroundPosition: "center",
				}}
			>
				<div className="relative flex flex-col justify-center flex-1 w-full h-full px-4 pt-24 pb-8 select-none md:w-full md:flex-row md:items-center md:pt-24 md:pb-0 xl:px-32 xl:pt-32 2xl:px-48">
					<motion.div
						whileInView={{ x: [-100, 0], opacity: [0, 1] }}
						transition={{ duration: 0.5 }}
						className="mr-0 flex h-full w-full flex-1 flex-col items-start justify-start md:mx-8 md:items-center md:justify-center"
					>
						<div className="flex flex-col items-start justify-start w-full xl:items-end xl:justify-center">
							<div className="flex w-auto flex-row items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
								<AnimatePresence mode="wait">
									{repeat ? (
										<motion.span
											exit={{ scale: 0 }}
											onClick={toggle}
											animate={{
												scale: [1, 1.5, 1.5, 1],
												rotate: [
													"0deg",
													"30deg",
													"-30deg",
													"30deg",
													"-30deg",
													"30deg",
													"-30deg",
													"30deg",
													"-30deg",
													"30deg",
													"-30deg",
													"0deg",
												],
											}}
											transition={{
												delay: 1,
												repeatDelay: 2,
												duration: 1,
												repeat: Infinity,
												repeatType: "loop",
											}}
											className="text-4xl cursor-pointer  2xl:text-7xl"
										>
											👋
										</motion.span>
									) : (
										<motion.span
											animate={{ scale: 1 }}
											onClick={toggle}
											className="relative text-4xl cursor-pointer  2xl:text-7xl"
										>
											👋
										</motion.span>
									)}
								</AnimatePresence>
								<div style={{ marginLeft: 20 }}>
									<p className="mb-4 text-right p-text">Hello there, I am</p>
									<h1
										style={{ textAlign: "right" }}
										className="leading-none head-text"
									>
										<span className="lowercase">rajfta</span>
									</h1>
								</div>
							</div>

							<div className="mt-4 flex w-auto flex-col items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] md:mt-12">
								<p className="w-full text-right uppercase p-text">
									Software Engineer
								</p>
								<p className="w-full text-right uppercase p-text">
									Tech enthusiast
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, delayChildren: 0.5 }}
						className="relative flex items-center justify-center w-full h-full my-8 flex-2 xl:my-0"
					>
						{/* Square parent container with explicit dimensions */}
						<motion.div
							animate={{
								scale: [1, 1.05],
							}}
							transition={{
								repeat: Infinity,
								duration: 10,
								ease: "linear",
								repeatType: "mirror",
							}}
							className="relative aspect-square w-[90%] max-w-md overflow-visible"
						>
							{/* Pink circle - fills entire parent square */}
							<img
								src="/svgs/circle-pink.svg"
								alt="profile_circle"
								className="absolute inset-0 z-0 h-full w-full object-contain"
							/>

							{/* Profile image - anchored at bottom, extends above parent */}
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[130%] w-full z-10">
								<Image
									fill
									src={
										counter.current > 4
											? "/images/shrek.png"
											: "/images/rajfta2.png"
									}
									className={`object-contain object-bottom transition-all duration-700 ease-linear ${
										!revealed ? "brightness-[0.2]" : "brightness-[1] "
									} ${counter.current > 4 ? "" : "scale-100"}`}
									style={
										counter.current <= 4
											? {
													maskImage:
														"linear-gradient(to bottom, black 70%, transparent 95%)",
													WebkitMaskImage:
														"linear-gradient(to bottom, black 70%, transparent 95%)",
												}
											: undefined
									}
									alt="profile_picture"
								/>
							</div>
						</motion.div>
					</motion.div>

					<FloatingTechs />
				</div>
			</Wrapper>
		</MotionWrapper>
	);
};

export default Landing;
