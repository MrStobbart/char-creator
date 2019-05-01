/**
 * Format https://github.com/omniti-labs/jsend
 */
type Status = 'success' | 'fail';

export class ApiResponse {
  status: Status;
  data: any;
  constructor(status: Status, data: any) {
    this.status = status;
    this.data = data;
  }
}
