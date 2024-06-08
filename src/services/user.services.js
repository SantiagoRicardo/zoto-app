import axios from "axios";
import { OFFERS_SERVICES, USER_SERVICES } from "../constants/services";

export function loginUser(user) {
  return axios.post(USER_SERVICES.LOGIN, user);
}

export function createUser(newUser) {
  console.log("createUser", newUser);
  return axios.post(USER_SERVICES.CREATE, newUser);
}

export function createNewObject(newObject, token) {
  console.log("createNewObject", newObject);
  return axios.post(USER_SERVICES.CREATE_NEW_OBJECT, newObject, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createNewPost(newPost) {
  console.log("createNewPost", newPost);
  return axios.post(USER_SERVICES.CREATE_NEW_POST, newPost);
}

export function resetPassword(email) {
  return axios.get(`${USER_SERVICES.RESET_PASSWORD}/${email}`);
}

export function getAllUsersService(token) {
  return axios.get(USER_SERVICES.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updatePasswordService(token, id, newPassword) {
  body = {
    id: id,
    newPassword: newPassword,
  };
  return axios.patch(USER_SERVICES.UPDATEPASSWORD, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getOffers(token) {
  return axios.get(OFFERS_SERVICES.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function offersAccept(offerId, token) {
  console.log("OFFER_ID", offerId);
  return axios.patch(OFFERS_SERVICES.OFFERS_ACCEPT, offerId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function offersReject(offerId, token) {
  return axios.patch(OFFERS_SERVICES.OFFERS_REJECT, offerId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getOffersByPublicationId(publicationId, token) {
  return axios.get(`${OFFERS_SERVICES.GET_ALL}/${publicationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
