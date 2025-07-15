import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditMetadata } from "./shared";

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description", {
		length: 255,
	}),
	...auditMetadata,
});

export const products = sqliteTable(
	"products",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		barcode: text("barcode", {
			length: 255,
		}).unique(),
		description: text("description", {
			length: 255,
		}).notNull(),
		costPrice: integer("cost_price").notNull(),
		salePrice: integer("sale_price").notNull(),
		wholesalePrice: integer("wholesale_price").notNull(),
		stock: integer("stock").notNull(),
		minStock: integer("min_stock").notNull(),
		categoryId: integer("category_id").references(() => categories.id, {
			onDelete: "cascade",
		}),
		...auditMetadata,
	},
	(table) => [index("barcode_idx").on(table.barcode)],
);
