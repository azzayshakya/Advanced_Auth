export const getTokenFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
};

export const storeToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getStoredToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};
