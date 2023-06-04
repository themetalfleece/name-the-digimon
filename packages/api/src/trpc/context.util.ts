import { TRPCError, inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { upsertUser } from '../features/users/upsertUser.util';

export interface CreateContextArgs extends FetchCreateContextFnOptions {
  DB: D1Database;
}

export async function createContext({ req, DB }: CreateContextArgs) {
  const accessToken = req.headers.get('access-token');

  if (!accessToken) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Missing access-token header',
    });
  }

  const user = await upsertUser(DB, accessToken);

  return { DB, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
