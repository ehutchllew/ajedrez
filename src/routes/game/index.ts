import { Router } from "express";
import { post } from "./post/handler";

export function gameRoutes(router: Router): Router {
  router.post("/", post);
  return router;
}
