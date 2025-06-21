import { useForm } from "react-hook-form";
import {
	createClientDto,
	type CreateClientDto,
} from "@/modules/clients/application/models/create-client.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ClientDetail } from "@/modules/clients/application/models/entities";
import { Form } from "@/components/ui/form";
import { ActivityIndicator, View } from "react-native";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { FormSelect } from "@/components/form/form-select";

interface Props {
	isPending: boolean;
	client?: ClientDetail;
	onSubmit: (data: CreateClientDto, actions: { onSuccess: () => void }) => void;
}

const numOfInstallments = Array.from({ length: 12 }, (_, i) => ({
	id: (i + 1).toString(),
	label: `${(i + 1).toString()} ${i + 1 === 1 ? "couta (Pago único)" : "cuotas"}`,
}));

const frecuencyItems = [
	{ id: "weekly", label: "Semanal" },
	{ id: "biweekly", label: "Quincenal" },
	{ id: "monthly", label: "Mensual" },
];

export function ClientForm({ client, isPending, onSubmit }: Props) {
	const form = useForm<CreateClientDto>({
		resolver: zodResolver(createClientDto),
		defaultValues: client
			? {
					fullName: client.fullName,
					creditLimit: client.creditLimit,
					clientCode: client.clientCode,
					globalInstallmentModality: client.globalInstallmentModality,
					globalNumberOfInstallments: client.globalNumberOfInstallments,
					address: client.address,
					email: client.email,
					phone: client.phone,
				}
			: {
					fullName: "",
					creditLimit: 0,
					clientCode: "",
					globalInstallmentModality: "monthly",
					globalNumberOfInstallments: 1,
				},
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		onSubmit(data, {
			onSuccess: () => {
				form.reset();
			},
		});
	});

	return (
		<Form {...form}>
			<View className="gap-y-6 mx-1 mb-5">
				<FormInput
					control={form.control}
					label="Código del cliente"
					placeholder="Código del cliente"
					name="clientCode"
					required
				/>
				<FormInput
					control={form.control}
					label="Nombre completo"
					placeholder="Nombre completo"
					name="fullName"
					required
				/>
				<FormInput
					control={form.control}
					label="Correo electrónico"
					placeholder="Correo electrónico"
					name="email"
					keyboardType="email-address"
				/>
				<FormInput
					control={form.control}
					label="Número de teléfono"
					placeholder="Número de teléfono"
					name="phone"
					keyboardType="numeric"
				/>
				<FormInput
					control={form.control}
					label="Direccion"
					placeholder="Direccion"
					name="address"
				/>
				<FormInput
					control={form.control}
					label="Límite de crédito"
					placeholder="Límite de crédito"
					name="creditLimit"
					keyboardType="numeric"
					required
				/>
				<FormSelect
					label="Modalidad de cuotas"
					control={form.control}
					name="globalInstallmentModality"
					items={frecuencyItems}
					placeholder="Selecciona una modalidad de cuotas"
					contentClassName="h-32"
				/>
				<FormSelect
					label="Número de cuotas"
					control={form.control}
					name="globalNumberOfInstallments"
					items={numOfInstallments}
					placeholder="Selecciona el número de cuotas"
				/>
			</View>
			<View className="mt-2 flex-row gap-x-2">
				<Button
					className="w-full flex-1 flex-row gap-x-2"
					onPress={handleSubmit}
				>
					{isPending && <ActivityIndicator size="small" color="black" />}
					<Text>{client ? "Editar" : "Agregar"}</Text>
				</Button>
			</View>
		</Form>
	);
}
