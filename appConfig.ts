import express, { Application, Express } from "express";
import { Db } from "mongodb";
import { createLogsRepository } from "src/data/logs.repository";
import { errorHandlerMiddleware } from "src/middleware/errorHandler.middleware";
import { loggerMiddleware } from "src/middleware/logger.middleware";
import { gameRoutes, movesRoutes } from "src/routes";
import { createLogger } from "src/utils/logger";
interface IAppConfigParameters {
  app: Express;
  db: Db;
}
export async function appConfig({ app, db }: IAppConfigParameters) {
  app.disable("x-powered-by");

  const logger = createLogger(
    createLogsRepository(await db.createCollection("logs"))
  );
  app.use(loggerMiddleware(logger));
  app.use(errorHandlerMiddleware(logger));

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
