import equal from 'fast-deep-equal';
import { Move } from './Move';
import { rotate, Tile, validMovesForTile } from './Tile';

class Player {
    public readonly name: string;
    public readonly tiles: Tile[];
    public wasBlocked: boolean = false;

    public constructor(name: string, tiles: Tile[]) {
        this.name = name;
        this.tiles = tiles;
    }

    public isEmpty(): boolean {
        return this.tiles.length === 0;
    }

    public validMoves(left?: Tile, right?: Tile): Move[] {
        const validMoves: Move[] = [];
        for (const tile of this.tiles) {
            validMoves.push(...validMovesForTile(tile, left, right));
        }
        return validMoves;
    }

    removeTile(tile: Tile): void { 
        const index = this.tiles.findIndex((other) => equal(other, tile) || equal(other, rotate(tile)));
        this.tiles.splice(index, 1);
    }

    public isStuck(left?: Tile, right?: Tile): boolean {
        return this.validMoves(left, right).length === 0;
    }
}

export { Player };
