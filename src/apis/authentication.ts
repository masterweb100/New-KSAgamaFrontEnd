import { AxiosRequestConfig } from "axios";
import { AxiosNormal } from "../utils/interceptors";

export function HTTPLogin(param: { form: FormData }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "post",
        url: "/login",
        responseType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return data;
        },
        data: param.form,
      };

      const response = await AxiosNormal().request(config);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}