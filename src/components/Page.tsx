import { Center, Loader, Notification } from "@mantine/core";
import { type JSX,Suspense } from "react";
import { useParams } from "react-router-dom";

import { Endpoints } from "../lib/api";
import type { ApiRoute } from "../types/api";
import ErrorBoundary from "./ErrorBoundary";
import List from "./List";

function Page(): JSX.Element {
  const { queryKey } = useParams();
  const initQueryKey = (queryKey as ApiRoute) ?? Endpoints.people;

  return (
    <ErrorBoundary key={initQueryKey} fallback={<Notification color="red">List could not be fetched</Notification>}>
      <Suspense fallback={<Center><Loader /></Center>}>
        <List queryKey={initQueryKey} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Page;
