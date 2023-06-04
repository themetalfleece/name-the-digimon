import { Component, Switch, Match } from 'solid-js';
import { Text } from '../../lib/Text/Text.component';
import { createQuery } from '@tanstack/solid-query';
import { trpc } from '../../api/trpc.util';

export const ProgressSummary: Component = () => {
  const query = createQuery({
    queryFn: () => trpc.progress.get.query(),
    queryKey: () => ['progress'],
  });

  return (
    <Switch>
      <Match when={query.isLoading}>
        <span />
      </Match>
      <Match when={query.isError}>
        <p>Error loading progress</p>
      </Match>
      <Match when={query.data}>
        <Text fontSize={20} color="info" textAlign="center">
          Correct guesses: {query.data!.correctGuesses}/
          {query.data!.totalGuesses} ({query.data!.correctGuessPercentage}
          %)
          <br />
          {query.data!.digimonRemaining} Digimon Remaining!
        </Text>
      </Match>
    </Switch>
  );
};
