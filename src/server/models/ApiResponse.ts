/**
 * Format https://github.com/omniti-labs/jsend
 */
type Status = 'success' | 'fail';

export class ApiResponse {
  public status: Status;
  public data: any;
  public constructor(status: Status, data: any) {
    this.status = status;
    this.data = data;
  }
}
