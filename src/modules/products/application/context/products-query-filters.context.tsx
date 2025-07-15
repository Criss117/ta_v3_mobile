import { createContext, use, useState } from "react";

const limits = [20, 50, 100] as const;

export interface ProductsQueryContext {
	limit: (typeof limits)[number];
	query: string;
	changeLimit: (limit: ProductsQueryContext["limit"]) => void;
	setQuery: (query: ProductsQueryContext["query"]) => void;
	clearContext: () => void;
}

const productsQueryContext = createContext<ProductsQueryContext | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<ProductsQueryContext["query"]>("");
	const [limit, setLimit] = useState<ProductsQueryContext["limit"]>(20);

	const changeLimit = (limit: ProductsQueryContext["limit"]) => {
		if (!limits.includes(limit)) {
			throw new Error("Invalid limit");
		}

		setLimit(limit);
	};

	const clearContext = () => {
		setQuery("");
		setLimit(20);
	};

	return (
		<productsQueryContext.Provider
			value={{
				limit,
				query,
				changeLimit,
				setQuery,
				clearContext,
			}}
		>
			{children}
		</productsQueryContext.Provider>
	);
}

export function useProductsQueryFilters() {
	const context = use(productsQueryContext);
	if (context === null) {
		throw new Error("useProductsQuery must be used within a Provider");
	}
	return context;
}

export default { Provider };
