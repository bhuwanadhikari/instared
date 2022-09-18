import axios, { AxiosRequestConfig } from "axios";

export const baseRequest = (config: AxiosRequestConfig) => {
  return axios(config);
};
