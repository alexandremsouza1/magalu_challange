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
			!("userId" in decoded) ||
			!("email" in decoded) ||
			!("name" in decoded)
		) {
			reply.status(401).send({
				error: "Token inválido",
			});
			return;
		}

		request.user = {
			userId: Number(decoded.userId),
			email: String(decoded.email),
			name: String(decoded.name),
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
