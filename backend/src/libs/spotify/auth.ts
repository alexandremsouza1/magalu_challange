import querystring from "node:querystring";
import { SPOTIFY_AUTH_URL } from "./envs";
import type { SpotifyAuthUrlParams } from "./types";

export function getSpotifyAuthUrl({
	clientId,
	redirectUri,
	scope = [],
	showDialog = false,
}: SpotifyAuthUrlParams): string {
	const params = querystring.stringify({
		response_type: "code",
		client_id: clientId,
		redirect_uri: redirectUri,
		scope: scope.join(" "),
		show_dialog: showDialog,
	});

	return `${SPOTIFY_AUTH_URL}?${params}`;
}
