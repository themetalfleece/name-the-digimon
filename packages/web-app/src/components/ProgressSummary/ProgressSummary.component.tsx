import { Component } from 'solid-js';
import { useProgress } from '../../features/progress/progress.store';
import { totalDigimon } from '../../features/digimon/digimonStats.constants';
import { Text } from '../../lib/Text/Text.component';

export const ProgressSummary: Component = () => {
  const { correctGuesses, totalGuesses, playedIds } = useProgress();

  const digimonLeft = () => totalDigimon - playedIds().length;
  const guessPercentage = () =>
    Math.round((correctGuesses() / totalGuesses() || 0) * 100);

  return (
    <Text fontSize={20} color="info" textAlign="center">
      Correct guesses: {correctGuesses()}/{totalGuesses()} ({guessPercentage()}
      %)
      <br />
      {digimonLeft()} Digimon left!
    </Text>
  );
};