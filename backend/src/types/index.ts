// Export de tous les types et interfaces
export * from "./auth";
export * from "./common";
export * from "./config";
export * from "./csrf";
export * from "./jwt";

// Type Category temporaire
export type Category = {
	id: number;
	name: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
};
