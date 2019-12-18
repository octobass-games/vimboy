import createPickup from "../entities/pickups/EntityPickup";

import { CELL_SIZE } from "../../constants/game";

import createWordTypeEnemy from "../entities/enemies/WordTypeEnemy";

export const generatePresent = () => {
  window.scene.entityManager.createNonEnemy(() => createPickup(-CELL_SIZE * 8));
};

export const printWord = (words: string[], line: number, x?: number) => {
  window.scene.entityManager.createEnemy(() =>
    createWordTypeEnemy(words, line, -CELL_SIZE * 10, x)
  );
};

export const genericInputUpdater = (
  keyEvent: KeyboardEvent,
  input: string,
  updateInput: (s: string) => void
) => {
  if (keyEvent.key.toLowerCase() === "enter") {
    updateInput("");
  } else {
    updateInput(input + keyEvent.key.toLowerCase());
  }
};
