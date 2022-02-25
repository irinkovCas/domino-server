import { Game } from "../Game";
import { State } from "./State";

class DrawTileController extends State {
    
    constructor(game: Game, transition: (state: State) => void) {;
        super(game, transition);
    }

    end(): void {
        throw new Error("Method not implemented.");
    }

    start() {
        console.log("DrawTileController - start");
    }
    
}