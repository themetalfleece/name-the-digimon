import { createQuery } from '@tanstack/solid-query';
import { queryClient, trpc } from '../../services/trpc.util';

const progressQueryKey = ['progress'];

export const createGetProgress = () => {
  return createQuery({
    queryFn: () => trpc.progress.get.query(),
    queryKey: () => progressQueryKey,
  });
};

export const registerGuess = (
  input: Parameters<typeof trpc.progress.guess.mutate>[0],
) => {
  trpc.progress.guess.mutate(input);

  queryClient.invalidateQueries(progressQueryKey);
};
