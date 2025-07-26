import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Endpoint, fetchData } from "../lib/api";
import { getTotalPages } from "../lib/helper";

interface useDataReturnValue<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

interface IUseDataProps {
  enabled: boolean;
  page: number;
  setPages: (pages: number) => void;
}

function useData<T>({
  enabled,
  page,
  setPages,
}: IUseDataProps): useDataReturnValue<T> {
  const { pathname } = useLocation();

  // Endpoint differs for convenience, characters -> people
  const endpoint = pathname.includes("characters")
    ? Endpoint.characters
    : pathname;
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    enabled,
    queryFn: () => fetchData<T>({ url: endpoint, page }),
    queryKey: [endpoint, page],
  });

  useEffect(() => {
    if (isSuccess) {
      setPages(getTotalPages(data.count));
    }
  }, [data, isSuccess, setPages]);

  return {
    data: isSuccess ? data.results : [],
    error: error,
    isError,
    isLoading: isLoading || !isSuccess,
  };
}

export default useData;
