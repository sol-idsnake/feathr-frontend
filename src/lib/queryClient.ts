import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // SWAPI data never changes, so cached responses are always valid
      staleTime: Infinity,
      // Data never changes so we don't need to refetch when stale
      refetchOnWindowFocus: false,
    },
  },
});
