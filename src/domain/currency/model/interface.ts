import { Big } from "big.js";
import { ExecutionContext } from "../../../core/types";
import { ConvertDTO } from "./types";

export interface ICurrencyUC {
  convert(ctx: ExecutionContext, dto: ConvertDTO): Promise<Big>;
}
