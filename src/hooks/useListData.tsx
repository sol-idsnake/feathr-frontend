import { useQuery } from "@tanstack/react-query";

import { fetchListData } from "../lib/api";
import type { Entity } from "../types";

function useListData<T extends Entity>({ queryKey }: { queryKey?: string }) {
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    enabled: !!queryKey,
    queryFn: () => fetchListData<T>({ url: queryKey ?? "" }),
    queryKey: [queryKey],
    staleTime: Infinity,
  });

  return {
    data: isSuccess ? data : [],
    dataType: queryKey,
    error,
    isError,
    isLoading: isLoading || !isSuccess,
  };
}

export default useListData;
