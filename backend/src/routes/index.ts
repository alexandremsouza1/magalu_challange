import type { FastifyReply } from "fastify";
import { fastify } from "../config/fastifyConfig.js";

// Route principale
fastify.get("/", async (_, reply: FastifyReply) => {
	reply.send({ message: "Hello World" });
});
