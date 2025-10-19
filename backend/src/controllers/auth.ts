import type { FastifyReply, FastifyRequest } from "fastify";
import { getSpotifyAuthUrl } from "../libs/spotify/auth.js";
import {
	getSpotifyProfile,
	getSpotifyTokens,
	refreshSpotifyToken,
} from "../libs/spotify/tokens.js";
import type {
	AuthenticatedRequest,
	RefreshTokenBody,
	SpotifyCallbackQuery,
} from "../types";
import { getEnvVariable } from "../utils/autoLoad.js";
import { createToken } from "../utils/jwt.js";

// Variáveis de ambiente
const SPOTIFY_CLIENT_ID = getEnvVariable("SPOTIFY_CLIENT_ID");
const SPOTIFY_CLIENT_SECRET = getEnvVariable("SPOTIFY_CLIENT_SECRET");
const SPOTIFY_REDIRECT_URI = getEnvVariable("SPOTIFY_REDIRECT_URI");
const FRONTEND_URL = getEnvVariable("FRONTEND_URL");

const SPOTIFY_SCOPES = [
	"user-read-email",
	"user-read-private",
	"user-top-read",
	"user-read-recently-played",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

export const authSpotify = async (
	_request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const authUrl = getSpotifyAuthUrl({
			clientId: SPOTIFY_CLIENT_ID,
			redirectUri: SPOTIFY_REDIRECT_URI,
			scope: SPOTIFY_SCOPES,
			showDialog: false,
		});
		return reply.redirect(authUrl);
	} catch (error) {
		console.error("Error generating Spotify auth URL:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to generate authentication URL",
		});
	}
};

export const authSpotifyCallback = async (
	request: FastifyRequest<{ Querystring: SpotifyCallbackQuery }>,
	reply: FastifyReply,
) => {
	try {
		const { code, error } = request.query;

		// Verifica se houve erro na autorização
		if (error) {
			return reply.status(400).send({
				success: false,
				error: `Spotify authorization error: ${error}`,
			});
		}

		// Verifica se o código foi fornecido
		if (!code) {
			return reply.status(400).send({
				success: false,
				error: "Authorization code not provided",
			});
		}

		// Troca o código por tokens
		const tokens = await getSpotifyTokens({
			code,
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			redirectUri: SPOTIFY_REDIRECT_URI,
		});

		const jwt = createToken(tokens);
		return reply.redirect(`${FRONTEND_URL}/authCallback?token=${jwt}`);
	} catch (error) {
		console.error("Error in Spotify callback:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to complete Spotify authentication",
		});
	}
};

export const getUserProfile = async (
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

		const profile = await getSpotifyProfile(request.auth.access_token);
		return reply.status(200).send({
			success: true,
			data: profile,
		});
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to fetch user profile",
		});
	}
};

export const refreshSpotifyTokenController = async (
	request: FastifyRequest<{ Body: RefreshTokenBody }>,
	reply: FastifyReply,
) => {
	try {
		const { refreshToken } = request.body;

		if (!refreshToken) {
			return reply.status(400).send({
				success: false,
				error: "Refresh token not provided",
			});
		}

		const tokens = await refreshSpotifyToken({
			refreshToken,
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
		});

		return reply.status(200).send({
			success: true,
			data: {
				accessToken: tokens.access_token,
				expiresIn: tokens.expires_in,
			},
		});
	} catch (error) {
		console.error("Error refreshing Spotify token:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to refresh access token",
		});
	}
};
