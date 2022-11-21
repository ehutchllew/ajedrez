import express from "express";
import { setupDb } from "src/data/db";
import { InitRoutes } from "src/routes";

async function setup() {
  const app = express();
  await setupDb();

  InitRoutes(app, express.Router);

  app.listen(8080, () => {
    console.log("Server is connected on: ", 8080);
  });
}

setup();
