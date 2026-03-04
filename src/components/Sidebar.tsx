// src/components/Sidebar.tsx
import { NavLink, Stack } from "@mantine/core";
import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

import { navItems } from "../routes";

function Sidebar(): JSX.Element {
  const location = useLocation();

  return (
    <Stack p="sm">
      {navItems.map(({ label, to }) => (
        <NavLink
          active={location.pathname.startsWith(`/${to}`)}
          component={Link}
          key={to}
          label={label}
          to={to}
        />
      ))}
    </Stack>
  );
}

export default Sidebar;
