import express, { Application } from "express";
import { MongoClient } from "mongodb";
import { AppDb } from "src/data/db";
import { createGameRepository } from "src/data/game.repository";
import { createLogsRepository } from "src/data/logs.repository";
import { COLLECTION_TYPES } from "src/data/types";
import { errorHandlerMiddleware } from "src/middleware/errorHandler.middleware";
import { loggerMiddleware } from "src/middleware/logger.middleware";
import { createGameRoutes } from "src/routes";
import { createGameService } from "src/services/game/game.service";
import { createLogger } from "src/utils/logger";

export class AppConfig {
  protected readonly __DEV__ = process.env.__DEV__;
  protected readonly DATABASE_NAME = "chess";
  protected readonly MONGO_CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017";
  protected readonly API_PORT = process.env.API_PORT || 3000;
  protected readonly SESS_LIFETIME = process.env.SESS_LIFETIME || "600000";
  protected readonly SESS_NAME = process.env.SESS_NAME || "sid";
  protected readonly SESS_SECRET = process.env.SESS_SECRET || "s3cr3ts!lol";

  constructor(
    private readonly DbClient: typeof MongoClient,
    private readonly ExpressRef: typeof express
  ) {}

  public async init() {
    try {
      const db = await this.setupDb();
      this.setupApp(db);
    } catch (e) {
      console.error(e);
    }
  }

  protected configureRoutes(app: Application, db: AppDb): void {
    const gameRouter = createGameRoutes(
      this.ExpressRef.Router(),
      createGameService(
        createGameRepository(db.collection(COLLECTION_TYPES.GAMES))
      )
    );

    app.use("/game", gameRouter);
  }

  protected setupApp(db: AppDb): void {
    const app: Application = this.ExpressRef();

    app.use(function (_, res, next) {
      res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Method": "POST, GET, OPTIONS",
        "Access-Control-Allow-Max-Age": "86400",
        "Access-Control-Allow-Credentials": "true",
        Vary: "Origin",
      });

      next();
    });

    if (this.__DEV__ === "true") {
      app.use(
        this.ExpressRef.json({
          type: ["application/json", "text/plain"],
        })
      );
    } else {
      app.use(this.ExpressRef.json());
    }

    app.disable("x-powered-by");

    const logger = createLogger(
      createLogsRepository(db.collection(COLLECTION_TYPES.LOGS))
    );
    app.use(loggerMiddleware(logger));
    app.use(errorHandlerMiddleware(logger));

    this.configureRoutes(app, db);

    app.listen(this.API_PORT, () => {
      console.log("Server is connected on: ", this.API_PORT);
    });
  }

  protected async setupDb(): Promise<AppDb> {
    const client = new this.DbClient(this.MONGO_CONNECTION_STRING);
    try {
      await client.connect();
      return new AppDb(await client.db(this.DATABASE_NAME));
    } catch (err) {
      throw new Error("Problem connecting to database.");
    } finally {
      client.close();
    }
  }
}
