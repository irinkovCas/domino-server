import { Tile } from './Tile';

enum Direction {
    Left = 0,
    Right = 1
}

class Move {
    public readonly where: Direction;
    public readonly tile: Tile;
    public readonly matching: Tile | undefined; // there is a corner case on the first move when the line is empty

    public constructor(where: Direction, tile: Tile, matching?: Tile) {
        this.where = where;
        this.tile = tile;
        this.matching = matching;
    }

    public isValid(): boolean {
        switch (this.where) {
            case Direction.Left:
                return this.tile.isMatchingPip(this.matching?.firstPip);
            case Direction.Right:
                return this.tile.isMatchingPip(this.matching?.secondPip);
        }
    }
}

export { Move, Direction };
