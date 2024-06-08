import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { clearData, getData } from '../utils/asyncStorage';


export default function LogoutButton({ onPress, title }) {
    const navigation = useNavigation();

    const handleLogout = async () => {
        /* getData("currentUser").then((value) => {
            //setCurrentUser(JSON.parse(value));
            console.log("Antes de borrar", value)
        }); */
        if (onPress) {
            await clearData('currentUser');
            navigation.navigate("Login");
            alert("Sesión cerrada con éxito")
          /*   getData("currentUser").then((value) => {
                //setCurrentUser(JSON.parse(value));
                console.log("Después de borrar", value)
            }); */

        } else {
            alert("Error al cerrar la sesión. Inténtelo nuevamente")
        }
    };
    return (
        <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-600 py-0.5 rounded-lg w-14 "
        >
            <Text className="text-white text-[18px]  text-center">
                {title}
            </Text>
        </TouchableOpacity>
    );
}
