import { useMemo, useState } from "react";
import * as Haptics from "expo-haptics";
import { useWindowDimensions, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera } from "@/components/icons/action-icons";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
	onBarcodeScanned: ({ raw }: { raw: string }) => void;
}

export function DialogCamera({ onBarcodeScanned }: Props) {
	const [success, setSuccess] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { width, height } = useWindowDimensions();
	const [permissionStatus, requestPermission] = useCameraPermissions();

	const permission = useMemo(() => permissionStatus, [permissionStatus]);

	if (!permission) {
		return <WaitingForPermission />;
	}

	if (!permission.granted) {
		return <NoPermission requetPermission={() => requestPermission()} />;
	}

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

function WaitingForPermission() {
	return (
		<Button size="icon" variant="ghost">
			<Camera className="dark:text-white opacity-80 text-red-500" />
		</Button>
	);
}

function NoPermission({ requetPermission }: { requetPermission: () => void }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger>
				<Camera className="dark:text-white" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Concede permiso para usar la cámara
					</AlertDialogTitle>
					<AlertDialogDescription>
						Para poder escanear códigos de barras, necesitamos permiso para usar
						la cámara.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex-row">
					<AlertDialogCancel className="flex-1">
						<Text>Cancelar</Text>
					</AlertDialogCancel>
					<AlertDialogAction onPress={requetPermission} className="flex-1">
						<Text>Permitir</Text>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
