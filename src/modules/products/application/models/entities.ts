import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

export type ProductSummary =
	inferRouterOutputs<AppRouter>["products"]["findMany"]["items"][number];
