import { Component } from "solid-js";
import { Container, LetterButton } from "./OnScreenKeyboard.styles";

export interface OnScreenKeyboardProps {
  onLetterSelected: (letter: string) => void;
  disabledLetters?: string[];
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export const OnScreenKeyboard: Component<OnScreenKeyboardProps> = (props) => {
  return (
    <Container>
      {alphabet.map((letter) => (
        <LetterButton
          onClick={() => props.onLetterSelected(letter)}
          disabled={props.disabledLetters?.includes(letter)}
        >
          {letter}
        </LetterButton>
      ))}
    </Container>
  );
};
