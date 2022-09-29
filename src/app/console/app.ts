import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CurrencyConverterClient } from "../../client/currency_converter/coinmarketcap";
import { panic } from "../../core/helpers";
import { IController } from "../../core/interface";
import { CurrencyUseCase } from "../../domain/currency/useCase";
import { AxiosHTTPClient } from "../../pkg/http_client/axios";
import { ULIDGenerator } from "../../pkg/id_generator/ulid";
import { getChildOpts } from "../../pkg/logger/helpers";
import { IAppLogger } from "../../pkg/logger/interface";
import { IApp } from "../interface";
import { ConvertController } from "./controllers/convert/controller";

export class CurrencyConverterConsoleApp implements IApp {
  constructor(private logger: IAppLogger) {
    this.logger = this.logger.child(getChildOpts('app', this))
  }

  private controllers: Record<string, IController<unknown, string>>;

  build(): void {
    const idGenerator = new ULIDGenerator();
    const httpClient = new AxiosHTTPClient(this.logger);
    const convertClient = new CurrencyConverterClient(httpClient, this.logger);
    const currencyUseCase = new CurrencyUseCase(convertClient, this.logger);
    const convertController = new ConvertController(
      currencyUseCase,
      idGenerator,
      this.logger
    );
    this.controllers = {
      convert: convertController,
    };
  }

  async run(): Promise<void> {
    const args = yargs(hideBin(process.argv)).argv;
    const action = args._;
    if (!this.controllers[action])
      panic(
        `Please specify an available action. Available actions are: ${Object.keys(
          this.controllers
        )}`,
        this.logger
      );
    const res = await this.controllers[action].handle();
    console.log(res);
  }
}
