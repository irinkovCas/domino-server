/**
 * Events sent from the server to the client
 */
enum Event {

    // Move { where: Direction, tile: Tile, matching: Tile | undefined }
    // Tile { firstPip: number, secondPip: number }
    // Direction { Left = 0, Right = 1 }
    // Player { name: string, tiles: Tile[] }
    // DominoSet { tiles: Tile[] }

    /** { player: string[] } */
    GameInit = 'game_init',
    NextRoundInit = 'next_round_init',

    /** {  players: Player[], dominoSet: DominoSet } */
    Deal = 'deal',

    /** { player: string, moves: Move[] } */
    TilePlayRequest = 'tile_play_request',
    /** { player: string, move: Move } */
    TilePlayNotification = 'tile_play_notification',

    /** { player: string, tiles: Tile[] } */
    TileDraw = 'tile_draw',

    /** { player: string } */
    Stuck = 'stuck',
    /** { player: string } */
    Blocked = 'blocked',

    RoundEnd = 'round_end',
    GameEnd = 'game_end',
}

/** Evets sent from client to server */
enum EventClient {
    TilePlay = 'tile_play',
}


export { Event, EventClient };
