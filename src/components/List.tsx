import { Alert, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { type JSX, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useData from "../hooks/useData";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

interface ListProps<T> {
  title: string;
  renderItems: (item: T) => JSX.Element;
}

function List<T>({ renderItems, title }: ListProps<T>): JSX.Element {
  const { pathname } = useLocation();
  const currentRoute = usePagination((s) => s.currentRoute);
  const page = usePagination((s) => s.page);
  const setCurrentRoute = usePagination((s) => s.setCurrentRoute);
  const setPage = usePagination((s) => s.setPage);
  const setPages = usePagination((s) => s.setPages);

  const isRouteUpdating = pathname !== currentRoute;

  const { data, isLoading, isError, error } = useData<T>({
    enabled: !isRouteUpdating,
    page,
    setPages,
  });

  // Reset pagination when the endpoint changes
  useEffect(() => {
    if (isRouteUpdating) {
      setPage(1);
      setCurrentRoute(pathname);
    }
  });

  if (isLoading) {
    return (
      <Text ml="md" size="lg">
        Loading data...
      </Text>
    );
  }

  if (isError) {
    return (
      <Alert title="Error" color="red" variant="filled">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Stack>
      <Title order={2}>{title}</Title>

      <SimpleGrid cols={3} spacing="md" mt={"md"}>
        {data.map((item) => renderItems(item))}
      </SimpleGrid>

      <Pagination />
    </Stack>
  );
}

export default List;
