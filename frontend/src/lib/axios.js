// import axios from "axios";

// const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? "https://manuvarma-notes-builder.onrender.com//api"
//     : "/api";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// //Automatically attach JWT token if available
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
// src/lib/api.js  (or wherever you have it)
import axios from "axios";

const BASE_URL = "https://manuvarma-notes-builder.onrender.com/api";
// Force the correct backend URL in both dev and production

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you use cookies
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
