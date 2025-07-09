import { FormInput } from "@/components/form/form-input";
import type { CreateProductDto } from "@/modules/products/application/dtos/create-product.dto";
import type { Control, FieldValues } from "react-hook-form";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { DialogCamera } from "@/components/form/dialog-barcode-camera";

interface Props {
	control: Control<CreateProductDto, unknown, CreateProductDto>;
	setValue: (value: string) => void;
}

export function BarcodeInput({ control, setValue }: Props) {
	return (
		<View className="flex-row gap-x-2 items-center">
			<FormInput
				control={control}
				label="Código de barras"
				name="barcode"
				required
				itemClassName="flex-1"
			/>
			<DialogCamera
				onBarcodeScanned={({ raw }) => {
					setValue(raw);
				}}
			/>
		</View>
	);
}
