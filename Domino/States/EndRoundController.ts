import { Domino } from '../Domino';
import { IStateController } from './IStateController';

class EndRoundController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        console.log('EndRoundController - start');
    }

    public destroy(): void {
        throw new Error('Method not implemented.');
    }
}

export { EndRoundController };

