"use client";

import {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	ReactNode,
	useState,
} from "react";
import { default as NextLink } from "next/link";

type LinkProps = DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> & {
	children: ReactNode;
	href: string;
};

const Link = ({ href, children, className = "", ...props }: LinkProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<NextLink href={href}>
			<a
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`inline-block cursor-pointer rounded-lg bg-cyan-600 px-8 py-3 text-lg font-medium text-white ${className}`}
				{...props}
			>
				<div className="flex items-center justify-center gap-4">
					{children}
					<span className={isHovered ? "animate-lean" : ""}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
							<path
								fillRule="evenodd"
								d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
				</div>
			</a>
		</NextLink>
	);
};

export default Link;
