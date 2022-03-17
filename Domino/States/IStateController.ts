enum State {
    /** GameStart -> StartRound */
    GameStart,
    /** StartRound -> Deal */
    RoundStart,
    /** Deal -> PlayTile */
    Deal,
    /** PlayTile -> PlayTile | DrawTile | RoundEnd */
    PlayTile,
    /** DrawTile -> PlayTile */
    DrawTile,
    /** RoundEnd -> StartRound | GameEnd */
    RoundEnd,
    /** GameEnd -> (End state) */
    GameEnd, // (End state)
}

interface IStateController {
    start(): void;
    destroy(): void;
}

export { IStateController, State };
