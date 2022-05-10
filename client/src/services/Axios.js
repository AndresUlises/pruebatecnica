import axios from "axios";
import Cookies from "js-cookie";

const API_REST_URL = "http://localhost:8080/";

export default function AxiosFactory(path = "", apiVersion = "") {
  const axiosInstance = axios.create({
    baseURL: `${API_REST_URL}${apiVersion}${path}`,
    headers: {
      authorization: `Bearer ${Cookies.get("ACCESS_TOKEN")}`,
    },
  });
  axiosInstance.interceptors.response.use(
    function (response) {
      return Promise.resolve(response);
    },
    function (error) {
      let responseError;
      if (error.response) {
        // Request made and server responded
        responseError = new Error(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        responseError = new Error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        responseError = new Error(error.message);
      }
      return Promise.reject(responseError);
    }
  );
  return axiosInstance;
}
