import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/solid-query';
import { AppRouter } from '../../../api/src/router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL,
    }),
  ],
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      retryOnMount: false,
    },
  },
});
