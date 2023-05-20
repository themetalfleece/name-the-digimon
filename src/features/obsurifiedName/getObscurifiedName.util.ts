import { ObscurifiedName } from "./obscurifiedName.type";

export const getObscurifiedName = (name: string): ObscurifiedName => {
  // reveal all but letters
  const obscurifiedName = name.split("").map((letter) => ({
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
      letter.letter === "m" &&
      nextLetter.letter === "o" &&
      nextNextLetter.letter === "n" &&
      (!finalLetter || finalLetter.letter === " ")
    ) {
      letter.isRevealed = true;
      nextLetter.isRevealed = true;
      nextNextLetter.isRevealed = true;
    }
  }

  return obscurifiedName;
};
