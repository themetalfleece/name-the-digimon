import { digimonRouter } from '../features/digimon/digimon.router';
import { progressRouter } from '../features/progress/progress.router';
import { t } from './trpc.util';

export const appRouter = t.router({
  progress: progressRouter,
  digimon: digimonRouter,
});

export type AppRouter = typeof appRouter;
