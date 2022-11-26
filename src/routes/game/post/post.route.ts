import { Request, Response } from "express";

export function post(req: Request, res: Response) {
  try {
    res.status(200).send(newGame);
  } catch (e) {
    console.error("wut wut", e);
  }
}
