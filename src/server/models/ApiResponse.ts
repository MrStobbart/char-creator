/**
 * Format https://github.com/omniti-labs/jsend
 */
type Status = 'success' | 'fail';

export class ApiResponse {
  public status: Status;
  public data: any;
  public message?: string;
  public constructor(status: Status, data: any, message?: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
