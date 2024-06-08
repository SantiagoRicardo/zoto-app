import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getData } from "../utils/asyncStorage";
import { ERROR } from "../constants/errorsMessages";
import InputBasic from "../components/InputBasic";
import ButtonPrimary from "../components/ButtonPrimary";
import { updatePasswordService } from "../services/user.services";
import { MessageModal } from "../components/MessageModal";

export default function Security() {
  const [currentUser, setCurrentUser] = useState(" ");
  const [errors, setErrors] = useState({});
  const [newPassword, setnewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState('');
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");



  function validateErrors() {
    let errors = {};
    if (!newPassword.trim()) {
      errors.userPassword = ERROR.PASSWORD_REQUIRE;
    } else if (newPassword.length < 6) {
      errors.userPassword = ERROR.PASSWORD_SHORT;
    } else if (newPassword !== repeatPassword) {
      errors.repeatPassword = 'Las contraseñas no coinciden';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function updatePassword() {
    if (!validateErrors()) return;
    try {
      await updatePasswordService(currentUser.token, currentUser.id, newPassword)
      setMessageModalVisible(true);
      setResetPasswordMessage("La contraseña fue actualizada con éxito.\nVuelve a iniciar sesión con tu nueva contraseña");


    } catch (error) {
      console.log(error)
      alert("Error al actualizar tu contraseña. Inténtalo nuevamente")
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getData("currentUser");
        const user = JSON.parse(value);
        setCurrentUser(user);
      } catch (error) {
        console.log(error);

      }
    };
    fetchData();
  }, []);

  function handleChangeText(setState) {
    return function (text) {
      setState(text);
      setErrors({});
    };
  }


  return (
    <View className="flex flex-col items-center mx-5 mt-14">
      <Text className="justify-center text-lg font-bold text-center">
        Cambiar contraseña🔑
      </Text>

      <View
        className="w-full px-2   rounded-lg"
        style={{ backgroundColor: "rgba(239, 237, 237, 0.654)" }}
      >
        <InputBasic
          value={newPassword}
          onChangeText={handleChangeText(setnewPassword)}
          placeholder={"Nueva contraseña"}
          secureTextEntry
          error={errors?.userPassword}
        />
        <InputBasic
          value={repeatPassword}
          onChangeText={handleChangeText(setRepeatPassword)}
          placeholder={"Repita la contraseña"}
          secureTextEntry
          error={errors?.repeatPassword}
        />
      </View>
      <View className="w-[90px] text-center">
        <ButtonPrimary onPress={updatePassword} title={"Enviar"} />
      </View>
      <MessageModal
        visible={messageModalVisible}
        message={resetPasswordMessage}
        onClose={() => setMessageModalVisible(false)}
      />
    </View>
  );
}
