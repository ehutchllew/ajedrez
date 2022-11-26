import { Router } from "express";
import { IGame } from "src/models/game.model";
import { IService } from "src/services/types";
import { post } from "./post/post.route";

export function createGameRoutes(
  router: Router,
  service: IService<IGame>
): Router {
  router.get("/:id", () => {});
  router.post("/", post);
  return router;
}
