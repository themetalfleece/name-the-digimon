export const ensureAccessToken = () => {
  let accessToken = localStorage.getItem('access-token');

  if (!accessToken) {
    accessToken = crypto.randomUUID();
    localStorage.setItem('access-token', accessToken);
  }

  return accessToken;
};
