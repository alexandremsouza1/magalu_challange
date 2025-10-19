import type { CorsConfig } from "../types/index.js";

const developmentCorsConfig: CorsConfig = {
	origin: [
		"http://localhost:5173",
		"http://localhost:4000",
		"http://127.0.0.1:5173",
		"http://127.0.0.1:4000",
	],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"Authorization",
		"Cache-Control",
		"Pragma",
		"Authorization",
		"X-CSRF-Token",
		"X-CSRFToken",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

const productionCorsConfig: CorsConfig = {
	origin: process.env.CORS_ORIGIN?.split(",") || [
		"https://yourdomain.com",
		"https://www.yourdomain.com",
	],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"Authorization",
		"Cache-Control",
		"Pragma",
		"Authorization",
		"X-CSRF-Token",
		"X-CSRFToken",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

const testCorsConfig: CorsConfig = {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"Authorization",
		"Cache-Control",
		"Pragma",
		"Authorization",
		"X-CSRF-Token",
		"X-CSRFToken",
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

export const getCorsConfig = (): CorsConfig => {
	const nodeEnv = process.env.NODE_ENV || "development";

	switch (nodeEnv) {
		case "production":
			return productionCorsConfig;
		case "test":
			return testCorsConfig;
		default:
			return developmentCorsConfig;
	}
};

export const corsConfig = getCorsConfig();
