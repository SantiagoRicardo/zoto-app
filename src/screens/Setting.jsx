import { View, Text, Button, TouchableOpacity } from "react-native";
import TitlePrimary from "../components/Title";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ButtonPrimary from "../components/ButtonPrimary";

export default function Setting() {
  const navigation = useNavigation();

  // Crear una función que llame al método navigate con el nombre de la pantalla
  const navigateToProfile = () => {
    navigation.navigate("Security");
  };
  return (
    <View className="mx-5 mt-14">
      <TitlePrimary title={"Configuración"} />
      <View>
        <TouchableOpacity
          onPress={navigateToProfile}
          className="mt-10 bg-gray-300 border-2 border-gray-400 rounded-md"
        >
          <View className="flex-row items-center justify-between m-5">
            <View className="flex-row items-center">
              <MaterialIcons name="verified-user" size={50} color={"#3E4144"} />
              <View className="m-3">
                <Text className="text-xl text[#666f88] font-medium">
                  Seguridad
                </Text>
                <Text className="text-sm text[#666f88] font-normal">
                  Contraseña
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={50} color={"#3E4144"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
