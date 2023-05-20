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
  nextRound: () => void;
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
    setRound("state", "init");

    const digimon = {
      id: 946,
      name: "Garurumon",
      imageUrl: "https://digimon-api.com/images/digimon/w/Garurumon.png",
      description: `Covered in blue, white, and silver-colored fur, it is a Beast Digimon with an appearance resembling a wolf. That fur is as hard as "Mithril", which is said to be a legendary rare metal, and since the blades growing from the tips of its shoulders have sharp edges, anything that touches them is cut to pieces. As it possesses a furious combat instinct and muscles honed in freezing lands, as well as carnivore-like agility and the accuracy to reliably bring down its targets, it is a being feared by other Digimon. However, it is extremely intelligent, and it faithfully obeys those whom it recognizes as its master or leader. Its Special Move is blue, high-temperature flames spewed from its mouth (Fox Fire).`,
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

    if (isLetterFound) {
      setRound("obscurifiedName", obscurifiedName);
    } else {
      setRound((currentRound) => ({
        failedAttempts: currentRound.failedAttempts + 1,
        remainingAttempts: currentRound.remainingAttempts - 1,
      }));
    }

    setRound({
      guessedLetters: [...round.guessedLetters, letter.toLowerCase()],
    });

    if (round.remainingAttempts <= 0) {
      setRound({
        state: "lost",
      });
    }

    const isWon = round.obscurifiedName.every((entry) => entry.isRevealed);

    if (isWon) {
      setRound({
        state: "won",
      });
    }
  };

  const nextRound = () => {
    if (round.state !== "won" && round.state !== "lost") {
      return;
    }

    playNewDigimon();
  };

  const value: RoundValue = {
    round,
    selectLetter,
    nextRound,
  };

  return (
    <RoundContext.Provider value={value}>
      {props.children}
    </RoundContext.Provider>
  );
};

export const useRound = () => useContext(RoundContext)!;
