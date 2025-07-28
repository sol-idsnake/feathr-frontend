import { Center, Loader, Notification } from "@mantine/core";
import { type JSX } from "react";
import { useParams } from "react-router-dom";

import useDetailData from "../hooks/useDetailData";
import EntityDetail from "./EntityDetail";

function PageDetail(): JSX.Element {
  const { data, isError, isLoading } = useDetailData();
  const { id } = useParams();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return <Notification color="red">Detail could not be fetched</Notification>;
  }

  return (
    <div className="list-person-detail">
      {id && data && !isLoading && <EntityDetail person={data} />}
    </div>
  );
}

export default PageDetail;
