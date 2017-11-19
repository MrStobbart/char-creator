

const API_URL = 'http://localhost:8080/api';

export function fetchEndpoint(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    mode: 'cors',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => {
      console.error(`An error occured while fetching ${API_URL}/${endpoint}:\n${JSON.stringify(err, null, 2)}`)
      return err
    });
}