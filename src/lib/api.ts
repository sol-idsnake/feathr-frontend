import axios from "axios";

import type { IFetchParams, ListResponse } from "../types/api";

// Base client
export const api = axios.create({
  baseURL: "/api/",
});

export const Endpoint = {
  characters: "people",
  planets: "planets",
  starships: "starships",
};

export async function fetchData<T>({
  page = 1,
  url,
}: IFetchParams): Promise<ListResponse<T>> {
  try {
    const response = await api.get<ListResponse<T>>(`${url}/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`API error on ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}
