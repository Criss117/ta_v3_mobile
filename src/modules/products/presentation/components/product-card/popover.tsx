import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MoreVerticalIcon, PencilIcon } from "@/components/icons/action-icons";
import { DeleteProduct } from "../delete.product";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductSummary } from "@/modules/products/application/models/entities";

interface Props {
	product: ProductSummary;
}
export function ProductCardPopover({ product }: Props) {
	const insets = useSafeAreaInsets();
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom,
		left: 12,
		right: 12,
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<MoreVerticalIcon className="dark:text-white" size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="bottom"
				insets={contentInsets}
				className="w-40 gap-y-5"
			>
				<DropdownMenuItem asChild>
					<Button
						onPress={() =>
							router.navigate({
								pathname: "/dashboard/products/update",
								params: { data: JSON.stringify(product) },
							})
						}
					>
						<PencilIcon size={20} />
						<Text>Editar</Text>
					</Button>
				</DropdownMenuItem>
				<DeleteProduct
					productId={product.id}
					description={product.description}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
