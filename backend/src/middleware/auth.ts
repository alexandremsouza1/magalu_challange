import type { FastifyReply } from "fastify";
import type { AuthenticatedRequest } from "../types/index.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticateToken = async (
	request: AuthenticatedRequest,
	reply: FastifyReply,
): Promise<void> => {
	try {
		const token = request.headers.authorization?.split(" ")[1]; // Bearer TOKEN

		if (!token) {
			reply.status(401).send({
				error: "Token de acesso é obrigatório",
			});
			return;
		}

		const decoded = verifyToken(token);

		if (
			typeof decoded !== "object" ||
			!("access_token" in decoded) ||
			!("expires_in" in decoded)
		) {
			reply.status(401).send({
				error: "Token inválido",
			});
			return;
		}

		request.auth = {
			access_token: decoded.access_token,
			expires_in: decoded.expires_in,
		};
	} catch (error) {
		const err = error as Error & { name?: string };

		const message =
			err.name === "TokenExpiredError"
				? "Token expirado"
				: err.name === "JsonWebTokenError"
					? "Token inválido"
					: "Erro ao validar token";

		reply.status(401).send({ error: message });
	}
};
