export type HTTPRequestOpts = {
  url: string;
  baseURL: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string | number | boolean>;
};
