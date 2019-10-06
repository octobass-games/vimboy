import Action from './Action';

class DeleteLine implements Action {
    act(context: any) {
        console.log('deleting line');
    }
}

export default DeleteLine;
