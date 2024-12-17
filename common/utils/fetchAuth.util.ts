let cache = {};
const cacheDuration = 300000; // 5minutes

export function getWithAuth(path: string, ignoreCache = false) {
  const cacheKey = ` ${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const now = new Date().getTime();

  // If ignoreCache is true, bypass the cache and fetch fresh data
  if (
    !ignoreCache &&
    cache[cacheKey] &&
    now - cache[cacheKey].timestamp < cacheDuration
  ) {
    return Promise.resolve(cache[cacheKey].data);
  }

  // Fetch if not in cache or cache expired
  return fetch(cacheKey, {
    credentials: "include",
    method: "GET",
    mode: "no-cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Cache the response data
      cache[cacheKey] = {
        data,
        timestamp: now,
      };
      return data;
    });
}

export function seeCache() {
  return cache;
}

export function deleteCacheById(id: string) {
  Object.keys(cache).map((cacheKey) => {
    if (cacheKey.includes(id)) {
      cache[cacheKey] = undefined;
    }
  });
}

export function deleteCache() {
  cache = {};
}

export function getCacheTimestamp(id: string) {
  let timestamp;

  Object.keys(cache).map((cacheKey) => {
    if (cacheKey.includes(id)) {
      timestamp = cache[cacheKey].timestamp;
    }
  });

  return timestamp;
}

export function postWithAuth(path: string, body: any) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    mode: "no-cors",
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
