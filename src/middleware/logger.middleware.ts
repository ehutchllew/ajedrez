import { RequestHandler } from "express";
import { createLogger } from "src/utils/logger";

export const loggerMiddleware =
  (logger: ReturnType<typeof createLogger>): RequestHandler =>
  (req, res, next) => {
    /**
     *  If for some reason uuid's start clashing we could prefix these with 'requestId_'
     * ex: const requestId = "requestId_" + generateUUID();
     */
    try {
      const ips = req.ips?.length ? req.ips : req.ip;

      let params: string = "";
      if (typeof req.params === "object") {
        params = JSON.stringify(req.params);
      } else {
        params = String(req.params);
      }

      let query: string = "";
      if (typeof req.query === "object") {
        query = JSON.stringify(req.query);
      } else {
        query = String(req.query);
      }

      logger.createLog({
        id: req.requestId,
        data: req.body,
        error: "",
        hasError: false,
        ips,
        method: req.method,
        params,
        path: req.path,
        query,
        statusCode: res.statusCode,
      });
    } finally {
      next();
    }
  };
