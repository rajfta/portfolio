import type { Metadata } from "next";
import { Providers } from "./providers";
import "../../styles/globals.css";

export const metadata: Metadata = {
	title: "Rajfta Portfolio Website",
	description: "Portfolio website showcasing projects and skills",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
