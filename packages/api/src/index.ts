import { requestHandler } from './trpc/requestHandler.util';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return requestHandler(request, env);
  },
};
