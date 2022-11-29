import { IGameRepository } from "src/data/game.repository";
import { Game, IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import { NotFoundError, NotImplementedError } from "src/utils/errors";
import { generateUUID } from "src/utils/generateUUID";
import { validateMove } from "../moves/move.validations";
import { IService } from "../types";
import { generateNewBoard, updateGameStateFromMove } from "./game.utils";

export function createGameService(
  repo: IGameRepository
): IService<MoveType, IGame> {
  return {
    delete() {
      throw new NotImplementedError("Endpoint not yet implemented");
    },

    async get(id: string) {
      return repo.getGameById(id) as Promise<IGame>;
    },

    post() {
      // TODO: Lookup session info. If it exists either opt for returning the existing game, or deleting the old one and producing a new one
      // Should probably be done in middleware, and then check here for `req.session`
      return repo.createGame(
        Game({
          _id: generateUUID(),
          board: generateNewBoard(),
          history: [],
          playerTurn: "white",
        })
      );
    },

    async put(id, move) {
      const dbEntity = await this.get(id);
      if (dbEntity === null) {
        throw new NotFoundError("Record with provided ID not found");
      }

      validateMove(move, dbEntity);
      const gameToUpdate = updateGameStateFromMove(move, dbEntity);
      return repo.updateGame(gameToUpdate);
    },
  };
}
