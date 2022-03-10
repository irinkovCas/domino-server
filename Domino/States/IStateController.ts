enum State {
    GameStart,
    StartRound,
    Deal,
    PlayTile,
    DrawTile,
    RoundEnd,
    GameEnd,
}

interface IStateController {
    start(): void;
    destroy(): void;
}

export { IStateController, State };
