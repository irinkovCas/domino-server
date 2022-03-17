import { MoveData, PlayerData, TileData } from './types';

// // expands object types recursively
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;

interface ServerToClientEvent {
    game_start: {
        players: string[];
    };
    round_start: {
        dominoSet: number;
    };
    deal: {
        tiles: TileData[],
    };
    tile_play_request: {
        player: string,
        moves: MoveData[],
    };
    tile_play_notification: {
        player: string,
        move: MoveData,
    };
    tile_draw: {
        player: string,
        tiles: TileData[],
    };
    stuck: {
        player: string,
    };
    blocked: {
        player: string,
    };
    round_end: {
        winner: string,
        players: PlayerData[],
    };
    game_end: { /**/ };
}

// interface GameInit {
//     players: string[];
// }

// interface StartRound {
//     dominoSet: number;
// }

// interface Deal {
//     players: string,
//     tiles: TileData[],
// }

// interface TilePlayRequest {
//     player: string,
//     moves: MoveData[],
// }

// interface TilePlayNotification {
//     player: string,
//     move: MoveData,
// }

// interface TileDraw {
//     player: string,
//     tiles: TileData[],
// }

// interface Stuck {
//     player: string,
// }

// interface Blocked {
//     player: string,
// }

// interface RoundEnd {
//     winner: string,
//     players: PlayerData[],
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface GameEnd { }

// interface ServerToClientEvent {
//     game_init: GameInit;
//     start_round: StartRound;
//     deal: Deal;
//     tile_play_request: TilePlayRequest;
//     tile_play_notification: TilePlayNotification;
//     tile_draw: TileDraw;
//     stuck: Stuck;
//     blocked: Blocked;
//     round_end: RoundEnd;
//     game_end: GameEnd;
// }

export { ServerToClientEvent };

