import axios from 'axios';

const httpRequest = axios.create({
  baseURL: "https://petitelibrary.onrender.com",
  // baseURL: "http://localhost:5001",
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

httpRequest.interceptors.request.use(
  (config) => {
    const newConfig = config;
    return newConfig;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });
    Promise.reject(error);
    return null;
  },
);

export default httpRequest;
