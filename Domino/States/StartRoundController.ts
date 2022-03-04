import { Domino } from '../Domino';
import { GameEvent } from '../Events';
import { IStateController, State } from './IStateController';

class StartRoundController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.room.sendAll(GameEvent.START, { players: this.domino.game.players.map((p) => p.name) });
        this.domino.transition(State.Deal);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { StartRoundController };
