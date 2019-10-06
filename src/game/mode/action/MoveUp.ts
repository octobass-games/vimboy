import Action from './Action';

class MoveUp implements Action {
    act(context: any) {
        context.vimboy.movement.upALine(context.vimboy.vimboy);
    }
}

export default MoveUp;
