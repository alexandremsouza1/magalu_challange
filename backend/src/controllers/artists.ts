import type { FastifyReply } from "fastify";
import { getSpotifyTopArtists } from "../libs/spotify/tokens";
import type { AuthenticatedRequest } from "../types";

export const getTopArtists = async (
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

		// const { range, limit, offset } = request.query as {
		//   range?: string;
		//   limit?: number;
		//   offset?: number;
		// };

		const topArtists = await getSpotifyTopArtists(request.auth.access_token);
		return reply.status(200).send({
			success: true,
			data: topArtists,
		});
	} catch (error) {
		console.error("Error fetching artists:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to fetch artists",
		});
	}
};
