import { ILogsRepository } from "src/data/logs.repository";
import { ILog } from "src/models/log.model";
import { InternalServerError } from "./errors";

export interface ILoggerParams extends Omit<ILog, "_id" | "createdAt"> {
  id: string;
}

export function createLogger(repo: ILogsRepository) {
  return {
    async createLog({
      id: _id,
      data: rawData,
      hasError,
      ips,
      method,
      params,
      path,
      query,
      statusCode,
    }: ILoggerParams) {
      const data =
        typeof rawData === "string" ? rawData : JSON.stringify(rawData);
      try {
        repo.createLog({
          _id,
          data,
          createdAt: Date.now(),
          hasError,
          ips,
          method,
          params,
          path,
          query,
          statusCode,
        });
      } catch (e) {
        throw new InternalServerError("unable to stringify data for logging");
      }
    },

    async getLog(id: string) {
      try {
      } finally {
      }
    },

    async updateLog(logToUpdate: Partial<ILoggerParams>) {
      const updateRecord = Object.entries(logToUpdate).reduce(
        (acc, [key, value]) => {
          if (key === "data") {
            acc[key] =
              typeof value === "string" ? value : JSON.stringify(value);
          } else {
            // @ts-ignore-next-line -- for some reason TS LS casts the key as type string but knows that `acc` expects specific strings
            acc[key] = value;
          }
          return acc;
        },
        {} as Partial<ILoggerParams>
      );

      try {
        repo.updateLog({
          ...updateRecord,
          updatedAt: Date.now(),
        });
      } catch (e) {
        throw new InternalServerError("unable to stringify data for logging");
      }
    },
  };
}
