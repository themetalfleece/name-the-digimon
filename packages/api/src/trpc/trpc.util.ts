import { initTRPC } from '@trpc/server';
import { Context } from './context.util';

export const t = initTRPC.context<Context>().create();
