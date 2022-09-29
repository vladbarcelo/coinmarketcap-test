import { CurrencyConverterConsoleApp } from "../app/console/app";
import { panic } from "../core/helpers";
import { BaseCmd } from "./base";
import { Commands } from "./commands";

class CurrencyConverterConsoleCmd extends BaseCmd {
  constructor() {
    super(Commands.CurrencyConverterConsole);
  }

  protected cmd(): void {
    const app = new CurrencyConverterConsoleApp(this.logger);
    try {
      app.build();
      app.run();
    } catch (e) {
      panic(`Error starting app: ${e.message}`, this.logger);
    }
  }
}

new CurrencyConverterConsoleCmd().run();
