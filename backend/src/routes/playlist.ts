import { fastify } from "../config/fastifyConfig.js";

import { createPlaylist, getUserPlaylists } from "../controllers/playlist.js";

import {
	GetUserPlaylistsSchema,
	PostPlaylistSchema,
} from "../dtos/PlaylistDto.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get(
	"/v1/user/playlists",
	{ preHandler: authenticateToken, schema: GetUserPlaylistsSchema },
	getUserPlaylists,
);

fastify.post(
	"/v1/user/playlists",
	{ preHandler: authenticateToken, schema: PostPlaylistSchema },
	createPlaylist,
);
