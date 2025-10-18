import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "node:util";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

jest.mock("./src/config/env", () => ({
	API_URL: "http://localhost:9595",
}));

jest.mock("redux-persist", () => ({
	persistReducer: (_: unknown, reducers: unknown) => reducers,
	persistStore: () => ({
		purge: jest.fn(),
		flush: jest.fn(),
		pause: jest.fn(),
		persist: jest.fn(),
	}),
}));

// Mock do localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};

global.localStorage = localStorageMock as unknown as Storage;
