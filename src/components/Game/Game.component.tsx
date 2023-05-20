import { Component, For, JSXElement } from "solid-js";
import { Container, DigimonAvatar, Header, NameContainer } from "./Game.styles";

export const Game: Component = () => {
  const imageUrl = "https://digimon-api.com/images/digimon/w/Garurumon.png";
  const digimonName = "Beelzemon (X Antibody)";
  const digimonNameData = digimonName.split("").map((letter) => ({
    letter,
    isRevealed: Math.random() > 0.5,
  }));

  console.log(digimonNameData);

  return (
    <Container>
      <Header>Name the Digimon</Header>
      <DigimonAvatar src={imageUrl} alt="Image of the Digimon to find" />

      <NameContainer>
        <For each={digimonNameData}>
          {({ letter, isRevealed }): JSXElement => (
            <div>{isRevealed ? letter : "_"}</div>
          )}
        </For>
      </NameContainer>
    </Container>
  );
};
