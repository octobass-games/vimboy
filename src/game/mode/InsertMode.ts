import Mode from './Mode';
import Binding from './binding/Binding';
import PrintText from './action/PrintText';

class InsertMode extends Mode {
    private static bindings: Binding[] = [
        new Binding('any', new PrintText()),
    ];

    constructor() {
        super('insert', '--- INSERT ---', InsertMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        InsertMode.bindings[0].action.act(context);
    }
}

export default InsertMode;
