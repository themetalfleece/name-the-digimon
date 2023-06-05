import {
  createContext,
  useContext,
  JSXElement,
  Component,
  onMount,
  createEffect,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Round } from './round.type';
import { getObscurifiedName } from '../obsurifiedName/getObscurifiedName.util';
import { maxFailedAttempts } from './round.constants';
import { registerGuess } from '../progress/progress.service';
import { createQuery } from '@tanstack/solid-query';
import { trpc } from '../../services/trpc.util';
import { digimonQueryKey } from '../digimon/digimon.service';

type RoundValue = {
  round: Round;
  selectLetter: (letter: string) => void;
  nextRound: () => void;
};

const RoundContext = createContext<RoundValue>();

export interface RoundProviderProps {
  children: JSXElement;
}

export const RoundProvider: Component<RoundProviderProps> = props => {
  const [round, setRound] = createStore<Round>({
    obscurifiedName: [],
    guessedLetters: [],
    failedAttempts: 0,
    remainingAttempts: maxFailedAttempts,
    state: 'init',
  });

  const digimonQuery = createQuery({
    queryFn: () => trpc.digimon.getRandom.query(),
    queryKey: () => digimonQueryKey,
    retry: true,
    retryDelay: (retryAttempt: number) => Math.min(retryAttempt * 1000, 7000),
    get enabled() {
      return round.state === 'fetching';
    },
  });

  createEffect(() => {
    if (!digimonQuery.data || !digimonQuery.dataUpdatedAt) {
      return;
    }

    const digimon: Round['digimon'] = {
      id: digimonQuery.data.id,
      name: digimonQuery.data.name,
      imageUrl: digimonQuery.data.imageUrl,
      level: digimonQuery.data.level,
      description: digimonQuery.data.description,
    };

    setRound({
      state: 'playing',
      obscurifiedName: getObscurifiedName(digimon.name),
      guessedLetters: [],
      failedAttempts: 0,
      remainingAttempts: maxFailedAttempts,
      digimon,
    });
  });

  const playNewDigimon = async () => {
    setRound('state', 'fetching');
  };

  onMount(() => {
    const roundFromLocalStorage = localStorage.getItem('round');

    if (roundFromLocalStorage) {
      setRound(JSON.parse(roundFromLocalStorage));

      if (round.state !== 'init') {
        return;
      }
    }

    playNewDigimon();
  });

  createEffect(() => {
    localStorage.setItem('round', JSON.stringify(round));
  });

  const selectLetter: RoundValue['selectLetter'] = async (letter: string) => {
    if (round.state !== 'playing' || !round.digimon) {
      return;
    }

    if (round.guessedLetters.includes(letter)) {
      return;
    }

    let isLetterFound = false;

    const obscurifiedName = round.obscurifiedName.map(entry => {
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
      setRound('obscurifiedName', obscurifiedName);
    } else {
      setRound(currentRound => ({
        failedAttempts: currentRound.failedAttempts + 1,
        remainingAttempts: currentRound.remainingAttempts - 1,
      }));
    }

    setRound({
      guessedLetters: [...round.guessedLetters, letter.toLowerCase()],
    });

    if (round.remainingAttempts <= 0) {
      setRound({
        state: 'lost',
      });

      await registerGuess({
        digimonId: round.digimon.id,
        isCorrect: false,
      });
    }

    const isWon = round.obscurifiedName.every(entry => entry.isRevealed);

    if (isWon) {
      setRound({
        state: 'won',
      });

      await registerGuess({
        digimonId: round.digimon.id,
        isCorrect: true,
      });
    }
  };

  const nextRound = () => {
    if (round.state !== 'won' && round.state !== 'lost') {
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
