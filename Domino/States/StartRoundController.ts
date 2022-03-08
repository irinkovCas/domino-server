import { Domino } from '../Domino';
import { Event } from '../Events';
import { IStateController, State } from './IStateController';

class StartRoundController implements IStateController {
    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        const players = this.domino.game.players.map((p) => p.name);
        this.domino.room.sendAll(Event.GameInit, { players });
        this.domino.transition(State.Deal);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { StartRoundController };
