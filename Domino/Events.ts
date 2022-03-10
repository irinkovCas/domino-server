/**
 * Events sent from the server to the client
 */
enum Events {

    // Move { where: Direction, tile: Tile, matching: Tile | undefined }
    // Tile { firstPip: number, secondPip: number }
    // Direction { Left = 0, Right = 1 }
    // Player { name: string, tiles: Tile[], score: number }
    // DominoSet { tiles: Tile[] }

    /** { player: string[] } */
    GameInit = 'game_init',
    /** haven't found a use this event yet */
    StartRound = 'start_round',

    /** {  players: Player[], leftInDomino: number } */
    Deal = 'deal',

    // Sends the current player's name and his possible moves to the current player
    // Only sends the current player's name to the other players
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

    /** { winner: string, players: Player[] } */
    RoundEnd = 'round_end',
    GameEnd = 'game_end',
}


/** Evets sent from client to server */
enum EventClient {
    TilePlay = 'tile_play',
}

// eslint-disable-next-line @typescript-eslint/no-namespace

// interface Event {
//     name: string,
//     data: any,
// }

// interface GameInitData {
//     players: string[],
// }

// class GameInit implements Event {
//     public name = 'GameInit';
//     public data: GameInitData;
// }

export { Events, EventClient };

// export { Event, EventClient };
