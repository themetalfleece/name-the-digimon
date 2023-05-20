import {
  Accessor,
  JSXElement,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from 'solid-js';

type ProgressValue = {
  correctGuesses: Accessor<number>;
  totalGuesses: Accessor<number>;
  playedIds: Accessor<number[]>;
  registerGuess: (id: number, isCorrect: boolean) => void;
};

const ProgressContext = createContext<ProgressValue>();

export interface ProgressProviderProps {
  children: JSXElement;
}

export const ProgressProvider = (props: ProgressProviderProps) => {
  const [correctGuesses, setCorrectGuesses] = createSignal(0);
  const [totalGuesses, setTotalGuesses] = createSignal(0);
  const [playedIds, setPlayedIds] = createSignal<number[]>([]);

  onMount(() => {
    const progressFromLocalStorage = localStorage.getItem('progress');

    if (!progressFromLocalStorage) {
      return;
    }

    const progress = JSON.parse(progressFromLocalStorage);

    setCorrectGuesses(progress.correctGuesses);
    setTotalGuesses(progress.totalGuesses);
    setPlayedIds(progress.playedIds);
  });

  const registerGuess = (id: number, isCorrect: boolean) => {
    setTotalGuesses(existingTotalGuesses => existingTotalGuesses + 1);

    if (isCorrect) {
      setCorrectGuesses(existingCorrectGuesses => existingCorrectGuesses + 1);
    }

    setPlayedIds(existingIds => [...new Set([...existingIds, id])]);
  };

  createEffect(() => {
    localStorage.setItem(
      'progress',
      JSON.stringify({
        correctGuesses: correctGuesses(),
        totalGuesses: totalGuesses(),
        playedIds: playedIds(),
      }),
    );
  });

  const value: ProgressValue = {
    correctGuesses,
    totalGuesses,
    playedIds,
    registerGuess,
  };

  return (
    <ProgressContext.Provider value={value}>
      {props.children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext)!;
