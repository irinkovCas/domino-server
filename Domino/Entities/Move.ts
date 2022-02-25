import { Tile } from "./Tile";

enum Direction {
    Left,
    Right
}

type Move = {
    where: Direction
    tile: Tile;
}

export { Move, Direction };