import { ExecutionContext } from "../../core/types";

export interface ICurrencyConverterClient {
  convert(
    ctx: ExecutionContext,
    from: string,
    to: string,
    amount: string
  ): Promise<string>;
}
