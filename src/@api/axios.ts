import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../@store";

import { logoutUser } from "@helpers/utils";
import { setAppLoading } from "@store/app/AppActions";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
const ResponseInterceptor = (response: AxiosResponse) => {
  store.dispatch(setAppLoading(false));
  return response;
};
const RequestInterceptor = (config: any) => {
  config.headers.common["Accept-Language"] = "en";
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("access_token");
  store.dispatch(setAppLoading(true));
  return config;
};
axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(ResponseInterceptor, (error: any) => {
  store.dispatch(setAppLoading(false));
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("error", error);
    return;
  } else {
    if (error.response.status === 401) {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      logoutUser(navigate, dispatch);
    }
    return Promise.reject(error);
  }
});
