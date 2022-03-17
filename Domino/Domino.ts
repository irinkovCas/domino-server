/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ClientToServerEvent } from '../commonNotReallyBecauseTheClientIsInC#/ClientToServerEvent';
import { Config } from '../commonNotReallyBecauseTheClientIsInC#/config';
import { ServerToClientEvent } from '../commonNotReallyBecauseTheClientIsInC#/ServerToClientEvent';
import { GameRoom } from '../CommunicationLayer/GameRoom';
import { Game } from './Game';
import { DealController } from './States/DealController';
import { DrawTileController } from './States/DrawTileController';
import { GameEndController } from './States/GameEndController';
import { GameStartController } from './States/GameStartController';
import { IStateController, State } from './States/IStateController';
import { PlayTileController } from './States/PlayTileController';
import { RoundEndController } from './States/RoundEndController';
import { RoundStartController } from './States/RoundStartController';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DominoGameRoom = GameRoom<ClientToServerEvent, ServerToClientEvent>
class Domino {
    public game: Game;
    private controller: IStateController;

    public room: DominoGameRoom;
    public endGameCallback: () => void;

    public constructor(config: Config) {
        this.room = config.room;
        this.game = new Game(config.room.players(), config.gameSettings);
        this.endGameCallback = config.endGameCallback;
    }

    public start(): void {
        this.transition(State.GameStart);
    }

    public transition(next: State): void {
        console.log(`Transitioning from ${this.controller?.constructor.name} to ${next}`);
        this.controller?.destroy();

        switch (next) {
            case State.GameStart:
                this.controller = new GameStartController(this);
                break;
            case State.RoundStart:
                this.controller = new RoundStartController(this);
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
            case State.RoundEnd:
                this.controller = new RoundEndController(this);
                break;
            case State.GameEnd:
                this.controller = new GameEndController(this);
                break;
        }

        this.controller.start();
    }

    public destroy(): void {
        this.controller?.destroy();
        this.room.close();
    }
}

export { Domino, DominoGameRoom };
