import Action from './Action';

class EnterCommandMode implements Action {
    act(context: any) {
        context.modeManager.switchToCommand();
    }
}

export default EnterCommandMode;
