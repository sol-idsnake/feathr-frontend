import type { Endpoint } from "../lib/api";

// Type is the *values* of Endpoint, e.g., "characters" | "planets" | "starships"
export type EndpointUrl = (typeof Endpoint)[keyof typeof Endpoint];

export interface IFetchParams {
  url: EndpointUrl;
  page?: number;
}

export interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
