import axios from "axios";
import { API_URL } from "../utils/constant";

export const submitResume = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
