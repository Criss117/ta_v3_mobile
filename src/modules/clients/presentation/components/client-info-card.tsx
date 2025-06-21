import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
	title: string;
	className?: string;
	children: React.ReactNode;
}

export function ClientInfoCard({ title, children, className }: Props) {
	return (
		<Card className={cn("justify-between rounded-sm", className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
