import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutatePayments } from "@/modules/clients/application/hooks/use.mutate-payments";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BanknoteXIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";

interface Props {
	clientId: string;
	hasDebt: boolean;
}

export function SettleDebt({ clientId, hasDebt }: Props) {
	const [open, setOpen] = useState(false);
	const { create } = useMutatePayments();

	const handleSettleDebt = () =>
		create.mutate(
			{ clientId, type: "settle_debt" },
			{
				onSuccess: () => setOpen(false),
			},
		);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					className="flex-1 flex-row items-center gap-x-1.5"
					disabled={!hasDebt}
				>
					<BanknoteXIcon />
					<Text>Liquidar adeudo</Text>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-sm">
				<AlertDialogHeader>
					<AlertDialogTitle>Liquidar adeudo</AlertDialogTitle>
					<AlertDialogDescription>
						Seguro que desea liquidar el adeudo?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex-row gap-x-2">
					<AlertDialogCancel asChild>
						<Button variant="outline" className="flex-1">
							<Text>Cancelar</Text>
						</Button>
					</AlertDialogCancel>
					<Button
						disabled={create.isPending}
						onPress={handleSettleDebt}
						className="flex-1"
					>
						<Text>Continuar</Text>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
