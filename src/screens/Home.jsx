import {
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { storeData, getData } from "../utils/asyncStorage";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TitlePrimary from "../components/Title";
import Icon from "react-native-vector-icons/FontAwesome";
import LogoutButton from "../components/LogoutButton";
import { getAllPublications } from "../services/publication.service";
import images from "../utils/images";
import { getAllUsersService, getOffers } from "../services/user.services";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(" ");
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setallUsers] = useState([]);
  const [publications, setPublications] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [updatedPublications, setUpdatedPublications] = useState([]);
  const [offers, setOffers] = useState([]);
  const navigation = useNavigation();
  //const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getData("currentUser");
        const user = JSON.parse(value);
        setCurrentUser(user);
        setisLoggedIn(true);
        getAll(user.token);
        getAllUsers(user.token);
        getAllOffers(user.token);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedPublications = publications.map((publication) => {
      const matchingUser = allUsers.find(
        (user) => user.id === publication.user_id
      );
      if (matchingUser) {
        return {
          ...publication,
          phone: matchingUser.phone,
        };
      } else {
        return publication;
      }
    });

    setUpdatedPublications(updatedPublications);
  }, [publications, allUsers]);

  function getTransactionTypeLabel(transactionType, cost) {
    if (transactionType === "exchange") {
      return "Cambio";
    } else if (transactionType === "sale") {
      return `$ ${cost}`;
    } else if (transactionType === "donation") {
      return "Donación";
    } else {
      return "Desconocido";
    }
  }

  async function getAll(token) {
    try {
      const data = await getAllPublications(token);
      if (data) {
        setPublications(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllOffers = async (token) => {
    try {
      const response = await getOffers(token);
      //console.log("OFERTAS:", response.data);
      if (response && response.data) {
        setOffers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublicationPress = (publication) => {
    const offersForPublication = offers.filter(
      (offer) => offer.publication_id === publication.publication_id
    );

    // Guardar toda la información de la publicación y sus ofertas
    const dataToStore = {
      publication,
      offers: offersForPublication,
      currentUser,
    };

    // Guardar en el storeData
    storeData("selectedPublicationData", dataToStore);
    //console.log('selectedPublicationData', dataToStore)
    //setSelectedPublication({ dataToStore });
    navigation.navigate("OffersDetails", {
      dataToStore,
    });
  };

  async function getAllUsers(token) {
    try {
      data = await getAllUsersService(token);
      if (data) {
        setallUsers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleFavorites = (publication) => {
    const isFavorite = favorites.some(
      (fav) => fav.object_id === publication.object_id
    );

    if (isFavorite) {
      setFavorites(
        favorites.filter((fav) => fav.object_id !== publication.object_id)
      );
    } else {
      setFavorites([...favorites, publication]);
    }
  };

  const handleSearch = (text) => {
    const filtered = updatedPublications.filter((producto) =>
      producto.object_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearchValue(text);
  };

  return (
    <SafeAreaProvider>
      <ScrollView className="flex-1 ">
        <View className="mx-5 mt-7 ">
          <View className="flex items-end">
            <LogoutButton title={"Salir"} onPress={isLoggedIn} />
          </View>
          <View>
            <Text className="text-xl font-normal text-left text-slate-700">
              Hola {currentUser.user_name} 👋
            </Text>
            <Text className="text-2xl font-extrabold text-left text-slate-900">
              Explora Productos
            </Text>
          </View>
          <View className="w-full mt-8 ">
            <TextInput
              placeholder={"Encuentra productos"}
              value={searchValue}
              onChangeText={(text) => handleSearch(text)}
              className="
                border border-gray-400 text-[16px] text-primary rounded-md px-3 py-3 w-full focus:border-secundary"
            />
          </View>
          <View className="mt-8 ">
            <TitlePrimary title={"Encuentra lo que buscas, aquí📌"} />
          </View>
          {searchValue === ""
            ? // Si el input está vacío, renderiza todos los productos
              updatedPublications.map((publication, index) => (
                <View
                  key={publication.object_id}
                  className={`mt-8 ${
                    index === publications.length - 1 ? "mb-28" : ""
                  }`}
                >
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      onPress={() => handlePublicationPress(publication)}
                      key={publication.publication_id}
                      className="mr-3 bg-gray-300 rounded-xl"
                    >
                      <View className="mt-2 ml-4">
                        <Text className="text-base font-semibold ">
                          {publication.object_name}
                        </Text>
                      </View>
                      <View className="flex-row w-[342px]">
                        <Image
                          className="m-4 h-[100px] w-[100px] rounded-xl "
                          source={images[publication.object_image]}
                        />
                        <View className="flex-grow mt-6 ml-2">
                          <Text className="mb-2 w-[200px]">
                            {publication.publication_description}
                          </Text>
                          <Text className="font-bold ">
                            {getTransactionTypeLabel(
                              publication.transaction_type,
                              publication.cost
                            )}
                          </Text>
                          <Text className="mb-2 font-bold">
                            Estado:{" "}
                            <Text
                              className={
                                publication.enabled
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {publication.enabled
                                ? "Disponible"
                                : "No disponible😔"}
                            </Text>
                          </Text>
                          <Text className="mb-2 font-bold ">
                            Contacto📳: {publication.phone || "No disponible"}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row justify-end">
                        <View className="px-2 mb-2">
                          <Icon
                            name={
                              favorites.some(
                                (fav) => fav.object_id === publication.object_id
                              )
                                ? "heart"
                                : "heart-o"
                            }
                            size={20}
                            color={
                              favorites.some(
                                (fav) => fav.object_id === publication.object_id
                              )
                                ? "#ed2121"
                                : "#757575"
                            }
                            onPress={() => toggleFavorites(publication)}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              ))
            : // Si hay un valor de búsqueda, renderiza los productos filtrados
              filteredProducts.map((publication, index) => (
                <View
                  key={publication.object_id}
                  className={`mt-8 ${
                    index === filteredProducts.length - 1 ? "mb-28" : ""
                  }`}
                >
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity className="mr-3 bg-gray-300 rounded-xl">
                      <View className="mt-2 ml-4">
                        <Text className="text-base font-semibold ">
                          {publication.object_name}
                        </Text>
                      </View>
                      <View className="flex-row w-[342px]">
                        <Image
                          className="m-4 h-[100px] w-[100px] rounded-xl "
                          source={images[publication.object_image]}
                        />
                        <View className="flex-grow mt-6 ml-2">
                          <Text className="mb-2 w-[200px]">
                            {publication.publication_description}
                          </Text>
                          <Text className="font-bold ">
                            {getTransactionTypeLabel(
                              publication.transaction_type,
                              publication.cost
                            )}
                          </Text>
                          <Text className="mb-2 font-bold">
                            Estado:{" "}
                            <Text
                              className={
                                publication.enabled
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {publication.enabled
                                ? "Disponible"
                                : "No disponible😔"}
                            </Text>
                          </Text>
                          <Text className="mb-2 font-bold ">
                            Contacto: {publication.phone || "No disponible"}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row justify-end">
                        <View className="px-2 mb-2">
                          <Icon
                            name={favorites ? "heart" : "heart-o"}
                            size={20}
                            color={favorites ? "#ed2121" : "#757575"}
                            onPress={toggleFavorites}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
