import { Direction, Move } from "./Move";
import { Tile } from "./Tile";

class Player {

    readonly name: string;
    readonly tiles: Tile[];

    constructor(name: string, tiles: Tile[]) {
        this.name = name;
        this.tiles = tiles;
    }

    validMoves(leftPip: number, rightPip: number) {
        this.tiles.map(tile => [tile.firstPip, tile.secondPip])
        let validMoves: Move[] = [];
        for (let tile of this.tiles) {
            if (tile.firstPip === leftPip || tile.secondPip === leftPip) {
                validMoves.push({where: Direction.Left, tile});
            }
            if (tile.firstPip === rightPip || tile.secondPip === rightPip) {
                validMoves.push({where: Direction.Right, tile});
            }
        }
        return validMoves;
    }
}

export { Player };