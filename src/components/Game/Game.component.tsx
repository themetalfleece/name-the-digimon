import { Component, Show } from "solid-js";
import { Container, DigimonAvatar, Header } from "./Game.styles";
import { useRound } from "../../features/round/round.store";
import { OnScreenKeyboard } from "../../lib/OnScreenKeyboard/OnScreenKeyboard.component";
import { Text } from "../../lib/Text/Text.component";
import { maxFailedAttempts } from "../../features/round/round.constants";
import { GuessingName } from "../GuessingName/GuessingName.component";

export const Game: Component = () => {
  const { round, selectLetter } = useRound();

  return (
    <Container>
      <Header>Name the Digimon</Header>
      <Show
        when={round.digimon && round.state !== "init"}
        fallback={<h2>Loading...</h2>}
      >
        <DigimonAvatar
          src={round.digimon!.imageUrl}
          alt="Image of the Digimon to find"
        />

        <GuessingName />

        <OnScreenKeyboard
          disabledLetters={round.guessedLetters}
          onLetterSelected={selectLetter}
        />

        <Text
          color={round.remainingAttempts > 1 ? "success" : "error"}
          fontSize={28}
        >
          Security: {round.remainingAttempts}/{maxFailedAttempts}
        </Text>
      </Show>
    </Container>
  );
};
