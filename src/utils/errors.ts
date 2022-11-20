import { HTTP_STATUS_CODE } from "./http";

abstract class BaseError {
  public readonly message: string;
  public readonly stack: string | undefined;
  public abstract statusCode: HTTP_STATUS_CODE;
  constructor(error: string | Error) {
    if (error instanceof Error) {
      this.message = error.message;
      this.stack = error.stack;
    } else {
      const err = new Error(error);
      this.message = err.message;
      this.stack = err.stack;
    }
  }
}

export class BadRequestError extends BaseError {
  public statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
  constructor(error: string | Error) {
    super(error);
  }
}

export class InvalidDataError extends BaseError {
  public statusCode = HTTP_STATUS_CODE.INVALID_DATA;
  constructor(error: string | Error) {
    super(error);
  }
}

export class InternalServerError extends BaseError {
  public statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  constructor(error: string | Error) {
    super(error);
  }
}
