import { Tile } from './Tile';

class DominoSet {
    private tiles: Tile[] = [];

    public constructor() {
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                this.tiles.push({ firstPip: i, secondPip: j });
            }
        }
    }

    public isEmpty(): boolean {
        return this.tiles.length === 0;
    }

    public shuffle(): void {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    public draw(): Tile | undefined {
        return this.tiles.pop();
    }

    public drawN(n: number): Tile[] {
        return this.tiles.splice(0, n);
    }
}

export { DominoSet };
