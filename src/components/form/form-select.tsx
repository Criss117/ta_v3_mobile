import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
	label?: string;
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
	required?: boolean;
	hidden?: boolean;
	contentClassName?: string;
	placeholder: string;
	items: Array<{ label: string; id: string }>;
}

export function FormSelect<T extends FieldValues>({
	label,
	description,
	control,
	name,
	required,
	placeholder,
	items,
	contentClassName,
}: Props<T>) {
	const insets = useSafeAreaInsets();
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom,
		left: 12,
		right: 12,
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const defaultValue = items?.find(
					(item) => item.id.toString() === field.value?.toString(),
				);
				return (
					<FormItem>
						{label && (
							<FormLabel>
								{label}
								{required && <Text className="text-red-500">*</Text>}
							</FormLabel>
						)}
						<Select
							defaultValue={
								defaultValue
									? {
											label: defaultValue.label,
											value: defaultValue.id.toString(),
										}
									: undefined
							}
							onValueChange={(value) => {
								field.onChange(value?.value);
							}}
						>
							<SelectTrigger>
								<SelectValue
									className="text-foreground text-sm native:text-lg"
									placeholder={placeholder}
								/>
							</SelectTrigger>
							<SelectContent
								insets={contentInsets}
								className="w-[250px]"
								side="top"
							>
								<ScrollView className={cn("flex-1 h-64", contentClassName)}>
									{items?.map((item) => (
										<SelectItem
											key={item.id}
											value={item.id}
											label={item.label}
										/>
									))}
								</ScrollView>
							</SelectContent>
						</Select>
						{description && <FormDescription>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
