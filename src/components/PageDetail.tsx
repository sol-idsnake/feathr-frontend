import { Center, Loader, Notification } from "@mantine/core";
import { type JSX,Suspense } from "react";
import { useParams } from "react-router-dom";

import useDetailData from "../hooks/useDetailData";
import EntityDetail from "./EntityDetail";
import ErrorBoundary from "./ErrorBoundary";

function DetailContent(): JSX.Element {
  const { data, isPending } = useDetailData();
  const { id } = useParams();

  if (isPending || !data) return <Center><Loader /></Center>;

  return (
    <div className="list-person-detail">
      {id && <EntityDetail person={data} />}
    </div>
  );
}

function PageDetail(): JSX.Element {
  const { queryKey, id } = useParams();

  return (
    <ErrorBoundary key={`${queryKey}-${id}`} fallback={<Notification color="red">Detail could not be fetched</Notification>}>
      <Suspense fallback={<Center><Loader /></Center>}>
        <DetailContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default PageDetail;
