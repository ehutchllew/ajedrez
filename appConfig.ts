import express, { Application, Express } from "express";
import { Db } from "mongodb";
import { gameRoutes, movesRoutes } from "src/routes";
interface IAppConfigParameters {
  app: Express;
  db: Db;
}
export function appConfig({ app, db }: IAppConfigParameters) {
  app.disable("x-powered-by");

  configureRoutes(app, db);

  app.listen(8080, () => {
    console.log("Server is connected on: ", 8080);
  });
}

function configureRoutes(app: Application, db: Db) {
  const gameRouter = gameRoutes(express.Router());
  const movesRouter = movesRoutes(express.Router());

  app.use("/game", gameRouter);
  app.use("/moves", movesRouter);
}
