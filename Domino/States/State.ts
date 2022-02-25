import { Game } from "../Game";

abstract class State {
    
    protected transition: (state: State) => void;
    protected game: Game;

    constructor(game: Game, transition: (state: State) => void) {
        this.game = game;
        this.transition = transition;
    }

    abstract start(): void;
    abstract end(): void;
}

export { State };