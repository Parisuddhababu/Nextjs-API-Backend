export const apiFetch = async (url: string, options?: RequestInit) => {

  const token = localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  /* ACCESS TOKEN EXPIRED */
  if (response.status === 401) {

    const refresh = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refresh.ok) {

      const data = await refresh.json();

      /* store new access token */
      localStorage.setItem("accessToken", data.accessToken);

      /* retry original request */
      response = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });

    } else {

      window.location.href = "/login";

    }

  }

  return response;
};