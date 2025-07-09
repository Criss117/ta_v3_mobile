import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/icons/action-icons";
import { cn } from "@/lib/utils";

interface Context {
	barcode: string | null;
	setBarcode: (barcode: string | null) => void;
}

const BarcodeCameraContext = createContext<Context | null>(null);

export function BarcodeCameraProvider({
	children,
}: { children: React.ReactNode }) {
	const [barcode, setBarcode] = useState<string | null>(null);

	return (
		<BarcodeCameraContext.Provider
			value={{
				barcode,
				setBarcode,
			}}
		>
			{children}
		</BarcodeCameraContext.Provider>
	);
}

export function useBarcodeCamera() {
	const context = useContext(BarcodeCameraContext);

	if (!context) {
		throw new Error(
			"useBarcodeCamera must be used within a BarcodeCameraProvider",
		);
	}

	return context;
}

export function BarcodeCamera() {
	const router = useRouter();
	const { setBarcode } = useBarcodeCamera();
	const [isNavigating, setIsNavigating] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission}>
					<Text>grant permission</Text>
				</Button>
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 relative">
			<CameraView
				style={{ flex: 1 }}
				facing={"back"}
				barcodeScannerSettings={{
					barcodeTypes: [
						"aztec",
						"code39",
						"code93",
						"code128",
						"datamatrix",
						"ean13",
						"ean8",
						"itf14",
						"pdf417",
						"qr",
						"upc_e",
					],
				}}
				onBarcodeScanned={({ raw }) => {
					if (isNavigating) return; // Evita múltiples ejecuciones

					setBarcode(raw ?? null);
					setIsNavigating(true); // Bloquea nuevas navegaciones
					router.back();
				}}
			/>
			<View className="absolute w-full h-full justify-center items-center">
				{/* Recuadro central transparente */}
				<View className="border-2 border-white bg-transparent w-72 h-56" />

				{/* Texto opcional debajo del recuadro */}
				<Text className="text-white mt-5 text-xl">
					Enfoca el código de barras
				</Text>
			</View>
		</SafeAreaView>
	);
}

export function SearchBarCamera({ className }: { className?: string }) {
	const router = useRouter();
	return (
		<Button
			className={cn(className)}
			onPress={() =>
				router.push({
					pathname: "/dashboard/products/barcode-camera",
					params: {
						from: "/dashboard/products",
					},
				})
			}
			variant="ghost"
			size="icon"
		>
			<Camera className="dark:text-white" />
		</Button>
	);
}
