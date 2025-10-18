module.exports = {
	persistReducer: (_, reducers) => reducers,
	persistStore: () => ({
		purge: jest.fn(),
		flush: jest.fn(),
		pause: jest.fn(),
		persist: jest.fn(),
	}),
};
