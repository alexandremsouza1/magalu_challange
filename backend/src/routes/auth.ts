import { fastify } from "../config/fastifyConfig.js";

import { authSpotify, authSpotifyCallback } from "../controllers/auth.js";

import {
	AuthSpotifySchema,
	AuthSpotifyCallbackSchema,
} from "../dtos/AuthDtos.js";

fastify.get("/v1/auth/spotify", { schema: AuthSpotifySchema }, authSpotify);
fastify.get(
	"/v1/auth/spotify/callback",
	{ schema: AuthSpotifyCallbackSchema },
	authSpotifyCallback,
);
