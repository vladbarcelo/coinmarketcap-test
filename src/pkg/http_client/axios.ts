import axios from "axios";
import { ExecutionContext } from "../../core/types";
import { getChildOpts } from "../logger/helpers";
import { IAppLogger } from "../logger/interface";
import { IHTTPClient } from "./interface";
import { HTTPRequestOpts } from "./types";

export class AxiosHTTPClient implements IHTTPClient {
  constructor(private logger: IAppLogger) {
    this.logger = this.logger.child(getChildOpts('http_client', this))
  }

  async request<Response>(
    ctx: ExecutionContext,
    opts: HTTPRequestOpts
  ): Promise<Response> {
    this.logger.debug(opts, ctx);
    let res = null;
    try {
      const { data } = await axios.request(opts);
      res = data;
      this.logger.debug(data, ctx);
    } catch (e) {
      this.logger.error(e, ctx);
    }
    return res;
  }
}
