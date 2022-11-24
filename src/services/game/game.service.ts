import { IGameRepository } from "src/data/game.repository";
import { Game, IGame } from "src/models/game.model";
import { generateUUID } from "src/utils/generateUUID";
import { generateNewBoard } from "./game.utils";

export function createGameService(repo: IGameRepository) {
  return {
    delete() {},
    get() {},
    post(): Promise<IGame> {
      return repo.createGame(
        Game({
          _id: generateUUID(),
          board: generateNewBoard(),
          history: [],
          playerTurn: "white",
        })
      );
    },
    put() {},
  };
}
