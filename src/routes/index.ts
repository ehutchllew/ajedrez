import { Application, Router } from "express";
import { gameRoutes } from "./game";
import { movesRoutes } from "./moves";

export function InitRoutes(app: Application, router: () => Router) {

    const gameRouter = gameRoutes(router())
    const movesRouter = movesRoutes(router())

    app.use("/game", gameRouter)
    app.use("/moves", movesRouter)
}