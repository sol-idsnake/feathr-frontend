import type { ApiRoute } from "../types/api";

// Keeps list and detail keys for the same route distinct, preventing cache collisions
// e.g. ["people", "list"] vs ["people", "detail", "1"]
// detail accepts a full SWAPI URL or a bare id — both normalise to the same key
export const queryKeys = {
  list: (route: ApiRoute) => [route, "list"],
  detail: (route: ApiRoute, urlOrId: string) => [
    route,
    "detail",
    urlOrId.startsWith("http") ? urlOrId.split("/").filter(Boolean).at(-1) : urlOrId,
  ],
};
