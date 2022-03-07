enum GameEvent {
    START = 'start',
    DEAL = 'deal',
    TILE_PLAY_REQUEST = 'current_player',
    TILE_PLAY_NOTIFICATION = 'tile_played',
    CLIENT_PLAY_TILE = 'play_tile',
    DRAW_TILE = 'draw_tile',
    TILE_DRAW_NOTIFICATION = 'tile_draw_notification',
    PLAYER_BLOCKED_NOTIFICATION = "PLAYER_BLOCKED_NOTIFICATION",
    GAME_OVER = "GAME_OVER",
    Stuck = "Stuck"
}

export { GameEvent };
