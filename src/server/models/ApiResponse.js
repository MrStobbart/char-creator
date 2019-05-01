/**
 * Format https://github.com/omniti-labs/jsend
 */
class ApiResponse {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

module.exports = ApiResponse;
