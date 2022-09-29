import Big from "big.js";
import ConvertConsoleRequest from "./request";
import RequestValidator from "./request.validator";
import { IAppLogger } from "../../../../pkg/logger/interface";
import { BaseConsoleController } from "../base";
import { ICurrencyUC } from "../../../../domain/currency/model/interface";
import { ConvertDTO } from "../../../../domain/currency/model/types";
import { IIDGenerator } from "../../../../pkg/id_generator/interface";
import { ExecutionContext } from "../../../../core/types";

export class ConvertController extends BaseConsoleController<
  ConvertConsoleRequest,
  string
> {
  constructor(
    private useCase: ICurrencyUC,
    protected idGen: IIDGenerator,
    protected logger: IAppLogger
  ) {
    super(RequestValidator, idGen, logger);
  }

  public async handler(
    ctx: ExecutionContext,
    req: ConvertConsoleRequest
  ): Promise<string> {
    const dto: ConvertDTO = {
      from: { symbol: req.from },
      to: { symbol: req.to },
      amount: new Big(req.amount),
    };

    const precision = req.digits ? req.digits : 6;

    const res = await this.useCase.convert(ctx, dto);
    return res.toFixed(precision);
  }
}
