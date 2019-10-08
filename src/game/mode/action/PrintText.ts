import Action from './Action';
import { TextTypes } from '../../TextCreator';
import { CELL_SIZE, PLAY_ZONE_HEIGHT } from '../../../constants/game';

class PrintText implements Action {
    act() {
      window.scene.textCreator.add(
        window.scene.vimboy.vimboy!.x,
        window.scene.vimboy.vimboy!.y - CELL_SIZE / 2,
        window.key,
        PLAY_ZONE_HEIGHT / (window.scene.vimboy.vimboy!.y - CELL_SIZE / 2),
        100,
        TextTypes.ATTACK
      );
    }
}

export default PrintText;
