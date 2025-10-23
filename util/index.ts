export const getRndInteger = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const memoize = <T, R>(fn: (...args: T[]) => R) => {
	const cache: Record<string, R> = {};
	return (...args: T[]): R => {
		const argsCache = JSON.stringify(args);

		if (!cache[argsCache]) {
			const res = fn(...args);
			cache[argsCache] = res;
			return res;
		}
		return cache[argsCache];
	};
};

export const onNavigate = (id: string) => {
	const element = document.getElementById(id);
	const headerOffset = id !== "skills" ? 72 : 130;
	const elementPosition = element?.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
};
