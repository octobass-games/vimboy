import Action from './Action';

class MoveUp implements Action {
    act() {
        window.scene.vimboy.movement!.upALine(window.scene.vimboy.vimboy!);
    }
}

export default MoveUp;
