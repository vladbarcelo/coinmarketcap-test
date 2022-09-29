import Bunyan from "bunyan";
import PrettyStream from "bunyan-prettystream";
import { ExecutionContext } from "../../core/types";
import { IAppLogger, IChildCfg } from "./interface";
import { LoggerLevel } from "./types";

export class BunyanAppLogger implements IAppLogger {
  constructor(
    private isDevEnvironment: boolean,
    private appName: string,
    private instance: Bunyan = null
  ) {
    if (!instance) {
      this.createRootLogger();
    }
  }

  private createRootLogger(): void {
    const logLevel =
      (process.env.LOG_LEVEL as Bunyan.LogLevel) ||
      (this.isDevEnvironment ? "debug" : "info");
    const appVersion = process.env.npm_package_version || "unknown";
    const environmentName = this.isDevEnvironment ? "dev" : "prod";
    const logStreams: Bunyan.LoggerOptions["streams"] = [];

    const prettyStdOut = new PrettyStream({
      useColor: process.env.LOGS_USE_COLOR === "true",
    });
    prettyStdOut.pipe(process.stdout);
    logStreams.push({
      level: logLevel,
      type: "raw",
      stream: prettyStdOut,
    });

    this.instance = Bunyan.createLogger({
      name: `core-${environmentName}-${appVersion}`,
      level: logLevel,
      streams: logStreams,
      serializers: Bunyan.stdSerializers,
    });
    this.instance.debug("Core logger initialized.");
  }

  info(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext = null
  ): void {
    this.instance.info(...(this.getFormattedMsg(msg, ctx) as []));
  }

  warn(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext = null
  ): void {
    this.instance.warn(...(this.getFormattedMsg(msg, ctx) as []));
  }

  error(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext = null
  ): void {
    this.instance.error(...(this.getFormattedMsg(msg, ctx) as []));
  }

  fatal(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext = null
  ): void {
    this.instance.fatal(...(this.getFormattedMsg(msg, ctx) as []));
  }

  debug(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext = null
  ): void {
    this.instance.debug(...(this.getFormattedMsg(msg, ctx) as []));
  }

  private getFormattedMsg(
    msg: string | Record<string, unknown>,
    ctx: ExecutionContext
  ): unknown[] {
    let formattedMsg = msg;
    if (typeof msg === "object") {
      formattedMsg = JSON.stringify(msg, null, 2);
    }

    if (!ctx) {
      return [formattedMsg];
    }

    return [ctx, formattedMsg];
  }

  child(cfg: IChildCfg): IAppLogger {
    const child = this.instance.child(cfg);
    return new BunyanAppLogger(this.isDevEnvironment, this.appName, child);
  }

  level(): LoggerLevel {
    return this.instance.level() as LoggerLevel;
  }
}
