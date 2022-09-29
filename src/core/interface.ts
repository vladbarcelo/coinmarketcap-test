export interface IController<Request, Response> {
  handle(): Promise<Response>;
}
