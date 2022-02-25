import { Game } from "../Game";
import { IState } from "./IState";

class StartRound implements IState {


    constructor(game: Game, setState: (state: IState) => void) {
    
    }

    end(): void {
        throw new Error("Method not implemented.");
    }

    start() {
        console.log("StartRound - start");
    }

}