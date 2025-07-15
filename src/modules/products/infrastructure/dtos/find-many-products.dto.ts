import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterInputs } from "@trpc/server";

export type FindManyProductsDto =
	inferRouterInputs<AppRouter>["products"]["findMany"];
