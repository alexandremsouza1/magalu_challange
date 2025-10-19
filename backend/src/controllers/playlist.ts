import type { FastifyReply } from "fastify";

import {
  getSpotifyUserPlaylists,
} from "../libs/spotify/tokens";
import type { AuthenticatedRequest } from "../types";

export const getUserPlaylists = async (
  request: AuthenticatedRequest,
  reply: FastifyReply,
) => {
  try {
    if (!request.auth) {
      return reply.status(401).send({
        success: false,
        error: "Invalid authentication data",
      });
    }

    const playlists = await getSpotifyUserPlaylists(request.auth.access_token);
    return reply.status(200).send({
      success: true,
      data: playlists,
    });
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return reply.status(500).send({
      success: false,
      error: "Failed to fetch user playlists",
    });
  }
};