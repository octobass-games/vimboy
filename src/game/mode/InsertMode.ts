import Mode from './Mode';
import PrintText from './action/PrintText';
import EnterNormalMode from './action/EnterNormalMode';

class InsertMode extends Mode {
    constructor() {
        super('insert', '--- INSERT ---');
    }

    handle(keyEvent: KeyboardEvent) {
        if (keyEvent.key === 'Escape') {
            new EnterNormalMode().act();
        } else {
            new PrintText().act();
        }
    }
}

export default InsertMode;
