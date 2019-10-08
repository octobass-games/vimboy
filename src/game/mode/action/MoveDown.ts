import Action from './Action';

class MoveDown implements Action {
    act() {
        window.scene.vimboy.movement!.downALine(window.scene.vimboy.vimboy!);
    }
}

export default MoveDown;
