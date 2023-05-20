import { For, JSXElement } from "solid-js";
import { useRound } from "../../features/round/round.store";
import { Letter, NameContainer } from "./GuessingName.styles";

export const GuessingName = () => {
  const { round } = useRound();

  return (
    <NameContainer>
      <For each={round.obscurifiedName}>
        {({ letter, isRevealed }): JSXElement => (
          <Letter>{isRevealed ? letter : "_"}</Letter>
        )}
      </For>
    </NameContainer>
  );
};
