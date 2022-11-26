import { HTTP_STATUS_CODE } from "src/utils/http";

export interface ILog {
  _id: string;
  createdAt: number;
  data?: string;
  error?: string;
  hasError: boolean;
  ips: string[] | string;
  method: string;
  params?: string;
  path: string;
  query?: string;
  statusCode: HTTP_STATUS_CODE;
  updatedAt?: number;
}
