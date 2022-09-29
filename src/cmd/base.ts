require("source-map-support").install();
require("dotenv").config();

import { isDevEnvironment, panic } from "../core/helpers";
import { BunyanAppLogger } from "../pkg/logger/bunyan";
import { IAppLogger } from "../pkg/logger/interface";

export class BaseCmd {
  constructor(protected name: string) {
    this.createRootLogger();
  }

  protected logger: IAppLogger;

  private createRootLogger(): void {
    const isDevEnv = isDevEnvironment();
    this.logger = new BunyanAppLogger(isDevEnv, this.name);
    process.on("unhandledRejection", (err: Error, _) => {
      this.logger.error(`Unhandled promise rejection: ${err.message}`);
    });
  }

  public run(): void {
    try {
      this.logger.debug(`Running command ${this.name}...`);
      this.cmd();
    } catch (err) {
      panic(`Unable to run cmd ${this.name}: ${err.message}`, this.logger);
    }
  }

  protected cmd(): void {
    throw new Error("Method not implemented");
  }
}
