import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

// Wrapper with providers
export const createTestWrapper = () => {
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
          {/* useSuspenseQuery requires Suspense in tests */}
          <Suspense fallback={null}>{children}</Suspense>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

export const renderWithProviders = (
  element: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(element, { wrapper: createTestWrapper(), ...options });
};
