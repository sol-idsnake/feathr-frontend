import { queryOptions, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Endpoints, fetchData } from "../lib/api";
import { queryClient } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";
import type {
  DetailEntity,
  DetailRoute,
  Film,
  Person,
  Planet,
  RouteEntityMap,
  Specie,
  Starship,
} from "../types";

// Single guard: narrows entity to its concrete type for a given route key
function isEntityType<K extends DetailRoute>(
  e: DetailEntity,
  key: DetailRoute,
  route: K,
): e is RouteEntityMap[K] {
  return key === route;
}

// Each factory fetches a single related entity and selects only the display value
const homeworldOptions = (url: string) =>
  queryOptions({
    queryFn: () => fetchData<Planet>(url),
    queryKey: queryKeys.detail(Endpoints.homeworld, url),
    select: (planet) => planet.name,
  });

const speciesOptions = (url: string) =>
  queryOptions({
    queryFn: () => fetchData<Specie>(url),
    queryKey: queryKeys.detail(Endpoints.species, url),
    select: (specie) => specie.name,
  });

const filmOptions = (url: string) =>
  queryOptions({
    queryFn: () => fetchData<Film>(url),
    queryKey: queryKeys.detail(Endpoints.films, url),
    select: (film) => film.title,
  });

const starshipOptions = (url: string) =>
  queryOptions({
    queryFn: () => fetchData<Starship>(url),
    queryKey: queryKeys.detail(Endpoints.starships, url),
    select: (starship) => starship.name,
  });

const personNameOptions = (url: string) =>
  queryOptions({
    queryFn: () => fetchData<Person>(url),
    queryKey: queryKeys.detail(Endpoints.people, url),
    select: (person) => person.name,
  });

function useDetailData<K extends DetailRoute>({ queryKey }: { queryKey: K }) {
  const { id } = useParams() as { id: string };

  const { data: entity } = useSuspenseQuery({
    queryFn: () => fetchData<DetailEntity>(`${queryKey}/${id}`),
    queryKey: queryKeys.detail(queryKey, id),
    // Seed from list cache to avoid a redundant fetch when navigating from the list view
    initialData: () =>
      queryClient
        .getQueryData<DetailEntity[]>(queryKeys.list(queryKey))
        ?.find((item) => item.url.endsWith(`/${id}/`) || item.url.endsWith(`/${id}`)),
  });

  const person = isEntityType(entity, queryKey, "people") ? entity : null;
  const planet = isEntityType(entity, queryKey, "planets") ? entity : null;
  const starship = isEntityType(entity, queryKey, "starships") ? entity : null;

  // Fetch all related entity groups in parallel. Suspends until all queries in each group resolve
  const filmResults = useSuspenseQueries({ queries: entity.films.map(filmOptions) });
  const [homeworldResult] = useSuspenseQueries({
    queries: (person?.homeworld ? [person.homeworld] : []).map(homeworldOptions),
  });
  const speciesResults = useSuspenseQueries({
    queries: (person?.species ?? []).map(speciesOptions),
  });
  const starshipResults = useSuspenseQueries({
    queries: (person?.starships ?? []).map(starshipOptions),
  });
  const residentResults = useSuspenseQueries({
    queries: (planet?.residents ?? []).map(personNameOptions),
  });
  const pilotResults = useSuspenseQueries({
    queries: (starship?.pilots ?? []).map(personNameOptions),
  });

  return {
    data: {
      ...entity,
      films: filmResults.map((r) => r.data),
      ...(person && {
        homeworld: homeworldResult?.data ?? person.homeworld,
        species: speciesResults.map((r) => r.data),
        starships: starshipResults.map((r) => r.data),
      }),
      ...(planet && {
        residents: residentResults.map((r) => r.data),
      }),
      ...(starship && {
        pilots: pilotResults.map((r) => r.data),
      }),
    },
  };
}

export default useDetailData;
