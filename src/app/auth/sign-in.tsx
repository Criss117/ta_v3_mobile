import { Link } from "expo-router";
import { GalleryVerticalEnd } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SignInScreen } from "@/modules/auth/presentation/screens/signin.screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInPage() {
	const { top } = useSafeAreaInsets();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1"
			keyboardVerticalOffset={100}
			style={{
				paddingTop: top,
			}}
		>
			<View className="flex-1 flex-col items-center justify-center gap-6 bg-muted p-6">
				<View className="flex w-full flex-col gap-6">
					<Link href="/auth/sign-in" className="flex self-center">
						<View className="flex flex-row gap-x-2 items-center">
							<View className="flex h-6 w-6 items-center justify-center bg-primary text-primary-foreground p-5">
								<GalleryVerticalEnd />
							</View>
							<Text className="text-2xl">Acme Inc.</Text>
						</View>
					</Link>
					<SignInScreen />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
