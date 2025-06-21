import { Button, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/modules/auth/application/store/auth.store";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
	const [message, setMessage] = useState<string>("");
	const [version, setVersion] = useState<unknown>(null);
	const user = useAuth((s) => s.user);
	if (!user) {
		return null;
	}

	const fetchVersion = async () => {
		const version = await fetch(
			"http://192.168.101.12:8788/printer/impresoras",
		).then((r) => r.json());

		setVersion(version);
	};

	const operations = {
		serial: "",
		nombreImpresora: "POS-80C",
		operaciones: [
			{
				nombre: "Corte",
				argumentos: [1],
			},
			{
				nombre: "EscribirTexto",
				argumentos: [`${message}\n`],
			},
			{
				nombre: "Corte",
				argumentos: [1],
			},
		],
	};

	const print = async () => {
		await fetch("http://192.168.101.12:8788/printer/imprimir", {
			method: "POST",
			body: JSON.stringify(operations),
		}).then((r) => console.log(r));
	};

	return (
		<View>
			<Input value={message} onChangeText={setMessage} />
			<Text>{JSON.stringify(operations, null, 2)}</Text>
			<Text>{JSON.stringify(version, null, 2)}</Text>
			<Button onPress={fetchVersion} title="Fetch Version" />
			<Button onPress={print} title="Imprimir" />
			<Text>{JSON.stringify(process.env, null, 2)}</Text>
		</View>
	);
}
