import { progressRouter } from '../features/progress/progress.router';
import { t } from './trpc.util';

export const appRouter = t.router({
  progress: progressRouter,
});

export type AppRouter = typeof appRouter;
