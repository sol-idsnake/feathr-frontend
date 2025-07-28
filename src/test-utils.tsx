import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Wrapper with providers
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries for testing
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

export const renderWithProviders = (
  element: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(element, { wrapper: createWrapper(), ...options });
};
