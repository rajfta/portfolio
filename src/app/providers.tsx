"use client";

import type { ReactNode } from "react";
import {
	Layout,
	Overlay,
	OverlayContext,
	useOverlayImplementation,
} from "../../components";

export function Providers({ children }: { children: ReactNode }) {
	const { dismiss, display, isOpen } = useOverlayImplementation();

	return (
		<OverlayContext.Provider value={{ dismiss, display, isOpen }}>
			<Layout>
				{children}
				<Overlay />
			</Layout>
		</OverlayContext.Provider>
	);
}
