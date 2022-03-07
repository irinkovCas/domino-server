import { assert } from 'console';
import { Domino } from '../Domino';
import { Player } from '../Entities/Player';
import { Tile } from '../Entities/Tile';
import { GameEvent } from '../Events';
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
            GameEvent.TILE_DRAW_NOTIFICATION,
            { player: this.player.name, tiles }, // could be 1 or more tiles
        );

        const zero_tile: Tile = { firstPip: 0, secondPip: 0 }
        const zero_tiles: Tile[] = tiles.map((_tile) => zero_tile);

        this.domino.room.sendAllBut(
            this.player.name,
            GameEvent.TILE_DRAW_NOTIFICATION,
            { player: this.player.name, tiles: zero_tiles }, // could be 1 or more tiles
        );

        if (this.player.isStuck()) {
            assert(
                this.domino.game.dominoSet.isEmpty(),
                'DrawTileController: player is stuck but domino set is not empty',
            );
            // domino set is empty and if all the players are stuck its game over
            if (this.domino.game.players.every((p) => p.isStuck())) {
                this.domino.room.sendAll(GameEvent.GAME_OVER, {}); // TODO: send game over stats(winner, score, etc)
            } else {
                this.domino.game.nextPlayer();
            }
        } else {

        }

        this.domino.transition(State.PlayTile);
    }

    public destroy(): void {
        // throw new Error("Method not implemented.");
    }
}

export { DrawTileController };
