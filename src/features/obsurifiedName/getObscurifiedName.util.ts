import { ObscurifiedName } from './obscurifiedName.type';

export const getObscurifiedName = (name: string): ObscurifiedName => {
  // reveal all but letters
  const obscurifiedName = name.split('').map(letter => ({
    letter,
    isRevealed: !/[A-Za-z]/.test(letter),
  }));

  // reveal "mon" in the end of the Digimon name
  for (let i = 0; i < obscurifiedName.length; i++) {
    const letter = obscurifiedName[i];
    const nextLetter = obscurifiedName[i + 1];
    const nextNextLetter = obscurifiedName[i + 2];
    const finalLetter = obscurifiedName[i + 3];

    if (
      letter.letter === 'm' &&
      nextLetter.letter === 'o' &&
      nextNextLetter.letter === 'n' &&
      (!finalLetter || finalLetter.letter === ' ')
    ) {
      letter.isRevealed = true;
      nextLetter.isRevealed = true;
      nextNextLetter.isRevealed = true;
    }
  }

  // reveal all characters in between parenthesis
  for (
    let currentLetterIndex = 0;
    currentLetterIndex < obscurifiedName.length;
    currentLetterIndex++
  ) {
    const letter = obscurifiedName[currentLetterIndex];

    if (letter.letter !== '(') {
      continue;
    }

    let closingParenthesisIndex = -1;
    for (
      let targetIndex = currentLetterIndex + 1;
      targetIndex < obscurifiedName.length;
      targetIndex++
    ) {
      const nextLetter = obscurifiedName[targetIndex];

      if (nextLetter.letter === ')') {
        closingParenthesisIndex = targetIndex;
        break;
      }
    }

    if (closingParenthesisIndex === 1) {
      continue;
    }

    for (let j = currentLetterIndex; j <= closingParenthesisIndex; j++) {
      const nextLetter = obscurifiedName[j];

      nextLetter.isRevealed = true;
    }
  }

  return obscurifiedName;
};
