import { View } from "react-native";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { GitHubSignIn } from "../components/github-sign-in";
import { SignInForm } from "../components/sign-in-form";

export function SignInScreen({ className }: { className?: string }) {
	return (
		<View className={cn("flex flex-col gap-6", className)}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
					<CardDescription>
						Inicia sesión con tu cuenta de Github
					</CardDescription>
				</CardHeader>
				<CardContent>
					<View className="grid gap-6">
						<View className="flex flex-col gap-4">
							<GitHubSignIn />
						</View>
						<View className="relative">
							<Separator />
							<Text className="absolute z-10 bg-card px-2 text-muted-foreground -top-3 left-1/2 -translate-x-1/2">
								O continua con
							</Text>
						</View>
						<SignInForm />
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
