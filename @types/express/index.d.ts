declare namespace Express {
  export interface Request {
    requestId?: string;
    session?: {};
  }

  export interface Response {
    isReturning: boolean;
  }
}
