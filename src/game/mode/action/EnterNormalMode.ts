import Action from './Action';

class EnterNormalMode implements Action {
    act(context: any) {
        context.modeManager.switchToNormal();
    }
}

export default EnterNormalMode;
