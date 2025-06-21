import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProductSummary } from "@/modules/products/application/models/entities";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { BoxIcon } from "@/components/icons/info.icons";
import { ProductCardPopover } from "./popover";

interface Props {
	product: ProductSummary;
	showSkeleton?: boolean;
}

export function ProductCard({ product }: Props) {
	return (
		<Card className="rounded-sm">
			<CardHeader>
				<View className="flex-row items-center justify-between">
					<Badge className="w-1/4">
						<Text>{product.category?.name}</Text>
					</Badge>
					<ProductCardPopover product={product} />
				</View>
				<View className="mt-2">
					<CardDescription>{product.barcode}</CardDescription>
					<CardTitle className="text-xl">{product.description}</CardTitle>
				</View>
			</CardHeader>
			<CardContent className="mt-5 gap-y-2">
				<View className="flex-row justify-between">
					<View className="flex-row gap-x-2 items-center">
						<BoxIcon size={18} className="dark:text-white" />
						<Text>Stock</Text>
					</View>
					<Text>
						{product.stock} / {product.minStock} min
					</Text>
				</View>
				<Separator />
				<View className="flex-row justify-between">
					<View>
						<Text className="text-muted-foreground text-sm">Precio Costo</Text>
						<Text>${formatCurrency(product.costPrice)}</Text>
					</View>
					<View>
						<Text className="text-muted-foreground text-sm">
							Precio Mayoreo
						</Text>
						<Text>${formatCurrency(product.wholesalePrice)}</Text>
					</View>
				</View>
				<View>
					<Text className="text-muted-foreground text-sm">Precio de Venta</Text>
					<Text className="text-xl font-bold">
						${formatCurrency(product.salePrice)}
					</Text>
				</View>
			</CardContent>
		</Card>
	);
}
