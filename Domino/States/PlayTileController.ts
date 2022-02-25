import { Game } from "../Game";
import { State } from "./State";

class PlayTileControllet extends State {

    constructor(game: Game, transition: (state: State) => void) {
        super(game, transition);
    }

    end(): void {
        throw new Error("Method not implemented.");
    }

    start() {
        console.log("PlayTileControllet - start");
    }

}