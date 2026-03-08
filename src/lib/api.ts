import axios from "axios";

const api = axios.create();

const Endpoints = {
  films: "films",
  homeworld: "planets",
  people: "people",
  species: "species",
  starships: "starships",
} as const;

async function fetchData<T>(url: string): Promise<T> {
  try {
    const path = url.startsWith("http") ? new URL(url).pathname : `/api/${url}`;
    const response = await api.get<T>(path);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export { Endpoints, fetchData };
