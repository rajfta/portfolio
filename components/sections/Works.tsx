"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import type { WorksType } from "../../types/sanity";
import { MotionWrapper, Wrapper } from "../wrappers";

type WorksProps = {
	works: WorksType;
};

const tags = ["All", "UI/UX", "NextJS", "Web3", "Graphql"];

const Works = ({ works }: WorksProps) => {
	const [filteredWorks, setFilteredWorks] = useState(works);
	const [activeFilter, setActiveFilter] = useState("All");
	const controls = useAnimation();

	const handleWorkFilter = useCallback(
		(item: string) => {
			setActiveFilter(item);
			if (item === activeFilter) {
				return;
			}

			controls.start({
				opacity: 0,
				y: 150,
				transition: { duration: 0.4, ease: "linear" },
			});

			setTimeout(() => {
				controls.start({
					opacity: 1,
					y: 0,
					transition: { duration: 0.4, ease: "linear" },
				});
				if (item === "All") {
					setFilteredWorks(works);
				} else {
					setFilteredWorks(works.filter((work) => work.tags?.includes(item)));
				}
			}, 450);
		},
		[activeFilter, controls, works],
	);

	return (
		<MotionWrapper>
			<Wrapper idName="works">
				<div className="mt-16 flex flex-col items-center justify-center md:mt-0">
					<h2 className="head-text">
						My Humble <span>Portfolio</span> <br /> Section
					</h2>

					<div className="mt-16 mb-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
						{tags.map((item) => (
							<button
								key={item}
								type="button"
								onClick={() => handleWorkFilter(item)}
								className={`flex cursor-pointer items-center justify-center rounded-lg bg-white py-2 px-4 font-extrabold text-black shadow-sm transition-all duration-300 ease-linear hover:bg-secondary hover:text-[#fff] ${
									activeFilter === item && "bg-secondary text-[#fff]"
								}`}
							>
								{item}
							</button>
						))}
					</div>

					<AnimatePresence>
						<motion.div
							animate={controls}
							className="flex flex-wrap items-center justify-center"
						>
							{filteredWorks.map((work) => (
								<div
									className="m-8 flex w-72 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#fff] p-4 text-black transition-all duration-300 ease-linear hover:shadow-[0px_0px_25px_rgba(0,0,0,0.2)]"
									key={work._id}
								>
									<div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg">
										<Image
											src={work.imgUrl}
											fill
											className="object-cover"
											alt={work.title}
										/>

										<motion.div
											whileHover={{ opacity: 1 }}
											transition={{
												duration: 0.3,
												ease: "linear",
											}}
											className="opacity-1 absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)] md:opacity-0"
										>
											{work.projectLink && (
												<a
													href={work.projectLink}
													target="_blank"
													rel="noreferrer"
												>
													<motion.div
														whileHover={{ scale: 1.1 }}
														transition={{ duration: 0.25, ease: "linear" }}
														className="m-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] font-extrabold text-[#fff]"
													>
														<AiFillEye className="h-1/2 w-1/2 text-white" />
													</motion.div>
												</a>
											)}
											{work?.codeLink && (
												<a
													href={work.codeLink}
													target="_blank"
													rel="noreferrer"
												>
													<motion.div
														whileHover={{ scale: 1.1 }}
														transition={{ duration: 0.25, ease: "linear" }}
														className="m-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] font-extrabold text-[#fff]"
													>
														<AiFillGithub className="h-1/2 w-1/2 text-white" />
													</motion.div>
												</a>
											)}
										</motion.div>
									</div>

									<div className="relative flex w-full flex-col items-center justify-center p-2">
										<h4 className="bold-text mt-4 leading-6 2xl:mt-8">
											{work.title}
										</h4>
										<p className="p-text" style={{ marginTop: 10 }}>
											{work.description}
										</p>

										<div className="absolute -top-6 flex items-center justify-center rounded-lg bg-[#fff] px-4 py-2">
											<p className="p-text">{work.tags?.[0]}</p>
										</div>
									</div>
								</div>
							))}
						</motion.div>
					</AnimatePresence>
				</div>
			</Wrapper>
		</MotionWrapper>
	);
};

export default Works;
