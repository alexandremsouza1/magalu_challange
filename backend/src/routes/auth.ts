import { fastify } from "../config/fastifyConfig.js";

import {
	authSpotify,
	authSpotifyCallback,
	getUserProfile,
} from "../controllers/auth.js";

import {
	AuthSpotifyCallbackSchema,
	AuthSpotifySchema,
	UserProfileSchema,
} from "../dtos/AuthDtos.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get("/v1/auth/spotify", { schema: AuthSpotifySchema }, authSpotify);
fastify.get(
	"/v1/auth/spotify/callback",
	{ schema: AuthSpotifyCallbackSchema },
	authSpotifyCallback,
);

fastify.get(
	"/v1/user/profile",
	{ preHandler: authenticateToken, schema: UserProfileSchema },
	getUserProfile,
);
