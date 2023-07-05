import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";
import { AxiosRequestConfig } from "axios";

const uri = "product-types";
export function HTTPGenerateTypeID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetTypes(param: {
  token: string;
  page: string;
  limit: string;
  q: any;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(uri, {
        params: {
          page: param.page,
          limit: param.limit,
          q: param.q,
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPGetTypesByParent(param: {
  token: string;
  id: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`${uri}/parent`, {
        params: {
          productBrandId: param.id,
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPAddType(param: {
  typeName: string;
  genId: string;
  token: string;
  productBrandId: number;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        typeName: param.typeName,
        genId: param.genId,
        productBrandId: param.productBrandId,
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPUpdateType(param: {
  typeName: string;
  id: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(
        `${uri}/${param.id}`,
        {
          typeName: param.typeName,
        }
      );
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPDeleteTypes(param: {
  ids: any[];
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).delete(uri, {
        params: {
          ids: param.ids,
        },
        paramsSerializer: {
          serialize: (params: any) => {
            let newParams = QueryString.stringify(params, {
              encodeValuesOnly: true,
              arrayFormat: "brackets",
            });
            return newParams.replace(/[\[\]']+/g, "");
          },
        },
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPAddTypesXLSX(param: { form: FormData, token: any }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "post",
        url: `${uri}/import`,
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

      const response = await AxiosNormal(param.token).request(config);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}