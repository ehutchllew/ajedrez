import { Request, RequestHandler, Response } from "express";
import { IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import { IService } from "src/services/types";
import { HTTP_STATUS_CODE } from "src/utils/http";

export function post(service: IService<MoveType, IGame>): RequestHandler {
  return async (req: Request, res: Response, next) => {
    try {
      const newGame = await service.post({});
      res.status(HTTP_STATUS_CODE.CREATED).send({
        ...newGame,
        requestId: req.requestId,
      });
    } catch (e) {
      next(e);
    }
  };
}
