import { Domino } from '../Domino';
import { IStateController } from './IStateController';

class GameEndController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.endCallback();
        //
    }

    public destroy(): void {
        //
    }
}


export { GameEndController };
