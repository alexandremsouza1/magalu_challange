import querystring from "node:querystring";
import {
	SPOTIFY_API_URL,
	SPOTIFY_PROFILE_URL,
	SPOTIFY_TOKEN_URL,
} from "./envs";
import type {
  CreatePlaylistBody,
	SpotifyArtistAlbumsResponse,
	SpotifyProfile,
	SpotifyRefreshTokenParams,
	SpotifyTokenParams,
	SpotifyTokenResponse,
	SpotifyTopArtistsResponse,
  SpotifyUserPlaylistsResponse,
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

export async function getSpotifyTopArtists(
	accessToken: string,
): Promise<SpotifyTopArtistsResponse> {
	const url = `${SPOTIFY_PROFILE_URL}/top/artists?offset=0&limit=20`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch top artists");
	}

	return (await res.json()) as Promise<SpotifyTopArtistsResponse>;
}

export async function getSpotifyArtistAlbums(
	id: string,
	accessToken: string,
): Promise<SpotifyArtistAlbumsResponse> {
	const url = `${SPOTIFY_API_URL}/artists/${id}/albums`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch artist albums");
	}
	return (await res.json()) as Promise<SpotifyArtistAlbumsResponse>;
}

export async function getSpotifyUserPlaylists(
  accessToken: string
): Promise<SpotifyUserPlaylistsResponse> {
  const url = `${SPOTIFY_API_URL}/me/playlists`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user playlists");
  }
  return (await res.json()) as Promise<SpotifyUserPlaylistsResponse>;
}

export async function createSpotifyUserPlaylists(
  accessToken: string,
  body: CreatePlaylistBody
): Promise<SpotifyUserPlaylistsResponse> {
  const profile =  await getSpotifyProfile(accessToken);
  const url = `${SPOTIFY_API_URL}/users/${profile.id}/playlists`;
  console.log("Creating playlist with body:", url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log("Create playlist response status:", res);
  if (!res.ok) {
    throw new Error("Failed to create user playlist");
  }
  return (await res.json()) as Promise<SpotifyUserPlaylistsResponse>;
}
