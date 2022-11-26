import { AppConfig } from "./appConfig";
import express from "express";
import { MongoClient } from "mongodb";

const app = new AppConfig(MongoClient, express);

app.init();
