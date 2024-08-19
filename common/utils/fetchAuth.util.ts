export function getWithAuth(path: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    credentials: "include",
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
export function postWithAuth(path: string, body: any) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
