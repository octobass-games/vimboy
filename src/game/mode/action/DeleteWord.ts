import Action from "./Action";
import VimBoy from "../../VimBoy";

class DeleteWord implements Action {
  act(): void {
    const vimboy: VimBoy = window.scene.vimboy;
    const currentLine: number = vimboy.currentLine();

    const word = window.scene.entityManager.getFirstWordOnLine(currentLine - 1);
    if (word) {
      window.scene.entityManager.destroyEnemy(word);
    }
  }
}

export default DeleteWord;
