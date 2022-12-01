import { Collection, MongoError, WithId } from "mongodb";
import { ILog } from "src/models/log.model";

export interface ILogsRepository {
  createLog(data: ILog): Promise<void>;
  getLog(id: string): Promise<WithId<ILog> | null>;
}
export function createLogsRepository(
  collection: Collection<ILog>
): ILogsRepository {
  return {
    async createLog(data: ILog) {
      try {
        await collection.insertOne(data);
      } catch (e) {
        const err = e as MongoError;
        console.error("MONGO ERROR:::\n", JSON.stringify(err, undefined, 2));
      }
    },

    async getLog(id: string) {
      return await collection.findOne({ _id: id });
    },
  };
}
