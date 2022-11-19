import { Game, IGame } from "src/models/game.model";
import { generateUUID } from "src/utils/generateUUID";
import { generateNewBoard } from "./game.utils";

export function createGame(): IGame {
  const newGame = Game({
    _id: generateUUID(),
    board: generateNewBoard(),
    history: [],
    playerTurn: "white",
  });

  // set game repository
  return newGame;
}
