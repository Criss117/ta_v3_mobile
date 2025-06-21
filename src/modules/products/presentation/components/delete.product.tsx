import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "@/components/icons/action-icons";

import { useMutateProducts } from "@/modules/products/application/hooks/use.mutate-products";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface Props {
	productId: number;
	description: string;
}

export function DeleteProduct({ productId, description }: Props) {
	const { deleteProduct } = useMutateProducts();
	const [open, setOpen] = useState(false);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="flex-row items-center gap-x-2">
					<Trash2Icon className="text-white" size={20} />
					<Text>Eliminar</Text>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-sm max-w-sm">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Está seguro de eliminar{" "}
						<Text className="font-bold text-xl italic">{description}</Text>?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta accion se puede deshacer. El producto no se eliminará de forma
						permanente y podrá recuperarse en cualquier momento.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex-row gap-x-2">
					<AlertDialogCancel
						disabled={deleteProduct.isPending}
						className="flex-1"
					>
						<Text>Cancelar</Text>
					</AlertDialogCancel>

					<Button
						variant="destructive"
						className="flex-1"
						disabled={deleteProduct.isPending}
						onPress={() =>
							deleteProduct.mutate(
								{
									productId,
								},
								{
									onSuccess: () => setOpen(false),
								},
							)
						}
					>
						<Text>Continuar</Text>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
