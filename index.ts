import { appConfig } from "appConfig";
import express from "express";
import { setupDb } from "src/data/db";

async function setup() {
  appConfig({ app: express(), db: await setupDb() });
}

setup();
