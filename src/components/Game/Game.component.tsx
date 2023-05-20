import { Component, Show } from "solid-js";
import { Container, DigimonAvatar, Header } from "./Game.styles";
import { useRound } from "../../features/round/round.store";
import { OnScreenKeyboard } from "../OnScreenKeyboard/OnScreenKeyboard.component";
import { Text } from "../Text/Text.component";
import { maxFailedAttempts } from "../../features/round/round.constants";
import { GuessingName } from "../GuessingName/GuessingName.component";

export const Game: Component = () => {
  const { round } = useRound();

  return (
    <Container>
      <Header>Name the Digimon</Header>
      <Show when={round.digimon} fallback={<h2>Loading...</h2>}>
        <DigimonAvatar
          src={round.digimon?.imageUrl}
          alt="Image of the Digimon to find"
        />

        <GuessingName />

        <OnScreenKeyboard />

        <Text
          color={round.remainingAttempts === 1 ? "error" : "success"}
          fontSize={28}
        >
          Security: {round.remainingAttempts}/{maxFailedAttempts}
        </Text>
      </Show>
    </Container>
  );
};
