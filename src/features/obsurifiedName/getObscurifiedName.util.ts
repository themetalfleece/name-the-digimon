import { ObscurifiedName } from "./obscurifiedName.type";

export const getObscurifiedName = (name: string): ObscurifiedName => {
  return name.split("").map((letter) => ({
    letter,
    isRevealed: Math.random() > 0.5,
  }));
};
