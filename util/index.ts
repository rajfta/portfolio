export const getRndInteger = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

// eslint-disable-next-line no-unused-vars
export const memoize = <T>(fn: (...args: T[]) => any) => {
	const cache: Record<string, any> = {};
	return (...args: T[]) => {
		const argsCache = JSON.stringify(args);

		if (!cache[argsCache]) {
			const res = fn(...args);
			cache[argsCache] = res;
			return res;
		} else {
			return cache[argsCache];
		}
	};
};

export const onNavigate = (id: string) => {
	const element = document.getElementById(id);
	const headerOffset = id !== "skills" ? 72 : 130;
	const elementPosition = element!.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
};
