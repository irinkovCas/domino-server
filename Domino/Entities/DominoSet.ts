import { Tile } from './Tile';

class DominoSet {
    tiles: Tile[] = [];

    constructor() {
        for(let i = 0; i <= 6; i++) {
            for(let j = i; j <= 6; j++) {
                this.tiles.push({firstPip: i, secondPip: j});       
            }
        }
    }

    shuffle() {
        for(let i = this.tiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    draw() : Tile | undefined {
        return this.tiles.pop();
    }

    drawN(n: number) : Tile[] {
        return this.tiles.splice(0, n);
    }
}

export { DominoSet };