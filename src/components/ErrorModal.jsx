import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import deniedIcon from "../../assets/Denied.png";
import TextLink from "../components/TextLink";
import ButtonPrimary from "./ButtonPrimary";

export function ErrorModal({
  visible,
  message,
  onClose,
  label,
  route,
  redirectTo,
}) {
  let [firstLine, secondLine] = message.split("\n\n");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Image
            source={deniedIcon}
            style={{ width: 50, height: 50, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 17, color: "red", marginBottom: 13 }}>
            {firstLine}
          </Text>
          <Text className="text-primary" style={{ fontSize: 17 }}>
            {secondLine}
          </Text>
          <TextLink goTo={route} text={label} onPress={onClose} />
          <ButtonPrimary
            onPress={onClose}
            title={"Cerrar"}
            route={redirectTo}
          />
        </View>
      </View>
    </Modal>
  );
}
