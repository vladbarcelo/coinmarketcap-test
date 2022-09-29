import Big from "big.js";
import { ICurrencyConverterClient } from "../../client/currency_converter/interface";
import { ExecutionContext } from "../../core/types";
import { getChildOpts } from "../../pkg/logger/helpers";
import { IAppLogger } from "../../pkg/logger/interface";
import { ICurrencyUC } from "./model/interface";
import { ConvertDTO } from "./model/types";

export class CurrencyUseCase implements ICurrencyUC {
  constructor(
    private client: ICurrencyConverterClient,
    private logger: IAppLogger
  ) {
    this.logger = this.logger.child(getChildOpts('useCase', this))
  }

  async convert(ctx: ExecutionContext, dto: ConvertDTO): Promise<Big> {
    this.logger.debug(
      `Converting ${dto.amount}x${dto.from.symbol} to ${dto.to.symbol}`,
      ctx
    );
    const res = await this.client.convert(
      ctx,
      dto.from.symbol,
      dto.to.symbol,
      dto.amount.toFixed(2)
    );
    this.logger.debug(
      `${dto.amount}x${dto.from.symbol} => ${res}x${dto.to.symbol}`,
      ctx
    );
    return new Big(res);
  }
}
