import { IAppLogger } from "../pkg/logger/interface";

export function getEnvironment(): string {
  return process.env.NODE_ENV || "development";
}

export function isDevEnvironment(): boolean {
  return getEnvironment() === "development";
}

export function panic(msg: string, logger?: IAppLogger, code = 1): void {
  logger ? logger.fatal(msg) : process.stderr.write(`FATAL: ${msg}`);
  process.exit(code);
}
