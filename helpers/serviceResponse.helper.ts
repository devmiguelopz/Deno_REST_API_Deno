import { IResponse } from "../interfaces/response.interface.ts";
import { IResponseBody } from "../interfaces/responseBody.interface.ts";

const get = <T>(message: string, data: T | undefined): IResponseBody<T> => {
  if (!!data) {
    return {
      message: message,
      data: data,
    };
  }
  return { message: message };
};

const get202 = <T>(body: IResponseBody<T>): IResponse<T> => {
  return {
    status: 202,
    body: get<T>(body.message, body.data),
  };
};

const get404 = <T>(body: IResponseBody<T>): IResponse<T> => {
  return {
    status: 404,
    body: get<T>(body.message, body.data),
  };
};
export default {
  Get: get,
  Get202: get202,
  Get404: get404,
};
