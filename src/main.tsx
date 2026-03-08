import "@mantine/core/styles.css";

import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { queryClient } from "./lib/queryClient.ts";
import theme from "./styles/theme.ts";

const colorSchemeManager = localStorageColorSchemeManager({ key: "mantine-color-scheme" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="auto">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
