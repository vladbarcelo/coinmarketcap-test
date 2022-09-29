import { Big } from "big.js";
import { CurrencyModel } from "./model";

export type ConvertDTO = {
  from: CurrencyModel;
  to: CurrencyModel;
  amount: Big;
  digits?: number;
};
