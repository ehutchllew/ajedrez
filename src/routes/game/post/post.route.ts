import { Request, Response } from "express";
import { IGame } from "src/models/game.model";
import { IService } from "src/services/types";

export function post(service: IService<IGame>) {
  return (req: Request, res: Response) => {
    try {
      const newGame = service.post({});
      res.status(200).send(newGame);
    } catch (e) {
      console.error("wut wut", e);
    }
  };
}
