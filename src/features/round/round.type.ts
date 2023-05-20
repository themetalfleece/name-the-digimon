import { ObscurifiedName } from "../obsurifiedName/obscurifiedName.type";

export interface Round {
  digimon?: {
    id: number;
    name: string;
    imageUrl: string;
    description?: string;
  };
  obscurifiedName: ObscurifiedName;
  guessedLetters: string[];
  failedAttempts: number;
  remainingAttempts: number;
  state: "init" | "playing" | "won" | "lost";
}
