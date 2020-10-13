import { IResponseBody } from "./responseBody.interface.ts";

export interface IResponse<T> {
  status: number;
  body: IResponseBody<T>
}
