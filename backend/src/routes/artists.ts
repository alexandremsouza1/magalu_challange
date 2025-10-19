import { fastify } from "../config/fastifyConfig.js";

import { getTopArtists } from "../controllers/artists.js";

import { GetUserPlaylistsSchema } from "../dtos/ArtistsDtos.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get(
	"/v1/artists",
	{ preHandler: authenticateToken, schema: GetUserPlaylistsSchema },
	getTopArtists,
);
