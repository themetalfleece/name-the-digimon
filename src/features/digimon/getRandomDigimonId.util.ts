import { maxId, minId } from './digimonStats.constants';

export const getRandomDigimonId = (ignoreIds: number[] = []) => {
  const ignoredSorted = ignoreIds.concat().sort(function (a, b) {
    return a - b;
  });

  const logicalMax = maxId - ignoredSorted.length;
  let randomNumber =
    Math.floor(Math.random() * (logicalMax - minId + 1)) + minId;

  for (let i = 0; i < ignoredSorted.length; i++) {
    if (randomNumber >= ignoredSorted[i]) {
      randomNumber++;
    }
  }

  return randomNumber;
};
