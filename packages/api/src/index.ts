import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from './context.util';
import { appRouter } from './router.util';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      responseMeta: (ctx) => {
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Method': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        };

        // to handle OPTIONS
        if (ctx.errors[0]?.code === 'METHOD_NOT_SUPPORTED') {
          return {
            status: 200,
            headers,
          };
        }

        return {
          headers,
        };
      },
      createContext: (opts) => createContext({ ...opts, ...env }),
    });
  },
};