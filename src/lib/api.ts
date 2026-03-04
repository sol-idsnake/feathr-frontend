import axios from "axios";

import type { ApiRoute, IFetchParams } from "../types/api";

// Base client
const api = axios.create({
  baseURL: "/api/",
});

const Endpoints = {
  films: "films",
  homeworld: "planets",
  people: "people",
  species: "species",
  starships: "starships",
} as const;

async function fetchListData<T>({ url }: IFetchParams): Promise<T[]> {
  try {
    const response = await api.get<T[]>(`${url}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

async function fetchSingleData<T>({
  url,
  id,
}: {
  url: ApiRoute;
  id?: string;
}): Promise<T> {
  try {
    const response = await api.get<T>(`${url}/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export { Endpoints, fetchListData, fetchSingleData };
