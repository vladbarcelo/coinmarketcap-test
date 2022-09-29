import { ExecutionContext } from "../../core/types";
import { IHTTPClient } from "../../pkg/http_client/interface";
import { getChildOpts } from "../../pkg/logger/helpers";
import { IAppLogger } from "../../pkg/logger/interface";
import { ICurrencyConverterClient } from "./interface";

type CoinMarketCapResponse = {
  data: {
    [key: string]: {
      quote: {
        [key: string]: {
          price: string;
        };
      };
    };
  };
};

export class CurrencyConverterClient implements ICurrencyConverterClient {
  constructor(private httpClient: IHTTPClient, private logger: IAppLogger) {
    this.logger = this.logger.child(getChildOpts('client', this))
  }

  async convert(
    ctx: ExecutionContext,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    const params = {
      symbol: from,
      convert: to,
      amount,
    };
    const headers = {
      [process.env.COINMARKETCAP_HEADER]: process.env.COINMARKETCAP_KEY,
    };
    const baseURL = process.env.COINMARKETCAP_BASE_URL;
    const url = "/tools/price-conversion";
    const data = await this.httpClient.request<CoinMarketCapResponse>(ctx, {
      url,
      baseURL,
      params,
      headers,
    });
    const { price } = data.data[from].quote[to];
    return price;
  }
}
