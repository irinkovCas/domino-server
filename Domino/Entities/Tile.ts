class Tile {
    public readonly firstPip: number;
    public readonly secondPip: number;

    public constructor(firstPip: number, secondPip: number) {
        this.firstPip = firstPip;
        this.secondPip = secondPip;
    }

    public isMathchingTile(a: Tile): boolean {
        return this.isMatchingPip(a.firstPip) || this.isMatchingPip(a.secondPip);
    }

    public isMatchingPip(a?: number): boolean {
        return a == undefined || this.firstPip === a || this.secondPip === a;
    }
}


export { Tile };
