import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

export type ClientSummary =
	inferRouterOutputs<AppRouter>["clients"]["findMany"]["items"][number];
export type ClientDetail =
	inferRouterOutputs<AppRouter>["clients"]["findOneBy"];
export type TicketSummary =
	inferRouterOutputs<AppRouter>["tickets"]["findManyByClient"][number];
export type PaymentSummary =
	inferRouterOutputs<AppRouter>["payments"]["findManyByClient"]["items"][number];
