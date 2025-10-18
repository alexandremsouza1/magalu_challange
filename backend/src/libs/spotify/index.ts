import querystring from "querystring";
import { SpotifyAuthUrlParams, SpotifyProfile, SpotifyRawProfile, SpotifyRefreshTokenParams, SpotifyTokenParams, SpotifyTokenResponse } from "./types";
import { SPOTIFY_AUTH_URL, SPOTIFY_PROFILE_URL, SPOTIFY_TOKEN_URL } from "./envs";


export function getSpotifyAuthUrl({
  clientId,
  redirectUri,
  scope = [],
  showDialog = false
}: SpotifyAuthUrlParams): string {
  const params = querystring.stringify({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope.join(" "),
    show_dialog: showDialog
  });

  return `${SPOTIFY_AUTH_URL}?${params}`;
}

export async function getSpotifyTokens({
  code,
  clientId,
  clientSecret,
  redirectUri
}: SpotifyTokenParams): Promise<SpotifyTokenResponse> {
  const body = querystring.stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!res.ok) {
    throw new Error("Failed to get access token from Spotify");
  }

  return res.json() as Promise<SpotifyTokenResponse>;
}

export async function refreshSpotifyToken({
  refreshToken,
  clientId,
  clientSecret
}: SpotifyRefreshTokenParams): Promise<SpotifyTokenResponse> {
  const body = querystring.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!res.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  return res.json() as Promise<SpotifyTokenResponse>;
}

export async function getSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const res = await fetch(SPOTIFY_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const json = await res.json() as SpotifyRawProfile;

  return {
    provider: "spotify",
    id: json.id,
    username: json.id,
    displayName: json.display_name,
    email: json.email,
    profileUrl: json.external_urls?.spotify,
    photos: json.images?.map((i) => i.url) ?? [],
    country: json.country,
    followers: json.followers?.total,
    product: json.product,
    raw: json
  };
}