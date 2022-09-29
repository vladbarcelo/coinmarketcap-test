import { ExecutionContext } from "../../core/types";
import { HTTPRequestOpts } from "./types";

export interface IHTTPClient {
  request<Response>(
    ctx: ExecutionContext,
    opts: HTTPRequestOpts
  ): Promise<Response>;
}
