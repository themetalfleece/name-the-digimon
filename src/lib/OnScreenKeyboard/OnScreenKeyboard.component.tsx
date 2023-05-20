import { Component, onMount, For } from 'solid-js';
import { Container, LetterButton } from './OnScreenKeyboard.styles';

export interface OnScreenKeyboardProps {
  onLetterSelected: (letter: string) => void;
  disabledLetters?: string[];
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const OnScreenKeyboard: Component<OnScreenKeyboardProps> = props => {
  onMount(() => {
    const callback = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (alphabet.includes(key)) {
        props.onLetterSelected(key);
      }
    };

    window.addEventListener('keydown', callback);

    return () => window.removeEventListener('keydown', callback);
  });

  return (
    <Container>
      <For each={alphabet}>
        {letter => (
          <LetterButton
            onClick={() => props.onLetterSelected(letter)}
            disabled={props.disabledLetters?.includes(letter)}
          >
            {letter}
          </LetterButton>
        )}
      </For>
    </Container>
  );
};
