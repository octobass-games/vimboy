import Action from './Action';
import { PLAY_ZONE_HEIGHT, CELL_SIZE } from '../../../constants/game';

class MoveToBottom implements Action {
    act() {
        window.scene.vimboy.movement!.jumpToLine(PLAY_ZONE_HEIGHT / CELL_SIZE, window.scene.vimboy.vimboy!);
    }
}

export default MoveToBottom;
