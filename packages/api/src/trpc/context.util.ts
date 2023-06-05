import { TRPCError, inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { upsertUser } from '../features/users/upsertUser.util';
import { Env } from '../index';

export interface CreateContextArgs extends FetchCreateContextFnOptions, Env {}

export async function createContext({
  req,
  resHeaders: _resHeaders,
  ...env
}: CreateContextArgs) {
  const accessToken = req.headers.get('access-token');

  if (!accessToken) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Missing access-token header',
    });
  }

  const user = await upsertUser(env.DB, accessToken);

  return { user, ...env };
}

export type Context = inferAsyncReturnType<typeof createContext>;
