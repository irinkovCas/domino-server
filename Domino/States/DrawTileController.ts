import { Domino } from '../Domino';
import { Player } from '../Entities/Player';
import { Tile } from '../Entities/Tile';
import { Event } from '../Events';
import { IStateController, State } from './IStateController';

class DrawTileController implements IStateController {
    private domino: Domino;
    private player: Player;

    public constructor(domino: Domino) {
        this.domino = domino;
        this.player = this.domino.game.getCurrentPlayer();
    }

    public start(): void {
        console.log('DrawTileController - start');

        const tiles = this.domino.game.drawUntilPlayable();

        this.player.tiles.push(...tiles);
        this.domino.room.send(
            this.player.name,
            Event.TileDraw,
            { player: this.player.name, tiles }, // could be 1 or more tiles
        );

        const zeroTile: Tile = { firstPip: 0, secondPip: 0 };
        const zeroTiles: Tile[] = tiles.map((_tile) => zeroTile);

        this.domino.room.sendAllBut(
            this.player.name,
            Event.TileDraw,
            { player: this.player.name, tiles: zeroTiles }, // could be 1 or more tiles
        );

        this.domino.transition(State.PlayTile);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { DrawTileController };
