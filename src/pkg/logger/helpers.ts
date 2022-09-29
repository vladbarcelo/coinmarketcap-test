import { ClassInstance } from "../../core/types";

export function getChildOpts(
  type: string,
  instance: ClassInstance
): { abstraction: string; class: string } {
  return {
    abstraction: type,
    class: instance.constructor.name,
  };
}
