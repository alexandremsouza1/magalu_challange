import { SPOTIFY_AUTH_URL } from "./envs";
import { SpotifyAuthUrlParams } from "./types";
import querystring from "querystring";

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
