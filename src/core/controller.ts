import { IIDGenerator } from "../pkg/id_generator/interface";
import { getChildOpts } from "../pkg/logger/helpers";
import { IAppLogger } from "../pkg/logger/interface";
import { IController } from "./interface";
import { ExecutionContext, RequestValidator } from "./types";

export class BaseController<Request, Response>
  implements IController<Request, Response>
{
  constructor(
    protected requestValidator: RequestValidator,
    protected idGen: IIDGenerator,
    protected logger: IAppLogger
  ) {
    this.logger = logger.child(getChildOpts("controller", this));
  }

  protected getExecutionContext(): ExecutionContext {
    return {
      requestId: this.idGen.generateID(),
    };
  }

  protected getRequest(): Request {
    throw new Error("Method not implemented.");
  }

  protected validateRequest(req: Request): void {
    if (this.requestValidator) this.requestValidator(req);
  }

  protected handler(ctx: ExecutionContext, req: Request): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  handle(): Promise<Response> {
    const ctx = this.getExecutionContext();
    const req = this.getRequest();
    let res = null
    try {
      this.validateRequest(req);
    } catch (e) {
      this.logger.error(`Invalid request data: ${e.message}`)
      return res
    }
    try {
      res = this.handler(ctx, req);
    } catch (e) {
      this.logger.error(`Error in handling request: ${e.message}`)
    }
    return res
  }
}
