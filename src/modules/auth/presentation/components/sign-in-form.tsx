import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/integrations/auth";
import { useSignInForm } from "@/modules/auth/application/hooks/use.sign-in-form";
import { Button } from "@/components/ui/button";
import { Spin } from "@/components/animations/spin";

export function SignInForm() {
	const form = useSignInForm();

	const createAccount = () => {
		authClient.signUp.email({
			email: "cristian@email.com",
			password: "holamundo",
			name: "cristian",
		});
	};

	return (
		<View className="gap-y-6">
			<Controller
				control={form.control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Label>
							<Text className="relative">
								Email
								<Text className="absolute text-red-600 text-2xl -top-3 left-9">
									*
								</Text>
							</Text>
						</Label>
						<Input
							placeholder="Email"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						{form.control.getFieldState("email").error && (
							<Text className="text-destructive text-sm">
								{form.control.getFieldState("email").error?.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Controller
				control={form.control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Label>
							<Text className="relative">
								Contraseña
								<Text className="absolute text-red-600 text-2xl -top-3 left-9">
									*
								</Text>
							</Text>
						</Label>
						<Input
							placeholder="Contraseña"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							secureTextEntry
						/>
						{form.control.getFieldState("password").error && (
							<Text className="text-destructive text-sm">
								{form.control.getFieldState("password").error?.message}
							</Text>
						)}
					</View>
				)}
			/>
			<Button
				className="w-full flex flex-row gap-x-2"
				disabled={form.isPending}
				onPress={form.onSubmit}
			>
				{form.isPending && <Spin />}
				<Text>Iniciar Sesión</Text>
			</Button>
		</View>
	);
}
