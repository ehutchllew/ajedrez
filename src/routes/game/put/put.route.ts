import { Request, Response } from "express";
import { IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import { IService } from "src/services/types";
import { BadRequestError } from "src/utils/errors";
import { HTTP_STATUS_CODE } from "src/utils/http";

export function put(service: IService<MoveType, IGame>) {
  return async (req: Request, res: Response) => {
    try {
      const gameId = req.params.id;
      if (!gameId) {
        throw new BadRequestError(
          "Updating a game requires an id to be passed"
        );
      }
      const body = JSON.parse(req.body);
      res.status(HTTP_STATUS_CODE.OK).send(service.put(body));
    } catch (e) {
      console.error("wut wut", e);
    }
  };
}
