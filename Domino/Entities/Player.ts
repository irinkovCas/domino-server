import equal from 'fast-deep-equal';
import { Move } from './Move';
import { rotate, Tile, validMovesForTile } from './Tile';

class Player {
    public readonly name: string;
    public readonly tiles: Tile[];
    public score = 0;

    public constructor(name: string, tiles: Tile[]) {
        this.name = name;
        this.tiles = tiles;
    }

    public isHandEmpty(): boolean {
        return this.tiles.length === 0;
    }

    public validMoves(endingPips?: Tile): Move[] {
        const validMoves: Move[] = [];
        for (const tile of this.tiles) {
            validMoves.push(...validMovesForTile(tile, endingPips));
        }
        return validMoves;
    }

    public removeTile(tile: Tile): void {
        const index = this.tiles.findIndex((other) => equal(other, tile) || equal(other, rotate(tile)));
        this.tiles.splice(index, 1);
    }

    public isStuck(endingPips?: Tile): boolean {
        return this.validMoves(endingPips).length === 0;
    }

    // public serialize(): Record<string, any> {
    //     return {
    //         name: this.name,
    //         score: this.score,
    //         tiles: this.tiles,
    //     };
    // }
}

export { Player };
