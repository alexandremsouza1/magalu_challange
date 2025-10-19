/**
 * Schema for getting user playlists
 * GET /v1/artists
 */
export const GetUserArtistsSchema = {
	headers: {
		type: "object",
		required: ["authorization"],
		properties: {
			authorization: {
				type: "string",
				description: "Bearer token",
			},
		},
	},

	querystring: {
		type: "object",
		properties: {
			range: {
				type: "string",
				enum: ["short_term", "medium_term", "long_term"],
				description: "Time range for the data (default: medium_term)",
				default: "medium_term",
			},
			limit: {
				type: "integer",
				minimum: 1,
				maximum: 50,
				description: "Number of items to return (default: 20, max: 50)",
				default: 20,
			},
			offset: {
				type: "integer",
				minimum: 0,
				description: "The index of the first item to return (default: 0)",
				default: 0,
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
						href: { type: "string", format: "uri" },
						limit: { type: "number" },
						next: { type: ["string", "null"], format: "uri" },
						offset: { type: "number" },
						previous: { type: ["string", "null"], format: "uri" },
						total: { type: "number" },
						items: {
							type: "array",
							items: {
								type: "object",
								properties: {
									collaborative: { type: "boolean" },
									description: { type: "string" },
									external_urls: {
										type: "object",
										properties: {
											spotify: { type: "string", format: "uri" },
										},
									},
									href: { type: "string", format: "uri" },
									id: { type: "string" },
									images: {
										type: "array",
										items: {
											type: "object",
											properties: {
												height: { type: ["number", "null"] },
												url: { type: "string", format: "uri" },
												width: { type: ["number", "null"] },
											},
										},
									},
									name: { type: "string" },
									owner: {
										type: "object",
										properties: {
											display_name: { type: "string" },
											external_urls: {
												type: "object",
												properties: {
													spotify: { type: "string", format: "uri" },
												},
											},
											href: { type: "string", format: "uri" },
											id: { type: "string" },
											type: { type: "string" },
											uri: { type: "string" },
										},
									},
									primary_color: { type: ["string", "null"] },
									public: { type: "boolean" },
									snapshot_id: { type: "string" },
									tracks: {
										type: "object",
										properties: {
											href: { type: "string", format: "uri" },
											total: { type: "number" },
										},
									},
									type: { type: "string" },
									uri: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		401: {
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
 * Schema for getting a user's artist's albums
 * GET /v1/artists/:id/albums
 */
export const GetUserArtistAlbumsSchema = {
	headers: {
		type: "object",
		required: ["authorization"],
		properties: {
			authorization: {
				type: "string",
				description: "Bearer token",
			},
		},
	},

	params: {
		type: "object",
		required: ["id"],
		properties: {
			id: {
				type: "string",
				description: "The Spotify ID of the artist",
			},
		},
	},

	querystring: {
		type: "object",
		properties: {
			limit: {
				type: "integer",
				minimum: 1,
				maximum: 50,
				default: 20,
				description: "Maximum number of albums to return",
			},
			offset: {
				type: "integer",
				minimum: 0,
				default: 0,
				description: "The index of the first album to return",
			},
			include_groups: {
				type: "string",
				description:
					"Comma-separated list of keywords (album, single, appears_on, compilation)",
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
						href: { type: "string" },
						limit: { type: "integer" },
						next: { type: ["string", "null"] },
						offset: { type: "integer" },
						previous: { type: ["string", "null"] },
						total: { type: "integer" },
						items: {
							type: "array",
							items: {
								type: "object",
								properties: {
									album_type: { type: "string" },
									total_tracks: { type: "integer" },
									available_markets: {
										type: "array",
										items: { type: "string" },
									},
									external_urls: {
										type: "object",
										properties: {
											spotify: { type: "string" },
										},
									},
									href: { type: "string" },
									id: { type: "string" },
									images: {
										type: "array",
										items: {
											type: "object",
											properties: {
												url: { type: "string" },
												height: { type: "integer" },
												width: { type: "integer" },
											},
										},
									},
									name: { type: "string" },
									release_date: { type: "string" },
									release_date_precision: { type: "string" },
									type: { type: "string" },
									uri: { type: "string" },
									artists: {
										type: "array",
										items: {
											type: "object",
											properties: {
												external_urls: {
													type: "object",
													properties: {
														spotify: { type: "string" },
													},
												},
												href: { type: "string" },
												id: { type: "string" },
												name: { type: "string" },
												type: { type: "string" },
												uri: { type: "string" },
											},
										},
									},
									album_group: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		401: {
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
