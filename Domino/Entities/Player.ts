import { Tile } from "./Tile";

class Player {

    readonly name: string;
    readonly tiles: Tile[];

    constructor(name: string, tiles: Tile[]) {
        this.name = name;
        this.tiles = tiles;
    }

    validMoves(leftPip: number, rightPip: number) {
        let validMoves: Tile[] = [];
        for (let tile of this.tiles) {
            if (tile.firstPip === leftPip || tile.secondPip === leftPip) {
                validMoves.push(tile);
            }
            if (tile.firstPip === rightPip || tile.secondPip === rightPip) {
                validMoves.push(tile);
            }
        }
        return validMoves;
    }
}

export { Player };