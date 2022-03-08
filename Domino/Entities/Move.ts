import { isMatching, Tile } from './Tile';

enum Direction {
    Left = 0,
    Right = 1
}

type Move = {
    tile: Tile;
    where: Direction;
}

function isValid(move: Move, endingPips?: Tile): boolean {
    if (endingPips === undefined) {
        return true;
    }

    switch (move.where) {
        case Direction.Left:
            return isMatching(move.tile, endingPips);
        case Direction.Right:
            return isMatching(endingPips, move.tile);
    }
}

export { Move, Direction, isValid };
