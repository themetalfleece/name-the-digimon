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
import { fetchDigimonById } from '../digimon/fetchDigimon.util';
import { getRandomDigimonId } from '../digimon/getRandomDigimonId.util';
import { getEnglishName } from '../digimon/getEnglishName.util';
import { useProgress } from '../progress/progress.store';
import { registerGuess } from '../progress/progress.api';

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
  const { playedIds } = useProgress();

  const [round, setRound] = createStore<Round>({
    obscurifiedName: [],
    guessedLetters: [],
    failedAttempts: 0,
    remainingAttempts: maxFailedAttempts,
    state: 'init',
  });

  const playNewDigimon = async () => {
    setRound('state', 'init');

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const digimonId = getRandomDigimonId(playedIds());

      try {
        const digimonData = await fetchDigimonById(digimonId);
        const digimon: Round['digimon'] = {
          id: digimonData.id,
          name: getEnglishName(digimonData.name),
          imageUrl: digimonData.images?.[0]?.href || '',
          level: digimonData.levels?.[0]?.level || '',
          description: digimonData.descriptions?.find(
            ({ language }: { language: string }) => language === 'en_us',
          )?.description,
        };

        setRound({
          state: 'playing',
          obscurifiedName: getObscurifiedName(digimon.name),
          guessedLetters: [],
          failedAttempts: 0,
          remainingAttempts: maxFailedAttempts,
          digimon,
        });

        return;
      } catch (err) {
        console.error(`Error fetching Digimon data for id ${digimonId}`, err);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
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

  const selectLetter: RoundValue['selectLetter'] = (letter: string) => {
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

    if (round.remainingAttempts < 0) {
      setRound({
        state: 'lost',
      });

      registerGuess({
        digimonId: round.digimon.id,
        isCorrect: false,
      });
    }

    const isWon = round.obscurifiedName.every(entry => entry.isRevealed);

    if (isWon) {
      setRound({
        state: 'won',
      });

      registerGuess({
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
