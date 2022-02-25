import { Game } from "../Game";
import { State } from "./State";

class StartRound extends State {

    constructor(game: Game, transition: (state: State) => void) {
        super(game, transition);
    }

    end() {
        throw new Error("Method not implemented.");
    }

    start() {
        console.log("StartRound - start");
    }

}