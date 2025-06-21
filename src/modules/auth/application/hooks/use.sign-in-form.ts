import { useTransition } from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { signInFormSchema } from "../models/schemas";
import { useAuth } from "../store/auth.store";

export function useSignInForm() {
	const router = useRouter();
	const [isPending, startTransiton] = useTransition();
	const signInEmail = useAuth((s) => s.signInEmail);

	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "cristian@email.com",
			password: "holamundo",
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		startTransiton(async () => {
			await signInEmail({
				email: values.email,
				password: values.password,
				onSuccess: () => {
					router.push("/dashboard");
				},
				onError: (error) => {
					form.setError("root", {
						message: error.message,
					});
				},
			});
		});
	});

	return {
		...form,
		isPending,
		onSubmit,
	};
}
