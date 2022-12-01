import { ILogsRepository } from "src/data/logs.repository";
import { ILog } from "src/models/log.model";
import { InternalServerError } from "./errors";

export interface ILoggerParams
  extends Omit<ILog, "_id" | "createdAt" | "data"> {
  id: string;
  data: string | Record<string, any>;
}

export function createLogger(repo: ILogsRepository) {
  return {
    async createLog({
      id: _id,
      data: rawData = {},
      error: rawError = "",
      hasError,
      ips,
      method,
      params,
      path,
      query,
      statusCode,
    }: ILoggerParams) {
      try {
        const data =
          typeof rawData === "string" ? rawData : JSON.stringify(rawData);
        const error =
          typeof rawError === "string"
            ? rawError
            : JSON.stringify({
                message: rawError.message,
                name: rawError.name,
                stack: rawError.stack,
              });
        repo.createLog({
          _id,
          createdAt: Date.now(),
          data,
          error,
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

    async getLog(_: string) {
      try {
      } finally {
      }
    },
  };
}
