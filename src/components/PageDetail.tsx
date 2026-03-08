import { Center, Loader, Notification } from "@mantine/core";
import { type JSX, Suspense } from "react";
import { useParams } from "react-router-dom";

import useDetailData from "../hooks/useDetailData";
import type { ApiRoute } from "../types/api";
import EntityDetail from "./EntityDetail";
import ErrorBoundary from "./ErrorBoundary";

function DetailContent({ queryKey }: { queryKey: ApiRoute }): JSX.Element {
  const { data } = useDetailData({ queryKey });

  return <EntityDetail entity={data} dataType={queryKey} />;
}

function PageDetail({ queryKey }: { queryKey: ApiRoute }): JSX.Element {
  const { id } = useParams() as { id: string };

  return (
    <ErrorBoundary
      key={`${queryKey}-${id}`}
      fallback={<Notification color="red">Detail could not be fetched</Notification>}
    >
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <DetailContent queryKey={queryKey} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default PageDetail;
