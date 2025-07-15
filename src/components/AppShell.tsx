import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { JSX, ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface IAppShellProps {
  children: ReactNode;
}

const BasicAppShell = ({ children }: IAppShellProps): JSX.Element => {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  // Close navbar on route change
  useEffect(() => {
    close();
  }, [location.pathname, close]);

  return (
    <AppShell
      header={{ collapsed: false, height: "8vh" }}
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: !opened },
        width: "20vw",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default BasicAppShell;
