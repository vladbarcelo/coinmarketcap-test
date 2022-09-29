import { ExecutionContext } from "../../core/types";
import { LoggerLevel } from "./types";

export interface IChildCfg {
  [key: string]: string;
}

export interface IAppLogger {
  info(msg: string | Record<string, unknown>, ctx?: ExecutionContext): void;
  warn(msg: string | Record<string, unknown>, ctx?: ExecutionContext): void;
  error(msg: string | Record<string, unknown>, ctx?: ExecutionContext): void;
  fatal(msg: string | Record<string, unknown>, ctx?: ExecutionContext): void;
  debug(msg: string | Record<string, unknown>, ctx?: ExecutionContext): void;
  child(cfg: IChildCfg): IAppLogger;
  level(): LoggerLevel;
}
