import { IGameRepository } from "src/data/game.repository";
import { Game, IGame } from "src/models/game.model";
import { NotImplementedError } from "src/utils/errors";
import { generateUUID } from "src/utils/generateUUID";
import { IService } from "../types";
import { generateNewBoard } from "./game.utils";

export function createGameService(repo: IGameRepository): IService<IGame> {
  return {
    delete() {
      throw new NotImplementedError("Endpoint not yet implemented");
    },
    get(id: string) {
      return repo.getGameById(id) as Promise<IGame>;
    },
    post() {
      // TODO: Lookup session info. If it exists either opt for returning the existing game, or deleting the old one and producing a new one
      return repo.createGame(
        Game({
          _id: generateUUID(),
          board: generateNewBoard(),
          history: [],
          playerTurn: "white",
        })
      );
    },
    put(gameToUpdate) {
      return repo.updateGame(gameToUpdate);
    },
  };
}
