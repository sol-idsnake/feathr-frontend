import axios from "axios";

import type { IFetchParams } from "../types/api";

// Base client
export const api = axios.create({
  baseURL: "/api/",
});

export const Endpoint = {
  people: "people",
  homeworld: "planets",
  starships: "starships",
  species: "species",
  films: "films",
};

export async function fetchListData<T>({ url }: IFetchParams): Promise<T[]> {
  try {
    const response = await api.get<T[]>(`${url}`);
    return response.data;
  } catch (error) {
    console.error(`API error on ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export async function fetchSingleData<T>({
  url,
  id,
}: {
  url: string;
  id?: string;
}): Promise<T> {
  const response = await api.get<T>(`${url}/${id}`);
  return response.data;
}
