import {
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import type { Person } from "../types";

export function EntityDetail({ person }: { person: Person }) {
  const {
    birth_year,
    eye_color,
    films,
    gender,
    hair_color,
    height,
    homeworld,
    mass,
    name,
    skin_color,
    species,
    starships,
  } = person;

  if (!person) {
    return <Skeleton />;
  }

  const filmBadges = films.map((film) => {
    return (
      <Badge key={film} variant="light" color="indigo">
        <Text>{film}</Text>
      </Badge>
    );
  });

  const starShipBadges = starships.map((ship) => {
    return (
      <Badge variant="light" color="teal" key={ship}>
        <Text>{ship}</Text>
      </Badge>
    );
  });

  const speciesBadges = species.map((specie) => {
    return (
      <Group mt="xs" key={specie}>
        <Badge variant="light" color="blue">
          {specie}
        </Badge>
      </Group>
    );
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Title order={2}>{name}</Title>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Birth Year:</strong> {birth_year}
            </Text>
            <Text>
              <strong>Gender:</strong> {gender}
            </Text>
            <Text>
              <strong>Height:</strong> {height} cm
            </Text>
            <Text>
              <strong>Mass:</strong> {mass} kg
            </Text>
            <Text>
              <strong>Hair Color:</strong> {hair_color}
            </Text>
            <Text>
              <strong>Eye Color:</strong> {eye_color}
            </Text>
            <Text>
              <strong>Skin Color:</strong> {skin_color}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Homeworld:</strong> {homeworld}
            </Text>

            <Text mt="sm">
              <strong>Species:</strong>
            </Text>
            {species.length ? speciesBadges : <Text c="dimmed">Unknown</Text>}
          </Grid.Col>
        </Grid>

        <Divider my="sm" />

        <Text fw={600}>Related</Text>

        <Paper withBorder p="sm" radius="md">
          <Text fw={700} mb={"xs"}>
            Films
          </Text>

          <Group wrap="wrap" gap={"xs"}>
            {filmBadges}
          </Group>
        </Paper>

        <Paper withBorder p="sm" radius="md">
          <Text fw={700} mb={"xs"}>
            Starships
          </Text>

          <Group wrap="wrap" gap={"xs"}>
            {starShipBadges}
          </Group>
        </Paper>
      </Stack>
    </Card>
  );
}

export default EntityDetail;
