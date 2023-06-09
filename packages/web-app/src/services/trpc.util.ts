import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../api/src/trpc/router.util';
import { ensureAccessToken } from './ensureAccessToken.util';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL,
      headers() {
        return {
          'access-token': ensureAccessToken(),
        };
      },
    }),
  ],
});
