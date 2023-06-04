import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/solid-query';
import { AppRouter } from '../../../api/src/router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8787/trpc',
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
