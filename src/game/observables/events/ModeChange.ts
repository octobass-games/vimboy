import Event from '../Event';
import Mode from '../../mode/Mode';

class ModeChange extends Event {
    public mode: Mode;

    constructor(mode: Mode) {
        super();

        this.mode = mode;
    }
}

export default ModeChange;
