import React from "react";
import { View, Text, Modal, Image } from "react-native";
import approvedIcon from "../../assets/approved_icon.png";
import ButtonPrimary from "./ButtonPrimary";

export function MessageModal({ visible, message, onClose, title }) {

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

                    <Image goTo={"Login"}
                        source={approvedIcon}
                        style={{ width: 50, height: 50, marginBottom: 10 }}
                    />
                    <Text className="text-primary" style={{ fontSize: 17 }}>
                        {message}
                    </Text>
                    <ButtonPrimary onPress={onClose} title={"Cerrar"} route={"Login"} />
                </View>
            </View>
        </Modal>
    );
}
