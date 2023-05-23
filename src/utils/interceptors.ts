import Axios from "axios";


const ServerURL = "https://ksaprojectapp.com/api/v1/";

export function AxiosNormal(token?: string) {
  let instance = Axios.create({
    baseURL: ServerURL,
    timeout: 30 * 1000,
    headers: {
      Authorization: token !== undefined ? `Bearer ${token}` : "-",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      try {
        if (error.response) {
          if (error.response.status === 401) {
            return Promise.reject(error.response.data);
          }
          if (error.response.status === 403) {
            return Promise.reject(error.response);
          }

          if (error.response.data !== "") {
            return Promise.reject(error.response);
          } else {
            return Promise.reject(error.response);
          }
        } else if (error.request) {
        } else {
        }
      } catch (error) {
        console.log(error)
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
