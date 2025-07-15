import { z } from "zod";

export const createProductDto = z
	.object({
		barcode: z
			.string({ required_error: "El código de barras es requerido" })
			.max(255, {
				message: "El código de barras no puede exceder los 255 caracteres",
			})
			.trim()
			.min(1, { message: "El código de barras no puede estar vacío" }),

		description: z
			.string({ required_error: "La descripción es requerida" })
			.max(255, {
				message: "La descripción no puede exceder los 255 caracteres",
			})
			.trim()
			.min(1, { message: "La descripción no puede estar vacía" }),

		costPrice: z.coerce
			.number({ required_error: "El precio de costo es requerido" })
			.positive({ message: "El precio de costo debe ser un número positivo" }),

		salePrice: z.coerce
			.number({ required_error: "El precio de venta es requerido" })
			.positive({ message: "El precio de venta debe ser un número positivo" }),

		wholesalePrice: z.coerce
			.number({ required_error: "El precio al por mayor es requerido" })
			.positive({
				message: "El precio al por mayor debe ser un número positivo",
			}),

		stock: z.coerce
			.number({ required_error: "El stock es requerido" })
			.positive({
				message: "El stock debe ser un número positivo",
			}),

		minStock: z.coerce
			.number({ required_error: "El stock mínimo es requerido" })
			.positive({
				message: "El stock mínimo debe ser un número positivo",
			}),
		categoryId: z.coerce.number().positive().nullish(),
	})
	.refine((data) => data.salePrice > data.costPrice, {
		message: "El precio de venta debe ser mayor que el precio de costo",
		path: ["salePrice"],
	})
	.refine((data) => data.salePrice > data.wholesalePrice, {
		message: "El precio de venta debe ser mayor que el precio al por mayor",
		path: ["salePrice"],
	})
	.refine((data) => data.wholesalePrice > data.costPrice, {
		message: "El precio al por mayor debe ser mayor que el precio de costo",
		path: ["wholesalePrice"],
	})
	.refine((data) => data.stock >= data.minStock, {
		message: "El stock debe ser mayor o igual que el stock mínimo",
		path: ["stock"],
	})
	.refine((data) => data.minStock <= data.stock, {
		message: "El stock mínimo debe ser menor o igual que el stock",
		path: ["minStock"],
	});

export type CreateProductDto = z.infer<typeof createProductDto>;
