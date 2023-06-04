import { Component, Switch, Match } from 'solid-js';
import { Text } from '../../lib/Text/Text.component';
import { createGetProgress } from '../../features/progress/progress.api';

export const ProgressSummary: Component = () => {
  const progressQuery = createGetProgress();

  return (
    <Switch>
      <Match when={progressQuery.isLoading}>
        <span />
      </Match>
      <Match when={progressQuery.isError}>
        <p>Error loading progress</p>
      </Match>
      <Match when={progressQuery.data}>
        <Text fontSize={20} color="info" textAlign="center">
          Correct guesses: {progressQuery.data!.correctGuesses}/
          {progressQuery.data!.totalGuesses} (
          {progressQuery.data!.correctGuessPercentage}
          %)
          <br />
          {progressQuery.data!.digimonRemaining} Digimon Remaining!
        </Text>
      </Match>
    </Switch>
  );
};
