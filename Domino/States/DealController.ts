import { Domino } from '../Domino';
import { Event } from '../Events';
import { IStateController, State } from './IStateController';

class DealController implements IStateController {
    private readonly DEAL_DELAY = 500;

    private domino: Domino;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.deal();

        this.domino.game.players.forEach((player) => {
            this.domino.room.send(player.name, Event.Deal, { tiles: player.tiles });
        });

        setTimeout(
            () => {
                this.domino.transition(State.PlayTile);
            },
            this.DEAL_DELAY,
        );
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { DealController };
