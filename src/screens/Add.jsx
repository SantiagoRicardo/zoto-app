import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import { createNewObject, createNewPost } from "../services/user.services";
import * as ImagePicker from "expo-image-picker";
import { getData } from "../utils/asyncStorage";
import DropDownPicker from "react-native-dropdown-picker";

const Add = () => {
  const [objectName, setObjectName] = useState("");
  const [objectImage, setObjectImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [publicationDescription, setPublicationDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [cost, setCost] = useState(0);
  const [objectId, setObjectId] = useState(null);
  const [formState, setFormState] = useState("first");
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Donación", value: "donation" },
    { label: "Cambio", value: "exchange" },
    { label: "Venta", value: "sale" },
  ]);

  console.log(value);

  useEffect(() => {
    getData("currentUser").then((value) => {
      setCurrentUser(JSON.parse(value));
    });
  }, []);

  const createObject = async () => {
    try {
      const objectData = {
        userId: currentUser.id,
        objectName,
        objectImage,
        quantity,
      };

      const response = await createNewObject(objectData);
      setObjectId(response.data.objectId);
      console.log(response.data.objectId);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al cargar los datos el producto");
    }
    setFormState("second");
  };

  const handleSubmit = async () => {
    try {
      const publicationData = {
        userId: currentUser.id,
        objectId,
        publicationDescription,
        transactionType: value,
        cost,
      };

      await createNewPost(publicationData);

      Alert.alert("Éxito", "Tu producto se ha publicado exitosamente");

      setFormState("first");
      setObjectName("");
      setObjectImage("");
      setQuantity("");
      setPublicationDescription("");
      setTransactionType("donation");
      setCost("");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al publicar el producto");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //setImage(result.assets[0].uri);
      setObjectImage(result.uri);
      // Obtener el nombre de la imagen usando split
      const name = result.uri.split("/").pop();
      setObjectImage(name);
    }
  };

  return (
    <View className="mx-5 mt-14">
      <View className="flex flex-row items-center justify-center mt-4">
        <View
          className={`w-6 h-6 rounded-full ${
            formState === "first" ? "bg-green-500" : "bg-gray-300"
          } mr-4`}
        ></View>
        <View
          className={`w-6 h-6 rounded-full ${
            formState === "second" ? "bg-green-500" : "bg-gray-300"
          } ml-4`}
        ></View>
      </View>
      <View className="p-6 border border-gray-400 rounded-md top-5">
        {formState === "first" && (
          <View>
            <Text className="mb-4 text-2xl font-bold text-center">
              Publica tu producto
            </Text>
            <TextInput
              className="p-2 mb-4 border border-black rounded-md"
              placeholder={"Nombre del producto"}
              value={objectName}
              onChangeText={(text) => setObjectName(text)}
            />
            <TextInput
              className="p-3 mb-4 border border-black rounded-md"
              placeholder={"Nombre de la imagen"}
              value={objectImage}
              onChangeText={(text) => setObjectImage(text)}
            />

            {image && <Image source={{ uri: image }} className="h-7 w-7" />}
            <TextInput
              className="p-2 mb-4 border border-black rounded-md"
              placeholder={"Cantidad de producto"}
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="numeric"
            />
            <Button title="Siguiente" onPress={createObject} />
          </View>
        )}

        {formState === "second" && (
          <View>
            <Text className="mb-4 text-2xl font-bold text-center">
              {objectName}
            </Text>
            <TextInput
              className="p-2 mb-4 border border-black rounded-md"
              placeholder={"Descripción del producto"}
              value={publicationDescription}
              onChangeText={(text) => setPublicationDescription(text)}
              multiline={true}
            />
            <View className="z-50 mb-4 border-black rounded-md">
              <DropDownPicker
                language="ES"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeItem={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            {value === "sale" && (
              <TextInput
                className="p-2 mb-4 border border-black rounded-md"
                placeholder={"Valor del producto"}
                value={cost.toString()}
                onChangeText={(text) => {
                  if (!isNaN(text)) {
                    setCost(text);
                  }
                }}
                keyboardType="numeric"
              />
            )}
            <Button title="Publicar" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Add;
