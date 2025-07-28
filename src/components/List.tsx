import { SimpleGrid, Stack, Title } from "@mantine/core";
import { type JSX, useMemo } from "react";

import useListData from "../hooks/useListData";
import ListItem from "./ListItem";

function List({ queryKey }: { queryKey: string }): JSX.Element {
  const { data, dataType = queryKey } = useListData({ queryKey });

  const listItems = useMemo(() => {
    return data.map((item, index) => {
      return (
        <ListItem
          dataType={dataType}
          item={item}
          key={`${queryKey}-${index}`}
        />
      );
    });
  }, [data, dataType, queryKey]);

  return (
    <Stack>
      <Title order={2}>{`${dataType.toUpperCase()} List`}</Title>

      <SimpleGrid cols={3} spacing="md" mt={"md"}>
        {listItems}
      </SimpleGrid>
    </Stack>
  );
}

export default List;
