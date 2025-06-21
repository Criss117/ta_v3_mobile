import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useTRPC } from "@/integrations/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import type {
	Control,
	ControllerRenderProps,
	FieldValues,
	Path,
} from "react-hook-form";
import type { TextInputProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props<T extends FieldValues> {
	description?: string;
	name: Path<T>;
	control: Control<T, unknown, T>;
}

interface ContentProps<T extends FieldValues> {
	field: ControllerRenderProps<T, Path<T>>;
}

function SelectCategoryContent<T extends FieldValues>({
	field,
}: ContentProps<T>) {
	const trpc = useTRPC();
	const query = useSuspenseQuery(
		trpc.categories.findMany.queryOptions({
			cursor: {
				createdAt: null,
				lastId: null,
			},
			search: {
				limit: 20,
				searchQuery: "",
			},
		}),
	);

	const items = useMemo(
		() =>
			query.data?.items.map((item) => ({ label: item.name, value: item.id })),
		[query.data],
	);
	const insets = useSafeAreaInsets();
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom,
		left: 12,
		right: 12,
	};

	const defaultValue = items?.find((item) => item.value === field.value);

	return (
		<Select
			defaultValue={
				defaultValue
					? {
							label: defaultValue.label,
							value: defaultValue.value.toString(),
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
					placeholder="Selecciona una categoría"
				/>
			</SelectTrigger>
			<SelectContent insets={contentInsets} className="w-[250px]" side="top">
				<ScrollView className="flex-1 h-64">
					{items?.map((item) => (
						<SelectItem
							key={item.value}
							value={item.value.toString()}
							label={item.label}
						/>
					))}
				</ScrollView>
			</SelectContent>
		</Select>
	);
}

export function SelectCategory<T extends FieldValues>({
	name,
	control,
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Categoría</FormLabel>
					<Suspense fallback={<Input placeholder="Loading..." />}>
						<SelectCategoryContent field={field} />
					</Suspense>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
