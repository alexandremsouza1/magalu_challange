import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;