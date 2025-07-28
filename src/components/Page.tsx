import { Center, Loader, Notification } from "@mantine/core";
import type { JSX } from "react";
import { useParams } from "react-router-dom";

import useListData from "../hooks/useListData";
import { Endpoints } from "../lib/api";
import type { ApiRoute } from "../types/api";
import List from "./List";

function Page(): JSX.Element {
  const { queryKey } = useParams();
  const initQueryKey = (queryKey as ApiRoute) ?? Endpoints.people;
  const { isError, isLoading } = useListData({ queryKey: initQueryKey });

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return <Notification color="red">List could not be fetched</Notification>;
  }

  return <List queryKey={initQueryKey} />;
}

export default Page;
