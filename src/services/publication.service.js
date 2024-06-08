import axios from "axios";
import { PUBLICATION_SERVICES } from "../constants/services";

export function getAllPublications(token) {
  return axios.get(PUBLICATION_SERVICES.GET_ALL,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}