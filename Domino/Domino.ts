import { Config } from '../common/config';
import { Game } from './Game';
import { GameRoom } from '../CommunicationLayer/GameRoom';
import { DealController } from './States/DealController';
import { DrawTileController } from './States/DrawTileController';
import { RoundEndController } from './States/RoundEndController';
import { GameEndController } from './States/GameEndController';
import { IStateController, State } from './States/IStateController';
import { PlayTileController } from './States/PlayTileController';
import { StartRoundController } from './States/StartRoundController';

class Domino {
    public game: Game;
    private controller: IStateController;

    public room: GameRoom;

    public endCallback: () => void;

    public constructor(config: Config) {
        this.room = config.room;
        this.game = new Game(config.room.players(), config.gameSettings);
        this.endCallback = config.endGameCallback;
    }

    public start(): void {
        this.transition(State.GameStart);
    }

    public transition(next: State): void {
        console.log(`Transitioning from ${this.controller?.constructor.name} to ${next}`);
        this.controller?.destroy();

        switch (next) {
            case State.GameStart:
                this.controller = new StartRoundController(this);
                break;
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

export { Domino };
