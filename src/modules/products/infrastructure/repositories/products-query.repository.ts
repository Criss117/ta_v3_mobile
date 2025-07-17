import { TRPCError } from "@trpc/server";
import {
	and,
	desc,
	eq,
	getTableColumns,
	isNotNull,
	like,
	lte,
	or,
	sql,
} from "drizzle-orm";
import { categories, products } from "@/integrations/db/tables";
import type { ProductSummary } from "@/modules/products/infrastructure/entities/product.entity";
import type { FindManyProductsDto } from "../dtos/find-many-products.dto";
import type { FindOneProductByDto } from "../dtos/find-one-product-by.dto";
import type { db as DBClient } from "@/integrations/db";

export class ProductsQueryRepository {
	constructor(private readonly db: typeof DBClient) {}

	public async findAll() {
		const allProductsPromise = this.db.select().from(products);

		const allCategoriesPromise = this.db.select().from(categories);

		const [allProducts, allCategories] = await Promise.all([
			allProductsPromise,
			allCategoriesPromise,
		]);

		return {
			products: allProducts,
			categories: allCategories,
		};
	}

	public async findMany({
		cursor,
		limit,
		searchQuery,
	}: FindManyProductsDto): Promise<ProductSummary[]> {
		return this.db
			.select({
				...getTableColumns(products),
				category: {
					id: categories.id,
					name: categories.name,
				},
			})
			.from(products)
			.leftJoin(categories, eq(categories.id, products.categoryId))
			.where(
				and(
					or(
						cursor.createdAt
							? lte(products.createdAt, cursor.createdAt)
							: sql`true`,
						and(
							cursor.createdAt
								? eq(products.createdAt, cursor.createdAt)
								: sql`true`,
							cursor.lastId ? lte(products.id, cursor.lastId) : sql`true`,
						),
					),
					or(
						searchQuery
							? like(products.description, `%${searchQuery}%`)
							: sql`true`,
						searchQuery
							? like(products.barcode, `%${searchQuery}%`)
							: sql`true`,
					),
					eq(products.isActive, true),
					isNotNull(products.barcode),
				),
			)
			.orderBy(desc(products.createdAt))
			.limit(limit + 1);
	}

	public async findOneBy({ barcode, productId }: FindOneProductByDto) {
		if (!barcode && !productId) {
			throw new TRPCError({
				code: "BAD_GATEWAY",
			});
		}

		const [product] = await this.db
			.select({
				...getTableColumns(products),
				category: {
					id: categories.id,
					name: categories.name,
				},
			})
			.from(products)
			.leftJoin(categories, eq(categories.id, products.categoryId))
			.where(
				and(
					barcode ? eq(products.barcode, barcode) : sql`true`,
					productId ? eq(products.id, productId) : sql`true`,
					eq(products.isActive, true),
					isNotNull(products.barcode),
				),
			);

		if (!product) {
			return null;
		}

		return product;
	}

	public async findOneLastProductUpdated() {
		const [product] = await this.db
			.select()
			.from(products)
			.where(and(eq(products.isActive, true), isNotNull(products.barcode)))
			.orderBy(desc(products.createdAt))
			.limit(1);

		if (!product) {
			return null;
		}

		return product;
	}
}
