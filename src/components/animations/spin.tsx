import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { LoaderIcon } from "lucide-react-native";
import { useEffect } from "react";

export function Spin() {
	const rotation = useSharedValue(0);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotateZ: `${rotation.value}deg`,
				},
			],
		};
	}, [rotation.value]);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 1000,
				easing: Easing.linear,
			}),
			200,
		);
		return () => cancelAnimation(rotation);
	}, []);

	return (
		<Animated.View style={[animatedStyles]}>
			<LoaderIcon />
		</Animated.View>
	);
}
