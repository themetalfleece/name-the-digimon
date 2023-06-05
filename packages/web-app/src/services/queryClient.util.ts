import { QueryClient } from '@tanstack/solid-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
