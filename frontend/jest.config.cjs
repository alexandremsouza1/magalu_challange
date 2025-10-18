const dotenv = require("dotenv");
dotenv.config();

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

	// Mapeia assets e CSS
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|svg|webp|avif)$": "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|scss|sass)$": "identity-obj-proxy",
	},

	// Ignora transformações de pacotes externos
	transformIgnorePatterns: ["node_modules/(?!(@mui|@reduxjs|react-redux)/)"],
};
