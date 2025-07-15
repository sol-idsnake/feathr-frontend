import type { MantineThemeOverride } from "@mantine/core";
import { createTheme, rem } from "@mantine/core";

// Type MantineThemeOverride accepts partial overrides of the Mantine theme.
const theme: MantineThemeOverride = createTheme({
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  spacing: {
    md: rem(16),
  },
  radius: {
    md: rem(8),
  },
});

export default theme;
