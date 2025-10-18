import type { FastifyReply, FastifyRequest } from "fastify";
import { getSpotifyAuthUrl } from "../libs/spotify/auth.js";
import {
	getSpotifyTokens,
	getSpotifyProfile,
	refreshSpotifyToken,
} from "../libs/spotify/tokens.js";
import { RefreshTokenBody, SpotifyCallbackQuery } from "../types";

// Variáveis de ambiente
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;

// Escopos necessários para a aplicação
const SPOTIFY_SCOPES = [
	"user-read-email",
	"user-read-private",
	"user-top-read",
	"user-read-recently-played",
	"playlist-read-private",
];

export const authSpotify = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const authUrl = getSpotifyAuthUrl({
			clientId: SPOTIFY_CLIENT_ID,
			redirectUri: SPOTIFY_REDIRECT_URI,
			scope: SPOTIFY_SCOPES,
			showDialog: false,
		});

		return reply.status(200).send({
			success: true,
			data: {
				url: authUrl,
			},
		});
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

		// Busca informações do perfil do usuário
		const profile = await getSpotifyProfile(tokens.access_token);

		// Aqui você pode salvar os tokens e perfil no banco de dados
		// Exemplo: await saveUserTokens(profile.id, tokens);

		return reply.status(200).send({
			success: true,
			data: {
				profile,
				tokens: {
					accessToken: tokens.access_token,
					refreshToken: tokens.refresh_token,
					expiresIn: tokens.expires_in,
				},
			},
		});
	} catch (error) {
		console.error("Error in Spotify callback:", error);
		return reply.status(500).send({
			success: false,
			error: "Failed to complete Spotify authentication",
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
