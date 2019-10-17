import Action from "./Action";
import VimBoy from "../../VimBoy";
import { PowerUp } from "../../PowerUpManager";

class DeleteWord implements Action {
  act(): void {
    window.scene.powerUpManager.usePowerUp(PowerUp.DELETE_WORD, () => {
      const vimboy: VimBoy = window.scene.vimboy;
      const currentLine: number = vimboy.currentLine();

      const word = window.scene.entityManager.getFirstWordOnLine(
        currentLine - 1
      );
      if (word) {
        window.scene.entityManager.destroyEnemy(word);
      }
    });
  }
}

export default DeleteWord;
