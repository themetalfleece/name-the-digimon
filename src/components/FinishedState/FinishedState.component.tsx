import { Component, Show } from "solid-js";
import { useRound } from "../../features/round/round.store";
import { Text } from "../../lib/Text/Text.component";
import { Button } from "../../lib/Button/Button.component";

export const FinishedState: Component = () => {
  const { round, nextRound } = useRound();

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
    </Show>
  );
};
