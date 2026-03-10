import { ActionIcon, Burger, Group, Title } from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import type { JSX } from "react";

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }): JSX.Element {
  const { toggleColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme("light");

  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <div>Logo</div>
      <Title order={3} p="sm">
        Star Wars Explorer
      </Title>
      <ActionIcon
        aria-label="Toggle color scheme"
        ml="auto"
        onClick={toggleColorScheme}
        size="xl"
        variant="subtle"
      >
        <span style={{ fontSize: "1.5rem" }}>{computed === "dark" ? "☀" : "☾"}</span>
      </ActionIcon>
    </Group>
  );
}

export default Header;
