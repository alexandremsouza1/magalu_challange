import type { FastifyReply, FastifyRequest } from "fastify";

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
	details?: string[];
}

export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationMeta;
}

export interface ApiError<T = Record<string, unknown>> {
	code: string;
	message: string;
	details?: T;
}

export interface PaginationQuery {
	page?: string;
	limit?: string;
	orderBy?: string;
	order?: "asc" | "desc";
}

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export type ControllerFunction<
	Body = unknown,
	Query = Record<string, string | undefined>,
	Params = Record<string, string>,
> = (
	request: FastifyRequest<{ Body: Body; Querystring: Query; Params: Params }>,
	reply: FastifyReply,
) => Promise<void>;

export type MiddlewareFunction = (
	request: FastifyRequest,
	reply: FastifyReply,
) => Promise<void>;

export type UtilityFunction<T, R> = (param: T) => R;
