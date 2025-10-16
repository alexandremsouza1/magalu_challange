import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.js";
import type { RefreshTokenPayload, TokenPayload } from "../types/index.js";

export const createToken = (payload: TokenPayload): string => {
	// @ts-expect-error - JWT types issue
	return jwt.sign(payload, JWT_CONFIG.secret, {
		expiresIn: JWT_CONFIG.expiresIn,
	});
};

export const createRefreshToken = (payload: RefreshTokenPayload): string => {
	// @ts-expect-error - JWT types issue
	return jwt.sign(payload, JWT_CONFIG.secret, {
		expiresIn: JWT_CONFIG.refreshExpiresIn,
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_CONFIG.secret);
};
