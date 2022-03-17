import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';

class RoundStartController implements IStateController {
    private domino: Domino;
    private timer: NodeJS.Timeout;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.reset();
        this.domino.room.sendAll('round_start', { dominoSet: this.domino.game.dominoSet.getSize() });

        this.timer = setTimeout(() => {
            this.domino.transition(State.Deal);
        }, 1_000);
    }

    public destroy(): void {
        clearTimeout(this.timer);
    }
}

export { RoundStartController };
