import type { TextInputProps } from "react-native";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Text } from "../ui/text";
import {
	FormControlInput,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> extends TextInputProps {
	label?: string;
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
	required?: boolean;
	hidden?: boolean;
	itemClassName?: string;
}

export function FormInput<T extends FieldValues>({
	label,
	description,
	control,
	name,
	required,
	hidden,
	itemClassName,
	...props
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(itemClassName, hidden && "hidden")}>
					{label && (
						<FormLabel>
							{label}
							{required && <Text className="text-red-500">*</Text>}
						</FormLabel>
					)}
					<FormControlInput
						{...props}
						value={field.value?.toString()}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						className="rounded-sm"
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
