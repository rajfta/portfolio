"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

type OverlayContextType = {
	dismiss: () => void;
	display: () => void;
	isOpen: boolean;
};

export const OverlayContext = createContext<OverlayContextType>({
	dismiss: () => {},
	display: () => {},
	isOpen: false,
});

export const useOverlay = () => {
	const { isOpen, dismiss, display } = useContext(OverlayContext);
	return { isOpen, dismiss, display };
};

const disableScroll = () => {
	const bodyStyle = document.querySelector("body")?.style;
	if (bodyStyle) {
		bodyStyle.height = "100%";
		bodyStyle.overflow = "hidden";
	}
};

const enableScroll = () => {
	const bodyStyle = document.querySelector("body")?.style;
	if (bodyStyle) {
		bodyStyle.height = "auto";
		bodyStyle.overflow = "visible";
	}
};

export const useOverlayImplementation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dismiss = () => {
		setIsOpen(false);
	};
	const display = () => {
		setIsOpen(true);
	};

	return { isOpen, dismiss, display };
};

const Overlay = () => {
	const { dismiss, isOpen } = useOverlay();

	useEffect(() => {
		if (isOpen) {
			disableScroll();
			return;
		}
		enableScroll();

		return () => {
			enableScroll();
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					animate={{ opacity: 0.8 }}
					transition={{ duration: 0.85, ease: "easeOut" }}
					onClick={dismiss}
					className="fixed top-0 left-0 bottom-0 right-0 z-30 h-full w-full bg-black opacity-80"
				></motion.div>
			)}
		</AnimatePresence>
	);
};

export default Overlay;
