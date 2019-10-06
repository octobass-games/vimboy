import Mode from './Mode';
import Binding from './binding/Binding';

class InsertMode extends Mode {
    private static bindings: Binding[] = [];

    constructor() {
        super('insert', '--- INSERT ---', InsertMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {}
}

export default InsertMode;
