export const apiFetch = async (url: string, options?: RequestInit) => {

  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  /* ACCESS TOKEN EXPIRED */
  if (response.status === 401) {

    const refresh = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refresh.ok) {

      /* retry original request */
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });

    } else {

      window.location.href = "/login";

    }

  }

  return response;
};