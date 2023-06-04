import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Env } from '../index';
import { appRouter } from './router.util';
import { createContext } from './context.util';

export const requestHandler = (request: Request, env: Env) => {
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
};
