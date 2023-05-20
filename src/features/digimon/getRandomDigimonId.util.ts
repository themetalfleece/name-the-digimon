import { maxId, minId } from "./digimonStats.constants";

export const getRandomDigimonId = () => {
  return Math.floor(Math.random() * maxId) + minId;
};
