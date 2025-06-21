import { cn } from "@/lib/utils";
import type * as LabelPrimitive from "@rn-primitives/label";
import { type ComponentProps, createContext, useContext, useId } from "react";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { View } from "react-native";
import { Label } from "./label";
import { Text } from "./text";
import { Input } from "./input";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...props }: ComponentProps<typeof View>) {
	const id = useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<View
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: LabelPrimitive.TextProps & {
	ref?: React.RefObject<LabelPrimitive.TextRef>;
}) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControlInput({ ...props }: React.ComponentProps<typeof Input>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Input
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			className={cn(!!error && "border-destructive", props.className)}
			{...props}
		/>
	);
}

function FormDescription({
	className,
	...props
}: React.ComponentProps<typeof Text> & {
	ref?: React.RefObject<Text>;
	asChild?: boolean;
}) {
	const { formDescriptionId } = useFormField();

	return (
		<Text
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FormMessage({
	className,
	...props
}: React.ComponentProps<typeof Text> & {
	ref?: React.RefObject<Text>;
	asChild?: boolean;
}) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	if (!body) {
		return null;
	}

	return (
		<Text
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</Text>
	);
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControlInput,
	FormDescription,
	FormMessage,
	FormField,
};
