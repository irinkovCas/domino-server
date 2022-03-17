import { Domino } from '../Domino';
import { IStateController, State } from './IStateController';

class DealController implements IStateController {
    private readonly DEAL_DELAY = 6_000;

    private domino: Domino;
    private timer: NodeJS.Timeout;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        this.domino.game.deal();

        this.domino.game.players.forEach((player) => {
            this.domino.room.send(player.name, 'deal', { tiles: player.tiles });
        });

        this.timer = setTimeout(
            () => {
                this.domino.transition(State.PlayTile);
            },
            this.DEAL_DELAY,
        );
    }

    public destroy(): void {
        clearTimeout(this.timer);
    }
}

export { DealController };
