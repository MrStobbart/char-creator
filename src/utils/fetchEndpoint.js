

const API_URL = 'http://localhost:8080/api';

export function fetchEndpoint(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res;
    })
    .catch(err => err);
}