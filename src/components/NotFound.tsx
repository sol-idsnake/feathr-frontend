import { Center, Stack, Text, Title } from "@mantine/core";
import type { JSX } from "react";

function NotFound(): JSX.Element {
  return (
    <Center h="100%">
      <Stack align="center">
        <Title order={2}>404</Title>
        <Text c="dimmed">Page not found</Text>
      </Stack>
    </Center>
  );
}

export default NotFound;
