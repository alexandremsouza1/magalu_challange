import { fastify } from "../config/fastifyConfig.js";

import { getUserPlaylists } from "../controllers/playlist.js";

import { GetUserPlaylistsSchema } from "../dtos/PlaylistDto.js";
import { authenticateToken } from "../middleware/auth.js";

fastify.get(
  "/v1/user/playlists",
  { preHandler: authenticateToken, schema: GetUserPlaylistsSchema },
  getUserPlaylists,
);

