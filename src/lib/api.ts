import axios from "axios";

// Axios base client
export const api = axios.create({
  baseURL: "https://swapi.info/api",
});
