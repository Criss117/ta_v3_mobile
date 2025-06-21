import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      message: "El email es requerido",
    })
    .email({
      message: "Email no valido",
    }),
  password: z.string({
    message: "La contraseña es requerida",
  }),
});
