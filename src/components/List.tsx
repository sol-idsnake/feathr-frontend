import { SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { type JSX, useMemo, useState } from "react";

import useListData from "../hooks/useListData";
import type { BaseEntity } from "../types";
import type { ApiRoute } from "../types/api";
import ListItem from "./ListItem";

function List({ queryKey }: { queryKey: ApiRoute }): JSX.Element {
  const { data, dataType } = useListData({ queryKey });
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      search.trim()
        ? data.filter((item) =>
            (item as BaseEntity).name?.toLowerCase().includes(search.toLowerCase()),
          )
        : data,
    [data, search],
  );

  const listItems = filtered.map((item) => (
    <ListItem dataType={dataType} item={item} key={item.url} />
  ));

  return (
    <Stack>
      <Title order={2}>{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</Title>

      <TextInput
        placeholder={`Search ${dataType}...`}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      {filtered.length === 0 ? (
        <Text c="dimmed">No results</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mt="md">
          {listItems}
        </SimpleGrid>
      )}
    </Stack>
  );
}

export default List;
