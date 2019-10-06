import Action from './Action';
import { PLAY_ZONE_HEIGHT, CELL_SIZE } from '../../../constants/game';

class MoveToBottom implements Action {
    act(context: any) {
        context.vimboy.movement.jumpToLine(PLAY_ZONE_HEIGHT / CELL_SIZE, context.vimboy.vimboy);
    }
}

export default MoveToBottom;
