import querystring from "node:querystring";
import { SPOTIFY_PROFILE_URL, SPOTIFY_TOKEN_URL } from "./envs";
import type {
	SpotifyProfile,
	SpotifyRefreshTokenParams,
	SpotifyTokenParams,
	SpotifyTokenResponse,
} from "./types";

export async function getSpotifyTokens({
	code,
	clientId,
	clientSecret,
	redirectUri,
}: SpotifyTokenParams): Promise<SpotifyTokenResponse> {
	// Input validation
	if (!code || !clientId || !clientSecret || !redirectUri) {
		throw new Error("Missing required parameters for Spotify token exchange");
	}

	const body = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: redirectUri,
	}).toString();

	const res = await fetch(SPOTIFY_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${clientId}:${clientSecret}`,
			).toString("base64")}`,
		},
		body,
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		console.error("Spotify token error:", errorData);
		throw new Error(
			`Failed to get access token from Spotify: ${res.status} - ${
				errorData.error_description || errorData.error || "Unknown error"
			}`,
		);
	}

	return res.json() as Promise<SpotifyTokenResponse>;
}

export async function refreshSpotifyToken({
	refreshToken,
	clientId,
	clientSecret,
}: SpotifyRefreshTokenParams): Promise<SpotifyTokenResponse> {
	const body = querystring.stringify({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
		client_id: clientId,
		client_secret: clientSecret,
	});

	const res = await fetch(SPOTIFY_TOKEN_URL, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	if (!res.ok) {
		throw new Error("Failed to refresh Spotify token");
	}

	return res.json() as Promise<SpotifyTokenResponse>;
}

export async function getSpotifyProfile(
	accessToken: string,
): Promise<SpotifyProfile> {
	const res = await fetch(SPOTIFY_PROFILE_URL, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user profile");
	}

	return (await res.json()) as Promise<SpotifyProfile>;
}
