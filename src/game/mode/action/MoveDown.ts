import Action from './Action';

class MoveDown implements Action {
    act(context: any) {
        context.vimboy.movement.downALine(context.vimboy.vimboy);
    }
}

export default MoveDown;
