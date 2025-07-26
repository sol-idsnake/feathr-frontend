import { Card, Text } from "@mantine/core";
import type { JSX } from "react";

interface IListItemProps {
  header: string;
  fields: { label: string; value: string }[];
}

function ListItem({ header, fields }: IListItemProps): JSX.Element {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Text fw={500}>{header}</Text>

      {fields.map((row, i) => (
        <Text key={i} size="sm">
          {row.label}: {row.value}
        </Text>
      ))}
    </Card>
  );
}

export default ListItem;
