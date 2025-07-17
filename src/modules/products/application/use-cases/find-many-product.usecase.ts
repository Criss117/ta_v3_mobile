import { calculateNextCursor } from "@/lib/utils";
import type { FindManyProductsDto } from "@/modules/products/infrastructure/dtos/find-many-products.dto";
import type { ProductsQueryRepository } from "@/modules/products/infrastructure/repositories/products-query.repository";

import type {
	BaseCursorDto,
	Paginated,
} from "@/modules/shared/dtos/cursor.dto";
import type { ProductSummary } from "../../infrastructure/entities/product.entity";

export class FindManyProductsUseCase {
	constructor(
		private readonly productQueryRepository: ProductsQueryRepository,
	) {}

	public async execute(
		meta: FindManyProductsDto,
	): Promise<Paginated<ProductSummary, BaseCursorDto>> {
		const data = await this.productQueryRepository.findMany(meta);

		const { hasMore, items, lastItem } = calculateNextCursor(data, meta.limit);

		const nextCursor: BaseCursorDto = {
			lastId: hasMore ? lastItem.id : null,
			createdAt: hasMore ? lastItem.createdAt : null,
		};

		return {
			items,
			nextCursor,
		};
	}
}
