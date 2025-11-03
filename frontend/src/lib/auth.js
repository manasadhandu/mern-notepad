// For saving and using JWT token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" && token !== "null";
};
