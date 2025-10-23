import type { ReactNode } from "react";

type TooltipProps = {
	children: ReactNode;
	show: boolean;
};

const Tooltip = ({ children, show }: TooltipProps) => {
	if (!show) {
		return null;
	}

	return (
		<div
			style={{
				clipPath:
					"polygon(0% 0%, 100% 0%, 100% 93%, 55% 93%, 50% 100%, 45% 93%, 0 93%)",
			}}
			className="absolute top-0 left-1/2 min-w-[220px] max-w-xs -translate-x-1/2 -translate-y-full items-center justify-center bg-zinc-700 p-4 pb-6 leading-normal text-white opacity-100 shadow-[0px_0px_25px_rgba(0,0,0,0.1)] 2xl:max-w-lg"
		>
			{children}
		</div>
	);
};

export default Tooltip;
