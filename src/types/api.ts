import type { Endpoint } from "../lib/api";

// Type is the *values* of Endpoint, e.g., "people" | "planets" | "starships"
export type EndpointUrl = (typeof Endpoint)[keyof typeof Endpoint];

export interface IFetchParams {
  url: EndpointUrl;
  id?: string;
}
