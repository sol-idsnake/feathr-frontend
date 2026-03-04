import { Card, Text } from "@mantine/core";
import type { JSX } from "react";
import { NavLink } from "react-router-dom";

import { getItemCard } from "../lib/utils";
import type { IListItemProps } from "../types";

function ListItem({ item, dataType }: IListItemProps): JSX.Element {
  const { id, header, fields } = getItemCard({ item, dataType });

  return (
    <Card
      component={NavLink}
      to={id}
      padding="md"
      radius="md"
      shadow="sm"
      withBorder
    >
      <Text fw={500}>{header}</Text>

      {fields.map((row, i) => (
        <Text key={`field-${i}`} size="sm">
          {row.label}: {row.value}
        </Text>
      ))}
    </Card>
  );
}

export default ListItem;
