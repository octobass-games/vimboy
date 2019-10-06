import Mode from './Mode';
import Binding from './binding/Binding';
import EnterInsertMode from './action/EnterInsertMode';

class NormalMode extends Mode {
    private static bindings: Binding[] = [
        new Binding('i', new EnterInsertMode()),
    ];

    constructor() {
        super('normal', '--- NORMAL ---', NormalMode.bindings);
    }

    handle(keyEvent: KeyboardEvent, context: any) {
        const binding: Binding | undefined = this.bindings.find(binding => {
            return binding.key === keyEvent.key;
        });

        binding!.action.act(context);
    }
}

export default NormalMode;
