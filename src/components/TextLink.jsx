import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TextLink({ text, goTo, onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    navigation.navigate(goTo);
  };

  return (
    <View className="w-full mt-8 flex-row  ">
      <TouchableOpacity onPress={handlePress}>
        <Text
          className="text-[17px] font-bold underline text-primary "
          style={{ backgroundColor: "rgba(239, 237, 237, 0.654)" }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
