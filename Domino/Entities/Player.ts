import { Direction, Move } from './Move';
import { Tile } from './Tile';

class Player {
    public readonly name: string;
    public readonly tiles: Tile[];

    public constructor(name: string, tiles: Tile[]) {
        this.name = name;
        this.tiles = tiles;
    }

    public isEmpty(): boolean {
        return this.tiles.length === 0;
    }

    public validMoves(endingPips?: Tile): Move[] {
        const validMoves: Move[] = [];
        for (const tile of this.tiles) {
            for (const direction of [Direction.Left, Direction.Right]) {
                const move = new Move(direction, tile, endingPips);
                if (move.isValid()) {
                    validMoves.push(move);
                }
            }
        }
        return validMoves;
    }

    public someValidMoves(endingPips?: Tile): boolean {
        return this.tiles
            .some((tile) =>
                tile.isMatchingPip(endingPips?.firstPip) || tile.isMatchingPip(endingPips?.secondPip),
            );
    }
}

export { Player };
