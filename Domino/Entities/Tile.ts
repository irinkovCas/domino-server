import { Direction, isValid, Move } from './Move';

type Tile = {
    firstPip: number,
    secondPip: number,
}

function isMatching(a: Tile, b: Tile): boolean {
    return a.secondPip === b.firstPip;
}

function rotate(tile: Tile): Tile {
    return {
        firstPip: tile.secondPip,
        secondPip: tile.firstPip,
    };
}

function validMovesForTile(tile: Tile, left?: Tile, right?: Tile): Move[] {
    const validMoves: Move[] = [];

    for (const t of [tile, rotate(tile)]) {
        for (const where of [Direction.Left, Direction.Right]) {
            const move: Move = { where, tile: t, matching: undefined };

            switch (where) {
                case Direction.Left:
                    move.matching = left;
                    break;
                case Direction.Right:
                    move.matching = right;
                    break;
            }

            if (isValid(move)) {
                validMoves.push(move);
            }
        }
    }

    return validMoves;
}

export { Tile, isMatching, rotate, validMovesForTile };
