import Mode from './Mode';
import Binding from './binding/Binding';
import PrintText from './action/PrintText';
import EnterNormalMode from './action/EnterNormalMode';

class InsertMode extends Mode {
    private static bindings: Binding[] = [
        new Binding('any', new PrintText()),
        new Binding('escape', new EnterNormalMode()),
    ];

    constructor() {
        super('insert', '--- INSERT ---', InsertMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        if (keyEvent.key !== 'Escape') {
            InsertMode.bindings[0].action.act(context);
        } else {
            InsertMode.bindings[1].action.act(context);
        }
    }
}

export default InsertMode;
