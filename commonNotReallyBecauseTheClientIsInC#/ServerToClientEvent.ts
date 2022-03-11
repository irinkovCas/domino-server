import { MoveData, PlayerData, TileData } from './types';

interface ServerToClientEvent {
    game_init: {
        players: string[];
    };
    start_round: {
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
//     dominoSet: DominoSet;
// }

// interface Deal {
//     players: string,
//     tiles: TileData[],
//     dominoSet: DominoSet,
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

// interface ServerToClientsEvent {
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

