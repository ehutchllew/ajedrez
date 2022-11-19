import express from "express";
import { InitRoutes } from "src/routes";

function setup() {
  const app = express();

  InitRoutes(app, express.Router);

  app.listen(8080, () => {
    console.log("Server is connected on: ", 8080);
  });
}

setup();
