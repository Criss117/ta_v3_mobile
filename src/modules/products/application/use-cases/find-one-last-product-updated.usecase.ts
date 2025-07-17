import type { ProductsQueryRepository } from "@/modules/products/infrastructure/repositories/products-query.repository";

export class FindOneLastProductUpdatedUseCase {
	constructor(
		private readonly productQueryRepository: ProductsQueryRepository,
	) {}

	public async execute() {
		return this.productQueryRepository.findOneLastProductUpdated();
	}
}
