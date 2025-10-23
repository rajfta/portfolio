import type { ReactNode } from "react";
import { Header } from ".";

type LayoutProps = {
	children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
