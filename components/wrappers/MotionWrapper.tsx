"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type MotionWrapperProps = {
	children: ReactNode;
	classNames?: HTMLAttributes<HTMLDivElement>;
};

const MotionWrapper = ({ children, classNames }: MotionWrapperProps) => {
	return (
		<motion.div
			whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
			transition={{ duration: 0.5 }}
			className={`flex items-center justify-center ${classNames}`}
		>
			{children}
		</motion.div>
	);
};

export default MotionWrapper;
