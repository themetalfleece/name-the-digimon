import {
  createContext,
  useContext,
  JSXElement,
  Component,
  onMount,
  createEffect,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Round } from "./round.type";
import { getObscurifiedName } from "../obsurifiedName/getObscurifiedName.util";
import { maxFailedAttempts } from "./round.constants";

type RoundValue = {
  round: Round;
  selectLetter: (letter: string) => void;
};

const RoundContext = createContext<RoundValue>();

export interface RoundProviderProps {
  children: JSXElement;
}

export const RoundProvider: Component<RoundProviderProps> = (props) => {
  const [round, setRound] = createStore<Round>({
    obscurifiedName: [],
    guessedLetters: [],
    failedAttempts: 0,
    remainingAttempts: maxFailedAttempts,
    state: "init",
  });

  const playNewDigimon = async () => {
    const digimon = {
      id: 946,
      name: "Garurumon",
      imageUrl: "https://digimon-api.com/images/digimon/w/Garurumon.png",
    };

    setTimeout(() => {
      setRound({
        state: "playing",
        obscurifiedName: getObscurifiedName(digimon.name),
        guessedLetters: [],
        failedAttempts: 0,
        remainingAttempts: maxFailedAttempts,
        digimon,
      });
    }, 1000);
  };

  onMount(() => {
    const roundFromLocalStorage = localStorage.getItem("round");

    if (roundFromLocalStorage) {
      setRound(JSON.parse(roundFromLocalStorage));
      return;
    }

    playNewDigimon();
  });

  createEffect(() => {
    localStorage.setItem("round", JSON.stringify(round));
  });

  const selectLetter: RoundValue["selectLetter"] = (letter: string) => {
    if (round.state !== "playing") {
      return;
    }

    if (round.guessedLetters.includes(letter)) {
      return;
    }

    let isLetterFound = false;

    const obscurifiedName = round.obscurifiedName.map((entry) => {
      if (
        entry.isRevealed ||
        entry.letter.toLowerCase() !== letter.toLowerCase()
      ) {
        return entry;
      }

      isLetterFound = true;

      return {
        ...entry,
        isRevealed: true,
      };
    });

    setRound("obscurifiedName", obscurifiedName);

    setRound({
      guessedLetters: [...round.guessedLetters, letter.toLowerCase()],
    });

    if (!isLetterFound) {
      setRound((currentRound) => ({
        failedAttempts: currentRound.failedAttempts + 1,
        remainingAttempts: currentRound.remainingAttempts - 1,
      }));
    }

    if (round.remainingAttempts <= 0) {
      setRound({
        state: "lost",
      });
    }
  };

  const value: RoundValue = {
    round,
    selectLetter,
  };

  return (
    <RoundContext.Provider value={value}>
      {props.children}
    </RoundContext.Provider>
  );
};

export const useRound = () => useContext(RoundContext)!;
