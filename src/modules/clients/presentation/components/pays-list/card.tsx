import { createContext, useContext, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { format } from "@formkit/tempo";
import { Trash2Icon } from "lucide-react-native";
import type { PaymentSummary } from "@/modules/clients/application/models/entities";
import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
	item: PaymentSummary;
}

interface DeleteButtonProps {
	onPress: () => void;
}

type PaysListCheck = {
	checkedList: Set<number>;
	checkItem: (id: number) => void;
};

const PaysListCheckContext = createContext<PaysListCheck | null>(null);

export function PaysListCheckProvider({
	children,
}: { children: React.ReactNode }) {
	const [checkedList, setCheckedList] = useState(new Set<number>());

	const checkItem = (id: number) => {
		if (checkedList.has(id)) {
			setCheckedList(
				(prev) => new Set([...prev].filter((item) => item !== id)),
			);
			return;
		}

		setCheckedList((prev) => new Set([...prev, id]));
	};

	return (
		<PaysListCheckContext.Provider value={{ checkedList, checkItem }}>
			{children}
		</PaysListCheckContext.Provider>
	);
}

export function usePaysListCheck() {
	const context = useContext(PaysListCheckContext);
	if (!context) {
		throw new Error(
			"usePaysListCheck must be used within PaysListCheckProvider",
		);
	}
	return context;
}

export function PaysListCard({ item }: Props) {
	const { checkItem, checkedList } = usePaysListCheck();

	const isChecked = useMemo(
		() => checkedList.has(item.id),
		[checkedList, item.id],
	);

	return (
		<TouchableOpacity onPress={() => checkItem(item.id)}>
			<View className="rounded-sm border border-border bg-card shadow-sm shadow-foreground/10 px-4 py-3 flex-row items-center gap-x-2 justify-between">
				<Checkbox
					checked={isChecked}
					onCheckedChange={() => checkItem(item.id)}
				/>
				<View className="items-end">
					<Text className="text-xl font-semibold">
						{formatCurrency(item.amount)}
					</Text>
					<Text className="text-sm text-muted-foreground">
						{format({
							date: item.createdAt,
							format: "long",
							locale: "es-ES",
						})}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export function DeletePayments({ onPress }: DeleteButtonProps) {
	const { checkedList } = usePaysListCheck();

	return (
		<Button
			className="flex-row gap-x-1 items-center flex-1"
			disabled={checkedList.size === 0}
			onPress={onPress}
		>
			<Trash2Icon />
			<Text>Eliminar {checkedList.size} pago(s)</Text>
		</Button>
	);
}
