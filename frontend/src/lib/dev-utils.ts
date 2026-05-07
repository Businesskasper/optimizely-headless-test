import { hasKey } from "./object-utils";

export const isDevEnv = () => {
  return (
    hasKey(process.env, "NODE_ENV") && process.env.NODE_ENV === "development"
  );
};

type HttpErrorSummary = {
  RequestHeaders: Record<string, string | null>;
  RequestBody?: object;
  ResponseHeaders: Record<string, string | null>;
  ResponseBody?: object;
};
export const getHttpErrorSummary = async (
  req: Request,
  res: Response,
): Promise<HttpErrorSummary> => {
  const requestHeaders = getLoggableHeaders(req.headers);
  const requestBody = req.body ? await req.json() : undefined;

  const responseHeaders = getLoggableHeaders(res.headers);
  const responseBody = res.body ? await res.json() : undefined;

  return {
    RequestHeaders: requestHeaders,
    RequestBody: requestBody,
    ResponseHeaders: responseHeaders,
    ResponseBody: responseBody,
  };
};

const getLoggableHeaders = (headers: Headers) => {
  const reqHeaderKeys = Array.from(headers.keys());
  return reqHeaderKeys.reduce(
    (sum, headerKey) => {
      sum[headerKey] = headers.get(headerKey);
      return sum;
    },
    {} as Record<string, string | null>,
  );
};

// export class HttpError extends Error {
//   #req: Request;
//   #res: Response;
//   constructor(message: string, request: Request, response: Response) {
//     super(message);
//     this.#req = request;
//     this.#res = response;

//     Object.setPrototypeOf(this, HttpError.prototype);
//   }
// }
