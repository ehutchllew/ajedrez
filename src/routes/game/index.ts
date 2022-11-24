import { Router } from "express";
import { post } from "./post/post.route";

export function gameRoutes(router: Router): Router {
  router.get("/:id", () => {});
  router.post("/", post);
  return router;
}
