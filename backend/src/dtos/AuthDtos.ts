/**
 * Schema to initiate Spotify authentication
 * GET /auth/spotify
 */
export const AuthSpotifySchema = {
	response: {
		200: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				data: {
					type: "object",
					properties: {
						url: { type: "string", format: "uri" },
					},
				},
			},
		},
		500: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
	},
};

/**
 * Schema for Spotify callback
 * GET /auth/spotify/callback
 */
export const AuthSpotifyCallbackSchema = {
	querystring: {
		type: "object",
		properties: {
			code: { type: "string" },
			error: { type: "string" },
		},
	},
	response: {
		200: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				data: {
					type: "object",
					properties: {
						profile: {
							type: "object",
							properties: {
								provider: { type: "string" },
								id: { type: "string" },
								username: { type: "string" },
								displayName: { type: "string" },
								email: { type: "string", format: "email" },
								profileUrl: { type: "string", format: "uri" },
								photos: {
									type: "array",
									items: { type: "string", format: "uri" },
								},
								country: { type: "string" },
								followers: { type: "number" },
								product: { type: "string" },
							},
						},
						tokens: {
							type: "object",
							properties: {
								accessToken: { type: "string" },
								refreshToken: { type: "string" },
								expiresIn: { type: "number" },
							},
						},
					},
				},
			},
		},
		400: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
		500: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
	},
};

/**
 * Schema for refreshing Spotify token
 * POST /auth/spotify/refresh
 */
export const RefreshSpotifyTokenSchema = {
	body: {
		type: "object",
		required: ["refreshToken"],
		properties: {
			refreshToken: {
				type: "string",
			},
		},
	},
	response: {
		200: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				data: {
					type: "object",
					properties: {
						accessToken: { type: "string" },
						expiresIn: { type: "number" },
					},
				},
			},
		},
		400: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
		500: {
			type: "object",
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
	},
};
