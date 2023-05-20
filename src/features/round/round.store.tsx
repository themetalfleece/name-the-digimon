import {
  createSignal,
  createContext,
  useContext,
  JSXElement,
  Component,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Round } from "./round.type";
import { getObscurifiedName } from "../obsurifiedName/getObscurifiedName.util";

type RoundValue = {
  round: Round;
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
    state: "init",
  });

  const start = async () => {
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
        digimon,
      });
    }, 1000);
  };

  onMount(() => start());

  const value: RoundValue = {
    round,
  };

  return (
    <RoundContext.Provider value={value}>
      {props.children}
    </RoundContext.Provider>
  );
};

export const useRound = () => useContext(RoundContext)!;
