import { Collection, UpdateResult, WithId } from "mongodb";
import { ILog } from "src/models/log.model";

export interface ILogsRepository {
  createLog(data: ILog): Promise<void>;
  getLog(id: string): Promise<WithId<ILog> | null>;
  updateLog(data: Partial<ILog>): Promise<UpdateResult>;
}
export function createLogsRepository(
  collection: Collection<ILog>
): ILogsRepository {
  return {
    async createLog(data: ILog) {
      collection.insertOne(data);
    },

    async getLog(id: string) {
      return await collection.findOne({ _id: id });
    },

    async updateLog(data: Partial<ILog>) {
      return await collection.updateOne({ _id: data._id }, data);
    },
  };
}
