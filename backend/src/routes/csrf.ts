import { fastify } from "../config/fastifyConfig.js";
import {
	getCsrfToken,
	protectedOperation,
	validateCsrf,
} from "../controllers/csrf.js";
import {
	getCsrfTokenSchema,
	protectedOperationSchema,
	validateCsrfSchema,
} from "../dtos/CsrfDtos.js";

fastify.get("/csrf/token", { schema: getCsrfTokenSchema }, getCsrfToken);

fastify.post("/csrf/validate", { schema: validateCsrfSchema }, validateCsrf);

fastify.post(
	"/csrf/protected",
	{ schema: protectedOperationSchema },
	protectedOperation,
);
