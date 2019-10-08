import Action from './Action';

class DeleteLine implements Action {
    act() {
        console.log('deleting line');
    }
}

export default DeleteLine;
