import { useQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { Endpoints, fetchSingleData } from "../lib/api";
import { buildRelatedQueries } from "../lib/helper";
import { queryKeys } from "../lib/queryKeys";
import type { Film, Person, Planet, Specie, Starship } from "../types";
import type { ApiRoute } from "../types/api";

function useDetailData() {
  const { queryKey, id } = useParams();
  const initQueryKey = (queryKey ?? Endpoints.people) as ApiRoute;

  // Suspends until the primary person record is available
  const { data: person } = useSuspenseQuery<Person>({
    queryFn: () => fetchSingleData<Person>({ url: initQueryKey, id: id ?? "" }),
    queryKey: queryKeys.detail(initQueryKey, id ?? ""),
  });

  // person is guaranteed defined here — useSuspenseQuery suspends before this runs
  const relatedQueries = useMemo(
    () => buildRelatedQueries({ isSuccess: true, person }),
    [person]
  );

  const related = useQueries({
    queries: relatedQueries.map(({ id: relatedId, url }) => ({
      enabled: !!relatedId,
      queryFn: () => fetchSingleData({ url, id: relatedId }),
      queryKey: queryKeys.detail(url as ApiRoute, relatedId),
    })),
    combine: (results) => ({
      isError: results.some((r) => r.isError),
      isPending: results.some((r) => r.isPending),
      // groups results by endpoint key for lookup in fullPersonData
      byKey: relatedQueries.reduce<Record<string, unknown[]>>(
        (acc, query, i) => {
          const item = results[i]?.data;
          if (item) acc[query.key] = [...(acc[query.key] ?? []), item];
          return acc;
        },
        {}
      ),
    }),
  });

  const fullPersonData = useMemo(() => {
    const { byKey } = related;
    return {
      ...person,
      homeworld:
        (byKey[Endpoints.homeworld]?.[0] as Planet | undefined)?.name ??
        person.homeworld,
      species:
        (byKey[Endpoints.species] as Specie[] | undefined)?.map((s) => s.name) ?? [],
      films:
        (byKey[Endpoints.films] as Film[] | undefined)?.map((f) => f.title) ?? [],
      starships:
        (byKey[Endpoints.starships] as Starship[] | undefined)?.map((s) => s.name) ?? [],
    };
  }, [person, related]);

  return {
    data: fullPersonData,
    isPending: related.isPending,
    isError: related.isError,
  };
}

export default useDetailData;
