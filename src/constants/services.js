const BASE_URL = "http://localhost:3000/api";

export const USER_SERVICES = {
  GET_ALL: `${BASE_URL}/users`,
  GET_BY_ID: `${BASE_URL}/users/`,
  CREATE: `${BASE_URL}/users`,
  CREATE_NEW_OBJECT: `${BASE_URL}/objects`,
  CREATE_NEW_POST: `${BASE_URL}/publications`,
  LOGIN: `${BASE_URL}/users/login`,
  RESET_PASSWORD: `${BASE_URL}/users/password_recovery`,
  UPDATEPASSWORD: `${BASE_URL}/users/update_password`,
};

export const PUBLICATION_SERVICES = {
  GET_ALL: `${BASE_URL}/publications`,
};
export const OFFERS_SERVICES = {
  GET_ALL: `${BASE_URL}/offers`,
  OFFERS_REJECT: `${BASE_URL}/offers/reject`,
  OFFERS_ACCEPT: `${BASE_URL}/offers/accept`,
};
