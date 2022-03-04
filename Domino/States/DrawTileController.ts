import { Domino } from '../Domino';
import { Direction, Move } from '../Entities/Move';
import { Tile } from '../Entities/Tile';
import { GameEvent } from '../Events';
import { IStateController, State } from './IStateController';

class DrawTileController implements IStateController {
    private domino: Domino;

    private tilesDrawn: Tile[];
    private someValidMove = false;

    public constructor(domino: Domino) {
        this.domino = domino;
    }

    public start(): void {
        console.log('DrawTileController - start');
        // Don't go in a DrawTile state if there are no tiles left
        this.domino.game.drawTiles();
        this.domino.room.send(
            this.domino.game.currentPlayer().name,
            GameEvent.TILE_DRAW_NOTIFICATION,
            { tiles: this.tilesDrawn }, // could be 1 or more tiles
        );

        if (!this.someValidMove) {
            this.domino.game.nextPlayer();
        }

        this.domino.transition(State.PlayTile);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { DrawTileController };
