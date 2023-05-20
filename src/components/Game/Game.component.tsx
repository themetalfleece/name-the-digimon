import { Component, Show } from "solid-js";
import { Container, DigimonAvatar, Header } from "./Game.styles";
import { useRound } from "../../features/round/round.store";
import { GuessingName } from "../GuessingName/GuessingName.component";
import { PlayingState } from "../PlayingState/PlayingState.component";

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

        <PlayingState />
      </Show>
    </Container>
  );
};
