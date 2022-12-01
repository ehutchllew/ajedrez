import { Request, RequestHandler, Response } from "express";
import { IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import { IService } from "src/services/types";
import { BadRequestError } from "src/utils/errors";
import { HTTP_STATUS_CODE } from "src/utils/http";

export function put(service: IService<MoveType, IGame>): RequestHandler {
  return async (req: Request, res: Response, next) => {
    try {
      const gameId = req.params.id;
      if (!gameId) {
        throw new BadRequestError(
          "Updating a game requires an id to be passed"
        );
      }
      if (!req.body) {
        throw new BadRequestError(
          "Updating a game requires data to be passed in the body"
        );
      }

      const updatedGame = await service.put(gameId, req.body);
      res.status(HTTP_STATUS_CODE.OK);
      res.payload = {
        ...updatedGame,
        requestId: req.requestId,
      };
      next();
    } catch (e) {
      next(e);
    }
  };
}
