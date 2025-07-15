import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterInputs } from "@trpc/server";

export type FindOneProductByDto =
	inferRouterInputs<AppRouter>["products"]["findOneBy"];
