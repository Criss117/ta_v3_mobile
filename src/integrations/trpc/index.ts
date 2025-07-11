import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "./index.d.mts";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>();
