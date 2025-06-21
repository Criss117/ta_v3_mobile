import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { PanelLeftIcon } from "@/components/icons/dashboard.icons";

export function DrawerTrigger() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				Haptics.selectionAsync();
				navigation.dispatch(DrawerActions.openDrawer());
			}}
		>
			<PanelLeftIcon className="dark:text-white" />
		</TouchableOpacity>
	);
}
