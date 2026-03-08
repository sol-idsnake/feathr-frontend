import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchData } from "../lib/api";
import { queryKeys } from "../lib/queryKeys";
import type { Entity } from "../types";
import type { ApiRoute } from "../types/api";

function useListData<T extends Entity>({ queryKey }: { queryKey: ApiRoute }) {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.list(queryKey),
    queryFn: () => fetchData<T[]>(queryKey),
  });

  return { data, dataType: queryKey };
}

export default useListData;
