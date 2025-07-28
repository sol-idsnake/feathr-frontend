import { Endpoint } from "./lib/api";

const navItems = [
  { label: "people", to: Endpoint.people },
  { label: "planets", to: Endpoint.homeworld },
  { label: "starships", to: Endpoint.starships },
] as const;

export { navItems };
