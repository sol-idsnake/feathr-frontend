import type { ApiRoute } from "../types/api";

// Keeps list and detail keys for the same route distinct, preventing cache collisions
// e.g. ["people", "list"] vs ["people", "detail", "1"]
export const queryKeys = {
  list: (route: ApiRoute) => [route, "list"],
  detail: (route: ApiRoute, id: string) => [route, "detail", id],
}