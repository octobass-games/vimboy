import Action from './Action';

class MoveToTop implements Action {
    act() {
        window.scene.vimboy.movement!.jumpToLine(1, window.scene.vimboy.vimboy!);
    }
}

export default MoveToTop;
