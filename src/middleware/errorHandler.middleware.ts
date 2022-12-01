import { ErrorRequestHandler } from "express";
import { HutchErrorType, isHutchError } from "src/utils/errors";
import { createLogger } from "src/utils/logger";

/**
 *
 * FIXME: Seems like error middleware doesn't receive the params in the `req` object.
 * I'm not sure why, but this requires some more investigating.
 */
export const errorHandlerMiddleware =
  (logger: ReturnType<typeof createLogger>): ErrorRequestHandler =>
  (err, req, res, next) => {
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
        hasError: true,
        error: err,
        ips,
        method: req.method,
        params,
        path: req.path,
        query,
        statusCode: res.statusCode,
      });

      if (isHutchError(err)) {
        const typedError: HutchErrorType = err;
        res.status(typedError.statusCode).send({
          message: typedError.message,
          requestId: req.requestId,
        });
      } else {
        res.status(500).send({
          message: "Something went wrong",
          requestId: req.requestId,
        });
      }
    } catch (e) {
      console.error("Well this is not good:::", e);
    } finally {
      next();
    }
  };
