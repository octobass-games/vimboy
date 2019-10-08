import Mode from './Mode';
import PrintText from './action/PrintText';
import EnterNormalMode from './action/EnterNormalMode';

class InsertMode extends Mode {
    constructor() {
        super('insert', '-- INSERT --');
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        if (keyEvent.key === 'Escape') {
            new EnterNormalMode().act(context);
        } else {
            new PrintText().act(context);
        }
    }
}

export default InsertMode;
