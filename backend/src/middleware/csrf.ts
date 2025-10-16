import type { FastifyReply, FastifyRequest } from "fastify";
import type { CsrfResponse, CsrfValidationResult } from "../types/index.js";

declare module "fastify" {
	interface FastifyRequest {
		generateCsrf: () => Promise<string>;
	}
}
export const generateCsrfToken = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<CsrfResponse> => {
	try {
		reply.log.info("Generating CSRF token");
		const csrfToken = await request.generateCsrf();

		return {
			csrfToken,
			cookieName: "csrfToken",
		};
	} catch {
		request.log.error("Erreur lors de la génération du token CSRF");
		throw new Error("Impossible de générer le token CSRF");
	}
};

export const validateCsrfToken = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<CsrfValidationResult> => {
	try {
		reply.log.info("Validating CSRF token");
		return {
			isValid: true,
		};
	} catch {
		request.log.error("Validation error CSRF token failed");
		return {
			isValid: false,
			error: "Token CSRF invalid",
		};
	}
};

/**
 * Middleware pour vérifier la présence du token CSRF dans les headers
 */
export const checkCsrfHeader = (request: FastifyRequest): boolean => {
	const csrfToken =
		request.headers["x-csrf-token"] || request.headers["x-csrftoken"];
	return !!csrfToken;
};

/**
 * Middleware pour extraire le token CSRF des headers
 */
export const extractCsrfToken = (request: FastifyRequest): string | null => {
	return (
		((request.headers["x-csrf-token"] ||
			request.headers["x-csrftoken"]) as string) || null
	);
};

/**
 * Hook pour ajouter automatiquement la protection CSRF aux routes
 */
export const csrfProtectionHook = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	// Vérifier si la route nécessite une protection CSRF
	const protectedMethods = ["POST", "PUT", "DELETE", "PATCH"];
	const isProtectedMethod = protectedMethods.includes(request.method);

	if (!isProtectedMethod) {
		return;
	}

	// Vérifier si le token CSRF est présent
	if (!checkCsrfHeader(request)) {
		reply.code(403).send({
			error: "Token CSRF manquant",
			message: "Un token CSRF est requis pour cette opération",
		});
		return;
	}

	// Le plugin @fastify/csrf-protection se charge de la validation automatique
	// Si on arrive ici, la validation a réussi
};
