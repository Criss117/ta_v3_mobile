import { createContext, use, useMemo } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { TerminalIcon } from "lucide-react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNetInfo } from "@/integrations/netinfo";
import {
	createClientDto,
	type CreateClientDto,
} from "@/modules/clients/application/models/create-client.dto";
import type { ClientDetail } from "@/modules/clients/application/models/entities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { useMutateClients } from "../../application/hooks/use.mutate-clients";
import { Button } from "@/components/ui/button";
import { ActivityIndicator } from "react-native";
import { Text } from "@/components/ui/text";

interface RootProps {
	children: React.ReactNode;
	client?: ClientDetail;
	action: "create" | "update";
}

interface Context {
	action: "create" | "update";
	isPending: boolean;
	client?: ClientDetail;
	form: UseFormReturn<CreateClientDto, unknown, CreateClientDto>;
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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

const ClientFormContext = createContext<Context | null>(null);

function useClientForm() {
	const context = use(ClientFormContext);

	if (!context) {
		throw new Error(
			"useClientForm must be used within a ClientFormContext.Provider",
		);
	}

	return context;
}

function Root({ children, client, action }: RootProps) {
	if (action === "update" && !client) {
		throw new Error("ClientForm.Root must have a client");
	}

	const { netInfo } = useNetInfo();
	const { update, create } = useMutateClients();
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

	const onSubmit = form.handleSubmit(async (data) => {
		if (!netInfo?.isConnected) {
			return;
		}

		if (action === "create") {
			create.mutate(
				{
					...data,
				},
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		}

		if (action === "update" && client) {
			update.mutate(
				{
					clientId: client.id,
					...data,
				},
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		}
	});

	if (!netInfo?.isConnected) {
		return (
			<Alert icon={TerminalIcon}>
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					No se puede conectar a internet, verifique su conexión y vuelva a
					intentarlo.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<ClientFormContext.Provider
			value={{
				action,
				client,
				form,
				isPending: create.isPending || update.isPending,
				onSubmit,
			}}
		>
			<Form {...form}>{children}</Form>
		</ClientFormContext.Provider>
	);
}

function BarCode() {
	const { form } = useClientForm();

	return (
		<FormInput
			control={form.control}
			label="Código del cliente"
			placeholder="Código del cliente"
			name="clientCode"
			required
		/>
	);
}

function FullName() {
	const { form } = useClientForm();

	return (
		<FormInput
			control={form.control}
			label="Nombre completo"
			placeholder="Nombre completo"
			name="fullName"
			required
		/>
	);
}

function Email() {
	const { form } = useClientForm();

	return (
		<FormInput
			control={form.control}
			label="Correo electrónico"
			placeholder="Correo electrónico"
			name="email"
			keyboardType="email-address"
		/>
	);
}

function Phone() {
	const { form } = useClientForm();
	return (
		<FormInput
			control={form.control}
			label="Número de teléfono"
			placeholder="Número de teléfono"
			name="phone"
			keyboardType="numeric"
		/>
	);
}

function Address() {
	const { form } = useClientForm();

	return (
		<FormInput
			control={form.control}
			label="Direccion"
			placeholder="Direccion"
			name="address"
		/>
	);
}

function CreditLimit() {
	const { form } = useClientForm();

	return (
		<FormInput
			control={form.control}
			label="Límite de crédito"
			placeholder="Límite de crédito"
			name="creditLimit"
			keyboardType="numeric"
			required
		/>
	);
}

function Modality() {
	const { form } = useClientForm();

	return (
		<FormSelect
			label="Modalidad de cuotas"
			control={form.control}
			name="globalInstallmentModality"
			items={frecuencyItems}
			placeholder="Selecciona una modalidad de cuotas"
			contentClassName="h-32"
		/>
	);
}

function NumberOfInstallments() {
	const { form } = useClientForm();

	return (
		<FormSelect
			label="Número de cuotas"
			control={form.control}
			name="globalNumberOfInstallments"
			items={numOfInstallments}
			placeholder="Selecciona el número de cuotas"
		/>
	);
}

function Submit() {
	const { action, isPending, onSubmit } = useClientForm();

	return (
		<Button className="w-full flex-1 flex-row gap-x-2" onPress={onSubmit}>
			{isPending && <ActivityIndicator size="small" color="black" />}
			<Text>{action === "update" ? "Editar" : "Agregar"}</Text>
		</Button>
	);
}

export default {
	Root,
	useClientForm,
	BarCode,
	FullName,
	Email,
	Phone,
	Address,
	CreditLimit,
	Modality,
	NumberOfInstallments,
	Submit,
};
