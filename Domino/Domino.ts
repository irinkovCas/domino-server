import { GameRoom } from '../CommunicationLayer/SocketManager';
import { Game } from './Game';
import { DealController } from './States/DealController';
import { DrawTileController } from './States/DrawTileController';
import { EndRoundController } from './States/EndRoundController';
import { IStateController, State } from './States/IStateController';
import { PlayTileController } from './States/PlayTileController';
import { StartRoundController } from './States/StartRoundController';

class Domino {
    /* private */ public game: Game;
    private controller: IStateController;
    private state: State;

    /* private */ public room: GameRoom;

    private endCallback: () => void;

    public constructor(room: GameRoom, onEnd: () => void) {
        this.room = room;
        this.game = new Game(room.players());
        this.endCallback = onEnd;
    }

    public start(): void {
        this.transition(State.StartRound);
    }

    public transition(next: State): void {
        this.controller?.destroy();

        switch (next) {
            case State.StartRound:
                this.controller = new StartRoundController(this);
                break;
            case State.Deal:
                this.controller = new DealController(this);
                break;
            case State.PlayTile:
                this.controller = new PlayTileController(this);
                break;
            case State.DrawTile:
                this.controller = new DrawTileController(this);
                break;
            case State.EndRound:
                this.controller = new EndRoundController(this);
                break;
        }

        this.controller.start();
    }

    public close(): void {
        this.room.close();
    }
}

export { Domino };
