const API_URL = 'http://localhost:8080/api';

export function fetchEndpoint<T1 = any, T2 = any>(
  endpoint: string,
  method = 'get',
  body?: T1
): Promise<T2> {
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
      console.error(message);
      throw err;
    });
}
