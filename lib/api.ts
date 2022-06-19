export const apiUrl = '/api';

export function addItem(item: any) {
  return fetch(`${apiUrl}/addItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
}

export async function getItems() {
  return fetch(`${apiUrl}/getItems`).then(res => res.json());
}