enum State {
    StartRound,
    EndRound,
    PlayTile,
    Deal,
    DrawTile,
}

interface IStateController {
    start(): void;
    destroy(): void;
}

export { IStateController, State };
