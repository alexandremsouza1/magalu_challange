import { fastify } from "../config/fastifyConfig.js";

import { authSpotify, authSpotifyCallback, getUserProfile } from "../controllers/auth.js";

import {
	AuthSpotifyCallbackSchema,
	AuthSpotifySchema,
	UserProfileSchema,
} from "../dtos/AuthDtos.js";

fastify.get("/v1/auth/spotify", { schema: AuthSpotifySchema }, authSpotify);
fastify.get(
	"/v1/auth/spotify/callback",
	{ schema: AuthSpotifyCallbackSchema },
	authSpotifyCallback,
);

fastify.get("/v1/user/profile", { schema: UserProfileSchema }, getUserProfile);
