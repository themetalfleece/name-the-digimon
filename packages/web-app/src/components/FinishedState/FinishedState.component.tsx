import { Component, Show, onCleanup, onMount } from 'solid-js';
import { useRound } from '../../features/round/round.store';
import { Text } from '../../lib/Text/Text.component';
import { Button } from '../../lib/Button/Button.component';
import { DescriptionContainer } from './FinishedState.styles';
import { getWikiUrl } from '../../features/wiki/getWikiUrl.util';

export const FinishedState: Component = () => {
  const { round, nextRound } = useRound();

  onMount(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        nextRound();
      }
    };

    window.addEventListener('keydown', callback);

    onCleanup(() => window.removeEventListener('keydown', callback));
  });

  return (
    <Show when={round.state === 'won' || round.state === 'lost'}>
      <Show when={round.state === 'won'}>
        <Text fontSize={28} color="success">
          Correct!
        </Text>
      </Show>
      <Show when={round.state === 'lost'}>
        <Text fontSize={28} color="error">
          Incorrect!
        </Text>
      </Show>

      <Button variant="success" onClick={nextRound}>
        Continue
      </Button>

      <Text fontSize={26}>
        #{round.digimon?.id} - {round.digimon?.level || 'Unknown level'}
      </Text>

      <Show when={round.digimon?.description}>
        <DescriptionContainer>
          <Text fontSize={16} textAlign="justify">
            {round.digimon!.description}
          </Text>
        </DescriptionContainer>
      </Show>

      <a target="_blank" href={getWikiUrl(round.digimon?.name ?? '')}>
        <Button variant="info">Wiki</Button>
      </a>
    </Show>
  );
};
