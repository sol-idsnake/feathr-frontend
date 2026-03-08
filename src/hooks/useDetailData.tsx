import { queryOptions, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Endpoints, fetchSingleData } from "../lib/api";
import { queryKeys } from "../lib/queryKeys";
import { getIdfromUrl } from "../lib/utils";
import type { Film, Person, Planet, Specie, Starship } from "../types";
import type { ApiRoute } from "../types/api";

// Each factory fetches a single related entity and selects only the display value
const homeworldOptions = (id: string) =>
  queryOptions({
    queryFn: () => fetchSingleData<Planet>({ url: Endpoints.homeworld, id }),
    queryKey: queryKeys.detail(Endpoints.homeworld, id),
    select: (planet) => planet.name,
  });

const speciesOptions = (id: string) =>
  queryOptions({
    queryFn: () => fetchSingleData<Specie>({ url: Endpoints.species, id }),
    queryKey: queryKeys.detail(Endpoints.species, id),
    select: (specie) => specie.name,
  });

const filmOptions = (id: string) =>
  queryOptions({
    queryFn: () => fetchSingleData<Film>({ url: Endpoints.films, id }),
    queryKey: queryKeys.detail(Endpoints.films, id),
    select: (film) => film.title,
  });

const starshipOptions = (id: string) =>
  queryOptions({
    queryFn: () => fetchSingleData<Starship>({ url: Endpoints.starships, id }),
    queryKey: queryKeys.detail(Endpoints.starships, id),
    select: (starship) => starship.name,
  });

const personNameOptions = (id: string) =>
  queryOptions({
    queryFn: () => fetchSingleData<Person>({ url: Endpoints.people, id }),
    queryKey: queryKeys.detail(Endpoints.people, id),
    select: (person) => person.name,
  });

function useDetailData({ queryKey }: { queryKey: ApiRoute }) {
  const { id } = useParams() as { id: string };

  const { data: entity } = useSuspenseQuery({
    queryFn: () => fetchSingleData<Person | Planet | Starship>({ url: queryKey, id }),
    queryKey: queryKeys.detail(queryKey, id),
  });

  // Derive related IDs per entity type; pass empty arrays for inapplicable groups
  const filmIds = (entity as Person).films?.map(getIdfromUrl) ?? [];

  const homeworldIds =
    queryKey === Endpoints.people && (entity as Person).homeworld
      ? [getIdfromUrl((entity as Person).homeworld)]
      : [];
  const speciesIds =
    queryKey === Endpoints.people ? ((entity as Person).species?.map(getIdfromUrl) ?? []) : [];
  const starshipIds =
    queryKey === Endpoints.people ? ((entity as Person).starships?.map(getIdfromUrl) ?? []) : [];

  const residentIds =
    queryKey === Endpoints.homeworld ? ((entity as Planet).residents?.map(getIdfromUrl) ?? []) : [];

  const pilotIds =
    queryKey === Endpoints.starships ? ((entity as Starship).pilots?.map(getIdfromUrl) ?? []) : [];

  // Fetch all related entity groups in parallel. Suspends until all queries in each group resolve
  const filmResults = useSuspenseQueries({ queries: filmIds.map(filmOptions) });
  const [homeworldResult] = useSuspenseQueries({ queries: homeworldIds.map(homeworldOptions) });
  const speciesResults = useSuspenseQueries({ queries: speciesIds.map(speciesOptions) });
  const starshipResults = useSuspenseQueries({ queries: starshipIds.map(starshipOptions) });
  const residentResults = useSuspenseQueries({ queries: residentIds.map(personNameOptions) });
  const pilotResults = useSuspenseQueries({ queries: pilotIds.map(personNameOptions) });

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
