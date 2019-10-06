import Action from './Action';

class MoveToTop implements Action {
    act(context: any) {
        context.vimboy.movement.jumpToLine(1, context.vimboy.vimboy);
    }
}

export default MoveToTop;
