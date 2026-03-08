import type { Endpoints } from "../lib/api";

// Type for API routes (the values), e.g., "people" | "planets" | "starships"
export type ApiRoute = (typeof Endpoints)[keyof typeof Endpoints];

