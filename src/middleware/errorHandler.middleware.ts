import { ErrorRequestHandler } from "express";
import { HutchErrorType, isHutchError } from "src/utils/errors";
import { createLogger } from "src/utils/logger";

export const errorHandlerMiddleware =
  (logger: ReturnType<typeof createLogger>): ErrorRequestHandler =>
  (err, req, res, next) => {
    try {
      if (isHutchError(err)) {
        const typedError: HutchErrorType = err;
        res.status(typedError.statusCode).send({
          message: typedError.message,
          requestId: req.requestId,
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        requestId: req.requestId,
      });
    } finally {
      (async function () {
        const foundLog = await (req.requestId && logger.getLog(req.requestId));
        if (foundLog) {
          logger.updateLog({
            error: JSON.stringify(err),
            hasError: true,
          });
        }
      })();
      next();
    }
  };
