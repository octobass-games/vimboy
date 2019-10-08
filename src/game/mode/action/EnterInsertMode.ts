import Action from './Action';

class EnterInsertMode implements Action {
    act() {
        window.scene.modeManager.switchToInsert();
    }
}

export default EnterInsertMode;
