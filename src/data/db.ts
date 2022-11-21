import { MongoClient } from "mongodb";
import { InternalServerError } from "src/utils/errors";

export async function setupDb() {
  if (!process.env.MONGO_CONNECTION_STRING) {
    throw new InternalServerError("DB Connection string missing.");
  }
  const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);

  try {
    await client.connect();
    await client.db("chess").command({ ping: 1 });
  } catch (err) {
    throw new InternalServerError("Problem connecting to database.");
  } finally {
    client.close();
  }
}
