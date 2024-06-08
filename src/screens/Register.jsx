import { useState } from "react";
import { View, Text, ImageBackground } from "react-native";

import { ERROR } from "../constants/errorsMessages";
import { REGEX } from "../constants/regex";
import backgroundRegister from "../../assets/crear_usuario.jpeg";

import { createUser } from "../services/user.services";
import { storeData } from "../utils/asyncStorage";

import InputBasic from "../components/InputBasic";
import ButtonPrimary from "../components/ButtonPrimary";
import TextLink from "../components/TextLink";
import LogoApp from "../components/LogoApp";
import { MessageModal } from "../components/MessageModal";
import { useNavigation } from "@react-navigation/native";
import { ErrorModal } from "../components/ErrorModal";
import PhoneInput from "react-native-international-phone-number";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [userCreatedMessage, setUserCreatedMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  //const [inputValue, setInputValue] = useState('');

  const [redirectTo, setRedirectTo] = useState("");

  function validateErrors() {
    let errors = {};

    if (!userName.trim()) {
      errors.userName = ERROR.USER_REQUIRE;
    }

    if (!email.trim()) {
      errors.email = ERROR.EMAIL_REQUIRE;
    } else if (!REGEX.EMAIL.test(email)) {
      errors.email = ERROR.EMAIL_INVALID;
    }

    if (!adress.trim()) {
      errors.adress = ERROR.ADRESS_REQUIRE;
    }

    if (!phone.trim()) {
      errors.phone = ERROR.PHONE_REQUIRE;
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

  async function register() {
    if (!validateErrors()) return;

    try {
      const { data } = await createUser({
        userName,
        adress,
        phone,
        email,
        userPassword,
      });

      if (data) {
        setRedirectTo("Login");
        storeData("currentUser", data);
        setUserCreatedMessage(
          "¡Usuario creado exitosamente!\n\n Ya puedes inciar sesión."
        );
        setMessageModalVisible(true);
      }
    } catch (error) {
      setRedirectTo("Register");
      if (error.response.status === 500) {
        setErrorMessage(ERROR.REGISTER_FAILED);
        setErrorModalVisible(true);
      } else {
        setErrorMessage(error.response.data);
        setErrorModalVisible(true);
      }
    }
  }

  {
    /*
    function handleInputValue(phoneNumber) {
      setPhone(phoneNumber);
    }
  */
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <ImageBackground
      source={backgroundRegister}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View className="items-center flex-1 p-5 pt-10">
        <LogoApp width={190} height={190} />

        <View
          className="w-full px-5 rounded-lg"
          style={{ backgroundColor: "rgba(239, 237, 237, 0.654)" }}
        >
          <InputBasic
            value={userName}
            onChangeText={handleChangeText(setUserName)}
            placeholder={"Nombre de usuario"}
            error={errors?.userName}
          />

          <InputBasic
            value={email}
            onChangeText={handleChangeText(setEmail)}
            placeholder={"Correo electrónico"}
            error={errors?.email}
          />

          <InputBasic
            value={adress}
            onChangeText={handleChangeText(setAdress)}
            placeholder={"Dirección de domicilio"}
            error={errors?.adress}
          />
          <View className="my-2">
            <PhoneInput
              className=" border border-primary text-[16px] text-primary rounded-md focus:border-secundary"
              value={phone}
              language="es"
              defaultCountry="CO"
              onChangePhoneNumber={handleChangeText(setPhone)}
              onChangeText={handleChangeText(setPhone)}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              error={errors?.phone}
            />
          </View>

          <InputBasic
            value={userPassword}
            onChangeText={handleChangeText(setUserPassword)}
            placeholder={"Contraseña"}
            secureTextEntry
            error={errors?.userPassword}
          />
        </View>

        <TextLink text={"Ya tengo una cuenta"} goTo={"Login"} />
        <ButtonPrimary onPress={register} title={"Crear cuenta"} />
      </View>
      <MessageModal
        visible={messageModalVisible}
        message={userCreatedMessage}
        onClose={() => setMessageModalVisible(false)}
      />
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
        label={"Restablecer contraseña"}
        route={"ResetPassword"}
        redirectTo={redirectTo}
      />
    </ImageBackground>
  );
}
