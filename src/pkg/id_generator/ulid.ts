import { ulid } from "ulid";
import { IIDGenerator } from "./interface";

export class ULIDGenerator implements IIDGenerator {
  public generateID = ulid;
}
