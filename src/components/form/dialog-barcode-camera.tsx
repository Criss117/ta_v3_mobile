import { useState } from "react";
import * as Haptics from "expo-haptics";
import { useWindowDimensions, View } from "react-native";
import { Camera } from "@/components/icons/action-icons";
import { CameraView } from "expo-camera";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Text } from "../ui/text";

interface Props {
	onBarcodeScanned: ({ raw }: { raw: string }) => void;
}

export function DialogCamera({ onBarcodeScanned }: Props) {
	const [success, setSuccess] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { width, height } = useWindowDimensions();

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				onPress={() => {
					setIsOpen(true);
					setSuccess(false);
				}}
			>
				<Camera className="dark:text-white" />
			</DialogTrigger>
			<DialogContent
				className="w-full h-full"
				style={{ height: height, minWidth: width }}
			>
				<View className="flex-1 relative mt-5">
					<CameraView
						style={{ flex: 1, borderRadius: 20 }}
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
								"upc_e",
							],
						}}
						onBarcodeScanned={({ raw }) => {
							if (success || !raw) return;

							setSuccess(true);
							Haptics.selectionAsync();
							onBarcodeScanned({ raw });
							setIsOpen(false);
						}}
					/>
					<View className="absolute w-full h-full justify-center items-center">
						<View className="border-2 border-white bg-transparent w-72 h-56 rounded-xl" />

						<Text className="text-white mt-5 text-xl">
							Enfoca el código de barras
						</Text>
					</View>
				</View>
			</DialogContent>
		</Dialog>
	);
}
