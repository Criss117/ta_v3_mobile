import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
	return value.toLocaleString("es-ES", {
		style: "currency",
		currency: "COP",
	});
}

export function calculateNextCursor<T>(data: T[], limit: number) {
	const hasMore = data.length > limit;
	const items = hasMore ? data.slice(0, limit) : data;
	const lastItem = data[data.length - 1];

	return {
		items,
		hasMore,
		lastItem,
	};
}
