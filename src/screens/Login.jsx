import { useState } from "react";
import { View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ERROR } from "../constants/errorsMessages";
import { REGEX } from "../constants/regex";

import { loginUser } from "../services/user.services";
import { storeData } from "../utils/asyncStorage";

import InputBasic from "../components/InputBasic";
import ButtonPrimary from "../components/ButtonPrimary";
import TextLink from "../components/TextLink";
import LogoApp from "../components/LogoApp";
import backgroundLogin from "../../assets/background_login.jpeg";
import { ErrorModal } from "../components/ErrorModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  function validateErrors() {
    let errors = {};

    if (!email.trim()) {
      errors.email = ERROR.EMAIL_REQUIRE;
    } else if (!REGEX.EMAIL.test(email)) {
      errors.email = ERROR.EMAIL_INVALID;
    }

    if (!userPassword.trim()) {
      errors.userPassword = ERROR.PASSWORD_REQUIRE;
    } else if (userPassword.length < 6) {
      errors.userPassword = ERROR.PASSWORD_SHORT;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChangeText(setState) {
    return function (text) {
      setState(text);
      setErrors({});
    };
  }

  async function login() {
    if (!validateErrors()) return;
    try {
      const { data } = await loginUser({ email, userPassword });
      if (data) {
        storeData("currentUser", data);
        //console.log("currentUser", data)
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(ERROR.LOGIN_FAILED);
      setErrorModalVisible(true);
    }
  }

  return (
    <ImageBackground
      source={backgroundLogin}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View className="items-center flex-1 pt-10 ">
        <LogoApp width={285} height={285} />
        <View
          className="w-full px-2 rounded-lg"
          style={{ backgroundColor: "rgba(239, 237, 237, 0.654)" }}
        >
          <InputBasic
            value={email}
            onChangeText={handleChangeText(setEmail)}
            placeholder={"Correo electrónico"}
            error={errors?.email}
          />
          <InputBasic
            value={userPassword}
            onChangeText={handleChangeText(setUserPassword)}
            placeholder={"Contraseña"}
            secureTextEntry
            error={errors?.userPassword}
          />
        </View>

        <TextLink text={"¿Aún no tienes una cuenta?"} goTo={"Register"} />
        <TextLink text={"Restablecer contraseña"} goTo={"ResetPassword"} />
        <ButtonPrimary onPress={login} title={"Iniciar sesión"} />
      </View>
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
        label={"Crear cuenta"}
        route={"Register"}
      />
    </ImageBackground>
  );
}
