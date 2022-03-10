import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';

class StartRoundController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.reset();

        this.domino.room.sendAll('start_round', { dominoSet: /* ... */ });

        this.domino.transition(State.Deal);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { StartRoundController };
