import { Badge, Card, Divider, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";

import { getEntityBadgeGroups, getEntityDetailFields } from "../lib/utils";
import type { Person, Planet, Starship } from "../types";
import type { ApiRoute } from "../types/api";

function EntityDetail({
  entity,
  dataType,
}: {
  entity: Person | Planet | Starship;
  dataType: ApiRoute;
}) {
  const fields = getEntityDetailFields(entity, dataType);
  const badgeGroups = getEntityBadgeGroups(entity, dataType);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Title order={2}>{entity.name}</Title>

        <Grid>
          {fields.map(({ label, value }) => (
            <Grid.Col key={label} span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>{label}:</strong> {value}
              </Text>
            </Grid.Col>
          ))}
        </Grid>

        {badgeGroups.length > 0 && (
          <>
            <Divider my="sm" />
            <Text fw={600}>Related</Text>
            {badgeGroups.map(({ label, color, items }) => (
              <Paper key={label} withBorder p="sm" radius="md">
                <Text fw={700} mb="xs">
                  {label}
                </Text>
                <Group wrap="wrap" gap="xs">
                  {items.length ? (
                    items.map((item, index) => (
                      <Badge key={`${item}-${index}`} variant="light" color={color}>
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <Text c="dimmed">Unknown</Text>
                  )}
                </Group>
              </Paper>
            ))}
          </>
        )}
      </Stack>
    </Card>
  );
}

export default EntityDetail;
