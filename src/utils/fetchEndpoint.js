

const API_URL = 'http://localhost:8080/api';

export function fetchEndpoint(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    mode: 'cors',
    body: JSON.stringify(body),
  })
    .then(res => {
      if (!res.ok) {
        throw res.statusText; 
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      const message = `An error occured while fetching ${API_URL}/${endpoint}:\n${err}`;
      console.error(message)
      throw err
    });
}