/** Execution context. Contains data that needs to be persisted through the entire execution chain. */
export type ExecutionContext = {
  requestId: string;
};

export type ClassInstance = {
  constructor: {
    name: string;
  };
};

export type RequestValidator = (request: unknown) => unknown;
