import { fastify } from "../config/fastifyConfig.js";

import { getAlbumsArtist, getTopArtists } from "../controllers/artists.js";

import {
	GetUserArtistAlbumsSchema,
	GetUserArtistsSchema,
} from "../dtos/ArtistsDtos.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get(
	"/v1/artists",
	{ preHandler: authenticateToken, schema: GetUserArtistsSchema },
	getTopArtists,
);

fastify.get(
	"/v1/artists/:id/albums",
	{ preHandler: authenticateToken, schema: GetUserArtistAlbumsSchema },
	getAlbumsArtist,
);
