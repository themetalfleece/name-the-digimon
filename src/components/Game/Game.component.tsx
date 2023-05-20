import { Component, For, JSXElement } from "solid-js";
import { Container, DigimonAvatar, Header, NameContainer } from "./Game.styles";
import { getObscurifiedName } from "../../features/obsurifiedName/getObscurifiedName.util";

export const Game: Component = () => {
  const imageUrl = "https://digimon-api.com/images/digimon/w/Garurumon.png";
  const digimonName = "Beelzemon (X Antibody)";
  const obscurifiedName = getObscurifiedName(digimonName);

  return (
    <Container>
      <Header>Name the Digimon</Header>
      <DigimonAvatar src={imageUrl} alt="Image of the Digimon to find" />

      <NameContainer>
        <For each={obscurifiedName}>
          {({ letter, isRevealed }): JSXElement => (
            <div>{isRevealed ? letter : "_"}</div>
          )}
        </For>
      </NameContainer>
    </Container>
  );
};
