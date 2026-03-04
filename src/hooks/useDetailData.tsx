import { queryOptions, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Endpoints, fetchSingleData } from "../lib/api";
import { getIdfromUrl } from "../lib/helper";
import { queryKeys } from "../lib/queryKeys";
import type { Film, Person, Planet, Specie, Starship } from "../types";
import type { ApiRoute } from "../types/api";

// Each factory fetches a single related entity and selects only the display value
const homeworldOptions = (id: string) => queryOptions({
  queryFn: () => fetchSingleData<Planet>({ url: Endpoints.homeworld, id }),
  queryKey: queryKeys.detail(Endpoints.homeworld, id),
  select: (planet) => planet.name,
});

const speciesOptions = (id: string) => queryOptions({
  queryFn: () => fetchSingleData<Specie>({ url: Endpoints.species, id }),
  queryKey: queryKeys.detail(Endpoints.species, id),
  select: (specie) => specie.name,
});

const filmOptions = (id: string) => queryOptions({
  queryFn: () => fetchSingleData<Film>({ url: Endpoints.films, id }),
  queryKey: queryKeys.detail(Endpoints.films, id),
  select: (film) => film.title,
});

const starshipOptions = (id: string) => queryOptions({
  queryFn: () => fetchSingleData<Starship>({ url: Endpoints.starships, id }),
  queryKey: queryKeys.detail(Endpoints.starships, id),
  select: (starship) => starship.name,
});

function useDetailData() {
  const { queryKey, id } = useParams();
  const initQueryKey = (queryKey ?? Endpoints.people) as ApiRoute;

  const { data: person } = useSuspenseQuery<Person>({
    queryFn: () => fetchSingleData<Person>({ url: initQueryKey, id: id ?? "" }),
    queryKey: queryKeys.detail(initQueryKey, id ?? ""),
  });

  // Extract numeric detail IDs from the URL
  const homeworldIds = person.homeworld ? [getIdfromUrl(person.homeworld)] : [];
  const speciesIds   = person.species?.map(getIdfromUrl)   ?? [];
  const filmIds      = person.films?.map(getIdfromUrl)     ?? [];
  const starshipIds  = person.starships?.map(getIdfromUrl) ?? [];

  // Fetch each related group in parallel. Suspends until all queries in each group resolve
  const [homeworldResult] = useSuspenseQueries({ queries: homeworldIds.map(homeworldOptions) });
  const speciesResults    = useSuspenseQueries({ queries: speciesIds.map(speciesOptions) });
  const filmResults       = useSuspenseQueries({ queries: filmIds.map(filmOptions) });
  const starshipResults   = useSuspenseQueries({ queries: starshipIds.map(starshipOptions) });

  return {
    data: {
      ...person,
      homeworld: homeworldResult?.data ?? person.homeworld,
      species:   speciesResults.map((r) => r.data),
      films:     filmResults.map((r) => r.data),
      starships: starshipResults.map((r) => r.data),
    },
  };
}

export default useDetailData;
