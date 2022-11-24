import { MongoClient } from "mongodb";
import { InternalServerError } from "src/utils/errors";

export enum COLLECTION_TYPES {
  GAME = "GAME",
}

export async function setupDb() {
  if (!process.env.MONGO_CONNECTION_STRING) {
    throw new InternalServerError("DB Connection string missing.");
  }
  const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);

  try {
    await client.connect();
    return await client.db("chess");
  } catch (err) {
    throw new InternalServerError("Problem connecting to database.");
  } finally {
    client.close();
  }
}
