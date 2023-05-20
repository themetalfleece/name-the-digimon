import { Component } from "solid-js";
import { Container, LetterButton } from "./OnScreenKeyboard.styles";

export interface OnScreenKeyboardProps {}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export const OnScreenKeyboard: Component<OnScreenKeyboardProps> = () => {
  return (
    <Container>
      {alphabet.map((letter) => (
        <LetterButton>{letter}</LetterButton>
      ))}
    </Container>
  );
};
