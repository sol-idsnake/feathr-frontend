import { Burger, Group, Title } from "@mantine/core";
import type { JSX } from "react";

import type { IHeaderProps } from "../types";

function Header({ opened, toggle }: IHeaderProps): JSX.Element {
  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <div>Logo</div>
      <Title order={3} p="sm">
        Star Wars Explorer
      </Title>
    </Group>
  );
}

export default Header;
