import type { FastifyReply, FastifyRequest } from "fastify";

// Interfaces pour les requêtes d'authentification
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

// Interfaces pour les réponses d'authentification
export interface AuthResponse {
	message: string;
	token?: string;
	refreshToken?: string;
	user?: {
		id: number;
		email: string;
		name: string;
	};
}

export interface ErrorResponse {
	error: string;
	details?: string[];
}

/**
 * Refresh do token de acesso
 */
export interface RefreshTokenBody {
  refreshToken: string;
}

export interface SpotifyCallbackQuery {
  code?: string;
  error?: string;
}



// Controllers tradicionais
export type LoginController = (
	request: FastifyRequest<{ Body: LoginRequest }>,
	reply: FastifyReply,
) => Promise<void>;

export type RegisterController = (
	request: FastifyRequest<{ Body: RegisterRequest }>,
	reply: FastifyReply,
) => Promise<void>;

export type LogoutController = (
	request: FastifyRequest,
	reply: FastifyReply,
) => Promise<{ message: string }>;

export type RefreshTokenController = (
	request: FastifyRequest<{ Body: RefreshTokenRequest }>,
	reply: FastifyReply,
) => Promise<void>;

export type MeController = (
	request: AuthenticatedRequest,
	reply: FastifyReply,
) => Promise<void>;

// Interface pour les requêtes authentifiées
export interface AuthenticatedRequest extends FastifyRequest {
	user?: {
		userId: number;
		email: string;
		name: string;
	};
}

// ============================================
// SPOTIFY AUTH TYPES
// ============================================

// Interfaces para requisições Spotify
export interface SpotifyCallbackQuery {
	code?: string;
	error?: string;
}

export interface SpotifyRefreshTokenRequest {
	refreshToken: string;
}

// Interfaces para respostas Spotify
export interface SpotifyAuthResponse {
	success: boolean;
	data?: {
		url: string;
	};
	error?: string;
}

export interface SpotifyCallbackResponse {
	success: boolean;
	data?: {
		profile: {
			provider: string;
			id: string;
			username: string;
			displayName: string;
			email: string;
			profileUrl: string;
			photos: string[];
			country: string;
			followers: number;
			product: string;
		};
		tokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	};
	error?: string;
}

export interface SpotifyRefreshTokenResponse {
	success: boolean;
	data?: {
		accessToken: string;
		expiresIn: number;
	};
	error?: string;
}

// Tipos dos controllers Spotify
export type AuthSpotifyController = (
	request: FastifyRequest,
	reply: FastifyReply
) => Promise<void>;

export type AuthSpotifyCallbackController = (
	request: FastifyRequest<{ Querystring: SpotifyCallbackQuery }>,
	reply: FastifyReply
) => Promise<void>;

export type RefreshSpotifyTokenController = (
	request: FastifyRequest<{ Body: SpotifyRefreshTokenRequest }>,
	reply: FastifyReply
) => Promise<void>;