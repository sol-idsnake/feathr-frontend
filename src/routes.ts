import { Endpoints } from "./lib/api";

const navItems = [
  { label: "People", to: Endpoints.people },
  { label: "Planets", to: Endpoints.homeworld },
  { label: "Starships", to: Endpoints.starships },
] as const;

export { navItems };
