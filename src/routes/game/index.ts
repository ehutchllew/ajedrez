import { Router } from "express";
import { IGame } from "src/models/game.model";
import { MoveType } from "src/models/moves.model";
import { IService } from "src/services/types";
import { post } from "./post/post.route";
import { put } from "./put/put.route";

export function createGameRoutes(
  router: Router,
  service: IService<MoveType, IGame>
): Router {
  router.get("/:id", () => {});
  router.post("/", post(service));
  router.put("/:id", put(service));
  return router;
}
