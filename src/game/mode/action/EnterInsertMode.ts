import Action from './Action';

class EnterInsertMode implements Action {
    act(context: any) {
        context.modeManager.switchToInsert();
    }
}

export default EnterInsertMode;
