interface TileData {
    firstPip: number,
    secondPip: number,
}

interface MoveData {
    where: number,
    tile: TileData,
}

interface PlayerData {
    name: string,
    tiles: TileData[],
    score: number,
}

export { TileData, MoveData, PlayerData };
