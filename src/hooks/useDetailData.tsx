import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { Endpoint, fetchSingleData } from "../lib/api";
import { buildRelatedQueries } from "../lib/helper";
import type { Film, Person, Planet, Specie, Starship } from "../types";

function useDetailData() {
  const { queryKey, id } = useParams();

  const initQueryKey = queryKey ?? Endpoint.people;

  // Fetch person data
  const {
    data: person,
    isSuccess,
    isLoading,
    isError,
  } = useQuery<Person>({
    queryKey: [initQueryKey, id],
    queryFn: () => fetchSingleData<Person>({ url: initQueryKey, id: id ?? "" }),
    staleTime: Infinity,
  });

  // Build related person data queries
  const relatedQueries = useMemo(
    () => buildRelatedQueries({ isSuccess, person }),
    [isSuccess, person]
  );

  // Fetch related data
  const relatedResults = useQueries({
    queries: relatedQueries.map(({ id, key, url }) => ({
      queryKey: [key, id],
      queryFn: () => fetchSingleData({ url, id }),
      enabled: !!id,
      staleTime: Infinity,
    })),
  });

  // Build full person data
  const fullPersonData = useMemo(() => {
    if (!person) {
      return undefined;
    }

    function getResultsByKey<T>(key: string): T[] {
      return relatedQueries
        .map((query, index) => {
          return query.key === key ? relatedResults[index].data : null;
        })
        .filter((item): item is T => item !== null);
    }

    return {
      ...person,
      homeworld:
        getResultsByKey<Planet>("homeworld")[0]?.name ?? person.homeworld,
      species: getResultsByKey<Specie>("species").map((specie) => specie?.name),
      films: getResultsByKey<Film>("films").map((film) => film?.title),
      starships: getResultsByKey<Starship>("starships").map(
        (ship) => ship?.name
      ),
    };
  }, [person, relatedQueries, relatedResults]);

  return {
    data: fullPersonData,
    isLoading: isLoading || !isSuccess,
    isError,
  };
}

export default useDetailData;
