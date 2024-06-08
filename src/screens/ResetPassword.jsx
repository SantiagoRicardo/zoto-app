import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import LogoApp from "../components/LogoApp";
import backgroundResetPassword from "../../assets/backgroundResetPassword.jpeg";
import InputBasic from "../components/InputBasic";
import ButtonPrimary from "../components/ButtonPrimary";
import { MessageModal } from "../components/MessageModal";
import { ERROR } from "../constants/errorsMessages";
import { REGEX } from "../constants/regex";
import { resetPassword } from "../services/user.services";
import { ErrorModal } from "../components/ErrorModal";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    //const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    //const [password, setPassword] = useState("");
    const [resetPasswordMessage, setResetPasswordMessage] = useState("");
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function validateErrors() {
        let errors = {};
        if (!email.trim()) {
            errors.email = ERROR.EMAIL_REQUIRE;
        } else if (!REGEX.EMAIL.test(email)) {
            errors.email = ERROR.EMAIL_INVALID;
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function reset() {
        if (!validateErrors()) return;

        try {
            await resetPassword(email);
            //console.log('Lo que devuelve el reset de pass:', data);
            setResetPasswordMessage(ERROR.PASSWORD_RECOVERY_SUCCESSFUL);
            setMessageModalVisible(true);
        } catch (error) {
            const statusCode = error.response.status;
            if (statusCode === 404) {
                setErrorMessage(ERROR.USER_NOT_FOUND);
                setErrorModalVisible(true);
                //console.log('Status del error:', statusCode);
            } else if (statusCode === 500) {
                setErrorMessage(error.response.message)
                setErrorModalVisible(true);
                //console.log('Status del error:', statusCode);
            }



        }
    }

    function handleChangeText(setState) {
        return function (text) {
            setState(text);
            setErrors({});
        };
    }

    return (
        <ImageBackground
            source={backgroundResetPassword}
            style={{ flex: 1, alignItems: "center" }}
        >
            <View className="flex-1 items-center pt-16 ">
                <LogoApp width={250} height={250} />
                <View
                    className="w-full px-2   rounded-lg "
                    style={{ backgroundColor: "rgb(239, 237, 237)" }}
                >
                    <Text style={{ color: 'red', fontSize: 18, textAlign: 'center', marginTop: 3 }}>
                        Restablece tu contraseña
                    </Text>
                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', marginTop: 3, maxWidth: 330 }}>
                        Para restablecer tu contraseña, por favor, introduce la dirección de correo electrónico con la que te registraste. Luego, presiona el botón "Enviar" y te enviaremos un correo con las instrucciones necesarias.
                    </Text>
                    <InputBasic
                        value={email}
                        onChangeText={handleChangeText(setEmail)}
                        placeholder={"Correo electrónico"}
                        error={errors?.email}
                    />
                </View>
                <ButtonPrimary onPress={reset} title={"Enviar"} />
            </View>
            <MessageModal
                visible={messageModalVisible}
                message={resetPasswordMessage}
                onClose={() => setMessageModalVisible(false)}
            />
            <ErrorModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </ImageBackground>
    );
}
