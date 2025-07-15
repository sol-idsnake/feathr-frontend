const AppRoutes = {
  Characters: "/characters",
  Planets: "/planets",
  Starships: "/starships",
} as const;

type AppRouteKey = keyof typeof AppRoutes;

const navItems = Object.entries(AppRoutes).map(([key, to]) => ({
  label: key as AppRouteKey,
  to,
}));

export { AppRoutes, navItems };
