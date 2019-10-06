import Action from './Action';
import { TextTypes } from '../../TextCreator';
import { CELL_SIZE, PLAY_ZONE_HEIGHT } from '../../../constants/game';

class PrintText implements Action {
    act(context: any) {
      window.scene.textCreator.add(
        context.vimboy.vimboy.x,
        context.vimboy.vimboy.y - CELL_SIZE / 2,
        context.key,
        PLAY_ZONE_HEIGHT / (context.vimboy.vimboy.y - CELL_SIZE / 2),
        100,
        TextTypes.ATTACK
      );
    }
}

export default PrintText;
