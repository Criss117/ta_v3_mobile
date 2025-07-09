import React, { useMemo } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "@/components/ui/text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Camera, CameraView } from "expo-camera";

export default function HomePage() {
	const snapPoints = useMemo(() => ["25%", "75%"], []);

	return (
		<GestureHandlerRootView className="flex-1">
			<BottomSheet snapPoints={snapPoints}>
				<BottomSheetView
					style={{
						flex: 1,
						backgroundColor: "red",
						height: "100%",
					}}
				>
					<View className="flex-1 items-center justify-center h-full w-full">
						<CameraView
							style={{ flex: 1, width: "100%", height: "100%" }}
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
								console.log(raw);
							}}
						>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									width: "100%",
									height: "100%",
								}}
							>
								<Text>Enfoca el código de barras</Text>
							</View>
						</CameraView>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}
