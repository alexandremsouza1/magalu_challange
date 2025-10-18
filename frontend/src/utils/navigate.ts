let navigateFunction:
	| ((to: string, options?: { replace?: boolean }) => void)
	| null = null;

export const setNavigate = (navigate: typeof navigateFunction) => {
	navigateFunction = navigate;
};

export const goTo = (path: string, options?: { replace?: boolean }) => {
	if (navigateFunction) {
		navigateFunction(path, options);
	} else {
		console.error("Navigation has not yet been initialized.");
	}
};
