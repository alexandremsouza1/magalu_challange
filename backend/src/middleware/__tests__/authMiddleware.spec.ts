import type { FastifyReply } from "fastify";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import type { AuthenticatedRequest } from "../../types";
import { verifyToken } from "../../utils/jwt.js";
import { authenticateToken } from "../auth.js";

vi.mock("../../utils/jwt", () => ({
	verifyToken: vi.fn(),
}));

describe("authenticateToken middleware", () => {
	let reply: FastifyReply;
	let request: AuthenticatedRequest;
	const mockVerifyToken = verifyToken as unknown as Mock;

	beforeEach(() => {
		vi.clearAllMocks();

		reply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as FastifyReply;

		request = {
			headers: {},
		} as AuthenticatedRequest;
	});

	it("should return 401 if token is missing", async () => {
		await authenticateToken(request, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({
			error: "Token de acesso é obrigatório",
		});
	});

	it("should return 401 if token is invalid (wrong structure)", async () => {
		request.headers.authorization = "Bearer invalidToken";
		mockVerifyToken.mockReturnValue({});

		await authenticateToken(request, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({ error: "Token inválido" });
	});

	it("should attach auth data if token is valid", async () => {
		const request: AuthenticatedRequest = {
			headers: { authorization: "Bearer validToken" },
		} as AuthenticatedRequest;

		mockVerifyToken.mockReturnValue({
			access_token: "spotify_token",
			expires_in: 3600,
		});

		await authenticateToken(request as AuthenticatedRequest, reply);

		expect(request.auth).toEqual({
			access_token: "spotify_token",
			expires_in: 3600,
		});
		expect(reply.status).not.toHaveBeenCalled();
	});

	it("should return 401 if token is expired", async () => {
		request.headers.authorization = "Bearer expiredToken";
		const error = new Error("Expired");
		(error as unknown as { name: string }).name = "TokenExpiredError";
		mockVerifyToken.mockImplementation(() => {
			throw error;
		});

		await authenticateToken(request, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({ error: "Token expirado" });
	});

	it("should return 401 if token is invalid (JsonWebTokenError)", async () => {
		request.headers.authorization = "Bearer badToken";
		const error = new Error("Invalid");
		(error as unknown as { name: string }).name = "JsonWebTokenError";
		mockVerifyToken.mockImplementation(() => {
			throw error;
		});

		await authenticateToken(request, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({ error: "Token inválido" });
	});

	it("should return 401 with generic error message on unexpected error", async () => {
		request.headers.authorization = "Bearer something";
		mockVerifyToken.mockImplementation(() => {
			throw new Error("Unknown");
		});

		await authenticateToken(request, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({
			error: "Erro ao validar token",
		});
	});
});
