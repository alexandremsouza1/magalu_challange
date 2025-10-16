export interface TokenPayload {
	userId: number;
	email: string;
	name: string;
}

export interface RefreshTokenPayload {
	userId: number;
	type: "refresh";
}

export interface JwtConfig {
	secret: string;
	expiresIn: string;
	refreshExpiresIn: string;
}

export type CreateTokenFunction = (payload: TokenPayload) => string;
export type CreateRefreshTokenFunction = (
	payload: RefreshTokenPayload,
) => string;
export type VerifyTokenFunction = (token: string) => TokenPayload | null;
