import { MoveData } from './types';

type TilePlay = MoveData;

interface ClientToServerEvents {
    tile_play: (_: TilePlay) => void;
}

export { ClientToServerEvents };
