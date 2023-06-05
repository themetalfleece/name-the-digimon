import { requestHandler } from './trpc/requestHandler.util';

export interface Env {
  DB: D1Database;
  CLOUDFLARE_ACCOUNT_HASH: string;
  ENVIRONMENT: 'dev' | 'staging' | 'production';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return requestHandler(request, env);
  },
};
