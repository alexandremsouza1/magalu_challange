export const GetUserPlaylistsSchema = {
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
			limit: {
				type: "integer",
				minimum: 1,
				maximum: 50,
				default: 20,
				description: "Maximum number of playlists to return",
			},
			offset: {
				type: "integer",
				minimum: 0,
				default: 0,
				description: "The index of the first playlist to return",
			},
		},
	},

	response: {
		200: {
			type: "object",
			required: ["success", "data"],
			properties: {
				success: { type: "boolean" },
				data: {
					type: "object",
					required: ["href", "limit", "offset", "total", "items"],
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
								required: [
									"collaborative",
									"description",
									"external_urls",
									"href",
									"id",
									"images",
									"name",
									"owner",
									"public",
									"snapshot_id",
									"tracks",
									"type",
									"uri",
								],
								properties: {
									collaborative: { type: "boolean" },
									description: { type: "string" },
									external_urls: {
										type: "object",
										required: ["spotify"],
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
											required: ["url"],
											properties: {
												height: { type: ["integer", "null"] },
												url: { type: "string" },
												width: { type: ["integer", "null"] },
											},
										},
									},
									name: { type: "string" },
									owner: {
										type: "object",
										required: [
											"display_name",
											"external_urls",
											"href",
											"id",
											"type",
											"uri",
										],
										properties: {
											display_name: { type: "string" },
											external_urls: {
												type: "object",
												required: ["spotify"],
												properties: {
													spotify: { type: "string" },
												},
											},
											href: { type: "string" },
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
										required: ["href", "total"],
										properties: {
											href: { type: "string" },
											total: { type: "integer" },
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
			required: ["success", "error"],
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
		500: {
			type: "object",
			required: ["success", "error"],
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
	},
};

export const PostPlaylistSchema = {
	headers: {
		type: "object",
		required: ["authorization"],
		properties: {
			authorization: { type: "string", description: "Bearer token" },
		},
	},

	body: {
		type: "object",
		required: ["name"],
		properties: {
			name: { type: "string", description: "Nome da playlist" },
		},
	},

	response: {
		200: {
			type: "object",
			// Tornamos todas as propriedades opcionais, para aceitar qualquer resposta
			properties: {
				collaborative: { type: ["boolean", "null"] },
				description: { type: ["string", "null"] },
				external_urls: {
					type: "object",
					properties: {
						spotify: { type: "string" },
					},
				},
				followers: {
					type: "object",
					properties: {
						href: { type: ["string", "null"] },
						total: { type: "integer" },
					},
				},
				href: { type: "string" },
				id: { type: "string" },
				images: {
					type: "array",
					items: { type: "object" },
				},
				name: { type: "string" },
				owner: {
					type: "object",
					properties: {
						href: { type: "string" },
						id: { type: "string" },
						type: { type: "string" },
						uri: { type: "string" },
						display_name: { type: ["string", "null"] },
						external_urls: {
							type: "object",
							properties: { spotify: { type: "string" } },
						},
					},
				},
				public: { type: ["boolean", "null"] },
				snapshot_id: { type: "string" },
				tracks: { type: "object" },
				type: { type: "string" },
				uri: { type: "string" },
			},
		},
		401: {
			type: "object",
			required: ["success", "error"],
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
		500: {
			type: "object",
			required: ["success", "error"],
			properties: {
				success: { type: "boolean" },
				error: { type: "string" },
			},
		},
	},
};
