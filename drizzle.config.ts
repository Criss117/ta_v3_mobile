import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	driver: "expo",
	schema: ["./src/integrations/db/tables.ts"],
	out: "./drizzle",
});
