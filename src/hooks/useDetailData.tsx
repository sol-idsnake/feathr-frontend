import { queryOptions, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Endpoints, fetchData } from "../lib/api";
import { queryClient } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";
import type { DetailEntity, Film, Person, Planet, Specie, Starship } from "../types";
import type { ApiRoute } from "../types/api";

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

function useDetailData({ queryKey }: { queryKey: ApiRoute }) {
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

  // Derive related URL arrays per entity type; pass empty arrays for inapplicable groups
  const filmUrls = (entity as Person).films ?? [];

  const homeworldUrls =
    queryKey === Endpoints.people && (entity as Person).homeworld
      ? [(entity as Person).homeworld]
      : [];
  const speciesUrls = queryKey === Endpoints.people ? ((entity as Person).species ?? []) : [];
  const starshipUrls = queryKey === Endpoints.people ? ((entity as Person).starships ?? []) : [];

  const residentUrls = queryKey === Endpoints.homeworld ? ((entity as Planet).residents ?? []) : [];

  const pilotUrls = queryKey === Endpoints.starships ? ((entity as Starship).pilots ?? []) : [];

  // Fetch all related entity groups in parallel. Suspends until all queries in each group resolve
  const filmResults = useSuspenseQueries({ queries: filmUrls.map(filmOptions) });
  const [homeworldResult] = useSuspenseQueries({ queries: homeworldUrls.map(homeworldOptions) });
  const speciesResults = useSuspenseQueries({ queries: speciesUrls.map(speciesOptions) });
  const starshipResults = useSuspenseQueries({ queries: starshipUrls.map(starshipOptions) });
  const residentResults = useSuspenseQueries({ queries: residentUrls.map(personNameOptions) });
  const pilotResults = useSuspenseQueries({ queries: pilotUrls.map(personNameOptions) });

  return {
    data: {
      ...entity,
      films: filmResults.map((r) => r.data),
      ...(queryKey === Endpoints.people && {
        homeworld: homeworldResult?.data ?? (entity as Person).homeworld,
        species: speciesResults.map((r) => r.data),
        starships: starshipResults.map((r) => r.data),
      }),
      ...(queryKey === Endpoints.homeworld && {
        residents: residentResults.map((r) => r.data),
      }),
      ...(queryKey === Endpoints.starships && {
        pilots: pilotResults.map((r) => r.data),
      }),
    },
  };
}

export default useDetailData;
