import axios from "axios";
import { getAuth } from "./identity";

const url = process.env.NEXT_PUBLIC_API_URL;

const customAxiosInterceptor = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "x-mode": (process.env.NEXT_PUBLIC_APP_ENV || "no-env") + "Web",
    "content-type": "application/json",
  },
});

const requestHandler = (request) => {
  const auth = typeof window !== "undefined" ? getAuth() : null;
  if (auth) {
    request.headers = { ...request.headers, "x-access-token": auth };
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401 || response.status === 403) {
    removeAuth();
  }
  return response;
};

const errorHandler = (error) => {
  // if (error.response.status === 401 || error.response.status === 403) {
  //     // removeAuth();
  // }
  console.log("api error in customAxiosInterceptor page", error);
  return Promise.reject(error);
};

customAxiosInterceptor.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxiosInterceptor.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxiosInterceptor;
