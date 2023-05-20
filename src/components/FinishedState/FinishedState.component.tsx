import { Component, Show, onMount } from "solid-js";
import { useRound } from "../../features/round/round.store";
import { Text } from "../../lib/Text/Text.component";
import { Button } from "../../lib/Button/Button.component";
import { DescriptionContainer } from "./FinishedState.styles";

export const FinishedState: Component = () => {
  const { round, nextRound } = useRound();

  onMount(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        nextRound();
      }
    };

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
  });

  return (
    <Show when={round.state === "won" || round.state === "lost"}>
      <Show when={round.state === "won"}>
        <Text fontSize={28} color="success">
          Correct!
        </Text>
      </Show>
      <Show when={round.state === "lost"}>
        <Text fontSize={28} color="error">
          Incorrect!
        </Text>
      </Show>

      <Button onClick={nextRound}>Continue</Button>

      <Text fontSize={26}>#946 - Adult</Text>

      <Show when={round.digimon?.description}>
        <DescriptionContainer>
          <Text fontSize={16} textAlign="justify">
            {round.digimon!.description}
          </Text>
        </DescriptionContainer>
      </Show>
    </Show>
  );
};
