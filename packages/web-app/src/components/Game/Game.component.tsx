import { Component, Show } from 'solid-js';
import { Container, DigimonAvatar, Divider, Header } from './Game.styles';
import { useRound } from '../../features/round/round.store';
import { GuessingName } from '../GuessingName/GuessingName.component';
import { PlayingState } from '../PlayingState/PlayingState.component';
import { FinishedState } from '../FinishedState/FinishedState.component';
import { ProgressSummary } from '../ProgressSummary/ProgressSummary.component';
import { createQuery } from '@tanstack/solid-query';
import { trpc } from '../../api/trpc.util';

export const Game: Component = () => {
  const { round } = useRound();

  const query = createQuery({
    queryFn: () => trpc.getUserById.query('1'),
    queryKey: () => ['user', '1'],
  });

  return (
    <Container>
      <Header>Name the Digimon</Header>
      <Show
        when={round.digimon && round.state !== 'init'}
        fallback={<h2>Downloading Digimon Data...</h2>}
      >
        <DigimonAvatar
          src={round.digimon!.imageUrl}
          alt="Image of the Digimon to find"
        />

        {query.data?.name}

        <GuessingName />

        <PlayingState />

        <FinishedState />

        <Divider />

        <ProgressSummary />
      </Show>
    </Container>
  );
};
