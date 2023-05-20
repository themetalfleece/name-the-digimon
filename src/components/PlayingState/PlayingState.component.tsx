import { Component } from "solid-js";
import { useRound } from "../../features/round/round.store";
import { OnScreenKeyboard } from "../../lib/OnScreenKeyboard/OnScreenKeyboard.component";
import { Text } from "../../lib/Text/Text.component";
import { maxFailedAttempts } from "../../features/round/round.constants";

export const PlayingState: Component = () => {
  const { round, selectLetter } = useRound();

  if (round.state !== "playing") {
    return null;
  }

  return (
    <>
      <OnScreenKeyboard
        disabledLetters={round.guessedLetters}
        onLetterSelected={selectLetter}
      />
      <Text
        color={round.remainingAttempts > 1 ? "success" : "error"}
        fontSize={28}
      >
        Security: {round.remainingAttempts}/{maxFailedAttempts}
      </Text>
    </>
  );
};
