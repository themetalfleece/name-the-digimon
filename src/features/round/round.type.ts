import { ObscurifiedName } from "../obsurifiedName/obscurifiedName.type";

export interface Round {
  digimon?: {
    id: number;
    name: string;
    imageUrl: string;
  };
  obscurifiedName: ObscurifiedName;
  guessedLetters: string[];
  failedAttempts: number;
  state: "init" | "playing" | "won" | "lost";
}
