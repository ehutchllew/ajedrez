import { Request, Response } from "express";
import { createGame } from "src/services/game/post/post.service";

export function post(req: Request, res: Response) {
  try {
    createGame();
    res.status(200).send({});
  } catch (e) {}
}
