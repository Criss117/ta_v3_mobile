import { count, eq } from "drizzle-orm";
import { db } from "@/integrations/db";
import { categories, products } from "@/integrations/db/tables";
import type { AppRouter } from "@/integrations/trpc/index.mjs";
import type { inferRouterOutputs } from "@trpc/server";

type AllData = inferRouterOutputs<AppRouter>["products"]["findAll"];

async function totalProducts() {
	const [{ totalProducts }] = await db
		.select({
			totalProducts: count(products),
		})
		.from(products)
		.where(eq(products.isActive, true));

	const [{ totalCategories }] = await db
		.select({
			totalCategories: count(products),
		})
		.from(products)
		.where(eq(products.isActive, true));

	return {
		totalProducts,
		totalCategories,
	};
}

async function populateProducts(data: AllData) {
	const { categories: allCategories, products: allProducts } = data;

	const deleteAllProducts = db.delete(products);
	const deleteAllCategories = db.delete(categories);

	await Promise.all([deleteAllProducts, deleteAllCategories]);

	const insertProductsPromise = db.insert(products).values(allProducts);
	const insertCategoriesPromise = db.insert(categories).values(allCategories);

	await Promise.all([insertProductsPromise, insertCategoriesPromise]);
}

async function findAllProducts() {
	return db.select().from(products).where(eq(products.isActive, true));
}

async function findAllCategories() {
	return db.select().from(categories).where(eq(categories.isActive, true));
}

export default {
	totalProducts,
	populateProducts,
	findAllProducts,
	findAllCategories,
};
