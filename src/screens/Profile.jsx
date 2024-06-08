import { View, Text } from "react-native";
import TitlePrimary from "../components/Title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { getData } from "../utils/asyncStorage";

export default function Profile({ focused }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getData("currentUser").then((value) => {
      setCurrentUser(JSON.parse(value));
    });
  }, []);



  return (
    <View className="mx-5 mt-14">
      <TitlePrimary title={"Perfil"} />
      <View className="mt-10 bg-gray-300 border-2 border-gray-400 rounded-md ">
        <View className="flex-row m-5">
          <MaterialIcons name="account-circle" size={50} color={"#757575"} />
          <View className="ml-2">
            <Text className="text-2xl text-slate-700">{currentUser.user_name}</Text>
            <Text className={`text-[15px] ${currentUser.enabled ? 'text-green-500' : 'text-red-500'}`}>
              Estado: {currentUser.enabled ? 'Activo' : 'Desactivado'}
            </Text>
            <Text className="text-[15px] text-slate-700">Correo: {currentUser.email}</Text>
            <Text className="text-[15px] text-slate-700">Dirección: {currentUser.adress}</Text>
             
          </View>
        </View>
      </View>
      <Text className="text-3xl text-slate-700 mt-5 text-center shadow-xl">Productos publicados</Text>
    </View>
  );
}
