import Action from './Action';
import VimBoy from '../../VimBoy';

class DeleteWord implements Action {
    act(): void {
        const vimboy: VimBoy = window.scene.vimboy;
        const currentLine: number = vimboy.currentLine();

        const word = window.scene.textCreator.getFirstWordOnLine(currentLine - 1);
        if (word) {
            word.body.destroy();
            word.object.destroy();
        }
    }
}

export default DeleteWord;
