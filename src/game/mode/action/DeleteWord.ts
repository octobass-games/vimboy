import Action from "./Action";
import VimBoy from "../../VimBoy";
import { Enemy } from "../../entities/Entity";

class DeleteWord implements Action {
  act(): void {
    const vimboy: VimBoy = window.scene.vimboy;
    const currentLine: number = vimboy.currentLine();

    const word = window.scene.entityManager.getFirstWordOnLine(currentLine - 1);

    if (word) {
      const data = word.getData("data") as Enemy;

      window.scene.scoreBoard.updateScore(data.words[0].length);
      if (data.words.length === 1) {
        window.scene.entityManager.destroyEnemy(word);
      } else {
        const [, ...newWords] = data.words;

        const newData: Enemy = {
          ...data,
          words: newWords
        };

        word.setData("data", newData);
        word.setText(newWords.join(""));
      }
    }
  }
}

export default DeleteWord;
