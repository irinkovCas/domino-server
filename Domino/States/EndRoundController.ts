import { Game } from "../Game";
import { State } from "./State";

class EndRoundController extends State {
    
    constructor(game: Game, transition: (state: State) => void) {
        super(game, transition);
    }

    end() {
        throw new Error("Method not implemented.");
    }

    start() {
        console.log("EndRoundController - start");
    }
    
}