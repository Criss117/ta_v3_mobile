import type { products } from "@/integrations/db/tables";

export type ProductSummary = typeof products.$inferSelect & {
	category: {
		id: number;
		name: string;
	} | null;
};
