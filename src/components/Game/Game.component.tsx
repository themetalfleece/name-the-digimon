import { Component, For, JSXElement, Show } from "solid-js";
import { Container, DigimonAvatar, Header, NameContainer } from "./Game.styles";
import { useRound } from "../../features/round/round.store";
import { OnScreenKeyboard } from "../OnScreenKeyboard/OnScreenKeyboard.component";

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

        <NameContainer>
          <For each={round.obscurifiedName}>
            {({ letter, isRevealed }): JSXElement => (
              <div style={{ "font-weight": 500 }}>
                {isRevealed ? letter : "_"}
              </div>
            )}
          </For>
        </NameContainer>

        <OnScreenKeyboard />
      </Show>
    </Container>
  );
};
