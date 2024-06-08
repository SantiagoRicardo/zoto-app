import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getData } from "../utils/asyncStorage";
import images from "../utils/images";
import {
  getOffersByPublicationId,
  offersAccept,
  offersReject,
} from "../services/user.services";

const OffersDetails = () => {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerRejected, setOfferRejected] = useState(false);
  const [publication, setPublication] = useState({});
  const [offers, setOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const data = await getData("selectedPublicationData");
        if (data) {
          const publicationData = JSON.parse(data);
          setCurrentUser(publicationData.currentUser);
          setPublication(publicationData.publication);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchStoredData();
  }, [offerAccepted, offerRejected]);
  console.log(publication.publication_id);
  useEffect(() => {
    if (publication.publication_id) {
      console.log("IngresandoUseEffect: ");
      const getData = async (publication_id) => {
        try {
          const { data } = await getOffersByPublicationId(
            publication_id,
            currentUser.token
          );
          setOffers(data);
          console.log("LINEA 47", publication_id);
          console.log("LINEA 48", data);
        } catch (error) {}
      };
      getData(publication.publication_id);
    }
  }, [publication]);

  // const isCurrentUserOffer = (offer) =>
  //   offer.user_offering_id === (currentUser ? currentUser.id : null);

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

  const handleOfferAction = async (offerId, action) => {
    try {
      if (action === "accept") {
        // Lógica para aceptar la oferta
        await offersAccept({ offerId }, currentUser.token);
        setOfferAccepted(true);
      } else if (action === "reject") {
        // Lógica para rechazar la oferta
        await offersReject({ offerId }, currentUser.token);
        setOfferRejected(true);
      }
    } catch (error) {
      console.log("Error handling offer:", error);
    }
  };

  if (!publication || !offers || !currentUser) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="mx-5 top-16">
        <Text className="text-2xl font-extrabold text-left text-slate-900">
          {publication.object_name ? publication.object_name : " "}
        </Text>
        <View className="flex-row w-[342px] mt-4 bg-gray-300 rounded-xl">
          <Image
            className="m-4 h-[100px] w-[100px] rounded-xl"
            source={
              images[
                publication.object_image ? publication?.object_image : "Image"
              ]
            }
          />
          <View className="flex-grow mt-6 ml-2">
            <Text className="w-[200px] mb-2 font-semibold">
              {publication.publication_description
                ? publication.publication_description
                : " "}
            </Text>
            <Text className="font-bold">
              {getTransactionTypeLabel(
                publication.transaction_type
                  ? publication.transaction_type
                  : null,
                publication.cost ? publication.cost : null
              )}
            </Text>
            <Text className="mb-2 font-bold">
              Estado:{" "}
              <Text
                className={
                  publication.enabled ? "text-green-500" : "text-red-500"
                }
              >
                {publication.enabled ? "Disponible" : "No disponible😔"}
              </Text>
            </Text>
            <Text className="mb-2 font-bold">
              Contacto: {publication.phone || "No disponible"}
            </Text>
          </View>
        </View>
        <Text className="text-2xl font-medium text-center top-3">Ofertas</Text>
        {offers.length
          ? offers.map((offer) => (
              <View
                key={offer.id}
                className="justify-center mt-4 bg-gray-300 rounded-xl"
              >
                <View className="flex-row p-3">
                  <View className="flex-column">
                    <View className="flex items-center justify-center">
                      <MaterialIcons
                        name="account-circle"
                        size={50}
                        color={"#757575"}
                      />
                    </View>
                    <View className="text-center">
                      <Text className="text-center">
                        {offer.user_offering.split(" ")[0]}
                      </Text>
                      <Text className="texter-center">
                        {offer.user_offering.split(" ")[1]}
                      </Text>
                    </View>
                  </View>
                  <View className="ml-5">
                    <Text>{offer.offer_description}</Text>
                    <Text>{offer.contact_phone}</Text>
                    {true ? (
                      offer.user_publicator_id === currentUser.id ? (
                        <View className="flex-row mt-2">
                          {offer.offer_state === "pending" && (
                            <View className="flex-row ">
                              <TouchableOpacity
                                className="p-2 bg-green-500 rounded-md"
                                onPress={() =>
                                  handleOfferAction(offer.id, "accept")
                                }
                              >
                                <Text
                                  className="text-white"
                                  //style={{ color: "green", marginRight: 10 }}
                                >
                                  Aceptar
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                className="p-2 ml-2 bg-red-700 rounded-md"
                                onPress={() =>
                                  handleOfferAction(offer.id, "reject")
                                }
                              >
                                <Text
                                  className="text-white"
                                  //style={{ color: "red" }}
                                >
                                  Rechazar
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          {offer.user_publicator_id === currentUser.id &&
                          offer.offer_state != "accepted" ? null : (
                            <View className="flex-col items-center mt-2">
                              <Text>
                                {offer.offer_state === "accepted"
                                  ? "Aceptada"
                                  : offer.offer_state === "pending"
                                  ? "Pendiente"
                                  : "Rechazada"}
                              </Text>
                            </View>
                          )}
                        </View>
                      ) : null
                    ) : null}
                  </View>
                </View>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
};

export default OffersDetails;
