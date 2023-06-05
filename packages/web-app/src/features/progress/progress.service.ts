import { createQuery } from '@tanstack/solid-query';
import { trpc } from '../../services/trpc.util';
import { queryClient } from '../../services/queryClient.util';

const progressQueryKey = ['progress'];

export const createGetProgress = () => {
  return createQuery({
    queryFn: () => trpc.progress.get.query(),
    queryKey: () => progressQueryKey,
  });
};

export const registerGuess = async (
  input: Parameters<typeof trpc.progress.guess.mutate>[0],
) => {
  try {
    await trpc.progress.guess.mutate(input);
  } catch (err) {
    console.error('Error registering guess', err);
  }

  queryClient.invalidateQueries(progressQueryKey);
};
