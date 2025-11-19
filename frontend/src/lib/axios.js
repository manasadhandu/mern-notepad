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
// src/services/api.js  (or whatever the file is called)
import axios from "axios";

const api = axios.create({
  baseURL: "https://manuvarma-notes-builder.onrender.com/api",
  // This forces every request to go to your Render backend
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
