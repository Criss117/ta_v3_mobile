import { db } from "@/integrations/db";
import { ProductsQueryRepository } from "./infrastructure/repositories/products-query.repository";
import { FindManyProductsUseCase } from "./application/use-cases/find-many-product.usecase";
import { FindOneLastProductUpdatedUseCase } from "./application/use-cases/find-one-last-product-updated.usecase";

export const productsQueryRepository = new ProductsQueryRepository(db);
export const findManyProductsUseCase = new FindManyProductsUseCase(
	productsQueryRepository,
);
export const findOneLastProductUpdatedUseCase =
	new FindOneLastProductUpdatedUseCase(productsQueryRepository);
