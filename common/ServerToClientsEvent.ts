import { MoveData, PlayerData, TileData } from '../common/types';
import { DominoSet } from '../Domino/Entities/DominoSet';

interface GameInit {
    players: string[];
}

interface StartRound {
    dominoSet: DominoSet;
}

interface Deal {
    players: string,
    tiles: TileData[],
    dominoSet: DominoSet,
}

interface TilePlayRequest {
    player: string,
    moves: MoveData[],
}

interface TilePlayNotification {
    player: string,
    move: MoveData,
}

interface TileDraw {
    player: string,
    tiles: TileData[],
}

interface Stuck {
    player: string,
}

interface Blocked {
    player: string,
}

interface RoundEnd {
    winner: string,
    players: PlayerData[],
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameEnd { }

interface ServerToClientsEvent {
    game_init: GameInit;
    start_round: StartRound;
    deal: Deal;
    tile_play_request: TilePlayRequest;
    tile_play_notification: TilePlayNotification;
    tile_draw: TileDraw;
    stuck: Stuck;
    blocked: Blocked;
    round_end: RoundEnd;
    game_end: GameEnd;
}

export { ServerToClientsEvent };

