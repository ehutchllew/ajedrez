import { ErrorRequestHandler } from "express";
import { HutchErrorType, isHutchError } from "src/utils/errors";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  try {
    if (isHutchError(err)) {
      const typedError: HutchErrorType = err;
      res.status(typedError.statusCode).send({
        message: typedError.message,
        requestId: req.id,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
      requestId: req.id,
    });
  } finally {
    // can log the error here
    next();
  }
};
