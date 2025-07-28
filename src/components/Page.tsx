import { Center, Loader, Notification } from "@mantine/core";
import { useParams } from "react-router-dom";

import useListData from "../hooks/useListData";
import { Endpoint } from "../lib/api";
import List from "./List";

function Page() {
  const { queryKey } = useParams();
  const initQueryKey = queryKey ?? Endpoint.people;
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
