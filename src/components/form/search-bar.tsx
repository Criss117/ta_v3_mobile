import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { View } from "react-native";
import { X } from "@/components/icons/action-icons";

interface Props {
	placeholder: string;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	debounceTime?: number;
}

export function SearchBar({
	placeholder,
	query,
	setQuery,
	debounceTime = 500,
}: Props) {
	const [value, setValue] = useState(query);
	const debouncedValue = useDebounce(value, debounceTime);

	useEffect(() => {
		setQuery(debouncedValue);
	}, [debouncedValue, setQuery]);

	return (
		<View className="relative">
			<Input placeholder={placeholder} onChangeText={setValue} value={value} />
			<Button
				className="absolute right-1 w-1"
				variant="ghost"
				onPress={() => {
					setQuery("");
					setValue("");
				}}
			>
				<X className="dark:text-white" />
			</Button>
		</View>
	);
}
