export interface CommonHttpRequest {
  nameRequest: string;
  callback: (data) => {};
  errorFn?: (data) => {};
  data?: any;
}
