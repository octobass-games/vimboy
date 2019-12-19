import createPickup from "../entities/pickups/EntityPickup";

import { CELL_SIZE, GAP_COUNT } from "../../constants/game";

import createWordTypeEnemy from "../entities/enemies/WordTypeEnemy";
import Random from "../utils/Random";

export const generatePresent = () => {
  window.scene.entityManager.createNonEnemy(() =>
    createPickup(-CELL_SIZE * 8, Random.getRandomInt(5, GAP_COUNT))
  );
};

export const generateEnemy = (
  n: number = Random.getRandomInt(5, GAP_COUNT)
) => {
  printWord(["boom"], n);
};

export const printWord = (words: string[], line?: number, x?: number) => {
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

export const printText = (text: string[]) => {
  text.forEach((text, index) => {
    window.scene.time.addEvent({
      delay: index * 1000,
      callback: () => {
        printWord([text], index);
      }
    });
  });
};
