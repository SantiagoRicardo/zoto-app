import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ButtonPrimary({ onPress, title, route }) {
  const navigation = useNavigation();

  const handleCloseAndNavigate = () => {
    if (onPress) {
      onPress(); 
    }

    if (route) {
      navigation.navigate(route); 
    }
  };
  return (
    <TouchableOpacity
      onPress={handleCloseAndNavigate}
      className="bg-secundary px-5 py-2 rounded-lg mt-12"
    >
      <Text className="text-white text-[18px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
