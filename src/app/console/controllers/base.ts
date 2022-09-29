import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { BaseController } from "../../../core/controller";

export class BaseConsoleController<Request, Response> extends BaseController<
  Request,
  Response
> {
  public getRequest(): Request {
    return yargs(hideBin(process.argv)).argv;
  }
}
