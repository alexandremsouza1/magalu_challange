import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fastify, fastifyConfig } from "./config/fastifyConfig.js";
import { registerPlugins } from "./config/plugins.js";
import { registerSwagger } from "./config/swagger.js";
import { autoLoadRoutes } from "./utils/autoLoad.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startServer = async (): Promise<void> => {
	try {
		// Enregistrer les plugins (CORS, etc.)
		await registerPlugins(fastify);

		// Enregistrer Swagger/OpenAPI
		await registerSwagger(fastify);

		// Auto-load des routes
		const routesDir = join(__dirname, "routes");
		const count = await autoLoadRoutes(routesDir);
		fastify.log.info(`🚀 ${count} routes loaded`);
		fastify.log.info(
			`📚 Documentation disponible sur http://localhost:${fastifyConfig.port}/documentation`,
		);

		fastify.listen(fastifyConfig, (err: Error | null) => {
			if (err) {
				fastify.log.error(err);
				process.exit(1);
			}
		});
	} catch (error) {
		fastify.log.error({
			message: "Failed to start server",
			errorName: error instanceof Error ? error.name : "UnknownError",
			errorMessage: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
		});
		process.exit(1);
	}
};
