import { Center, Loader, Notification } from "@mantine/core";
import { type JSX, Suspense } from "react";

import type { ApiRoute } from "../types/api";
import ErrorBoundary from "./ErrorBoundary";
import List from "./List";

function Page({ queryKey }: { queryKey: ApiRoute }): JSX.Element {
  return (
    <ErrorBoundary
      key={queryKey}
      fallback={
        <Notification color="red">List could not be fetched</Notification>
      }
    >
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <List queryKey={queryKey} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Page;
