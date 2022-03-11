import { MoveData } from './types';

type TilePlay = MoveData;

interface ClientToServerEvent {
    tile_play: TilePlay;
}

export { ClientToServerEvent };
