import { z } from "zod";

export const payDebtDto = z
	.object({
		clientId: z
			.string({ required_error: "El ID del cliente es obligatorio." })
			.uuid({ message: "El ID del cliente debe ser un UUID válido." }),
		amount: z.coerce
			.number({ required_error: "El monto es obligatorio." })
			.int({ message: "El monto debe ser un número entero." })
			.nullish(),
		type: z.enum(["pay_debt", "settle_debt"]),
	})
	.refine(
		(data) =>
			data.type !== "pay_debt" ||
			(data.amount !== null && data.amount !== undefined && data.amount > 0),
		{
			message: "El monto debe ser mayor a 0",
			path: ["amount"],
		},
	);

export type PayDebtDto = z.infer<typeof payDebtDto>;
