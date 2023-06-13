import QueryString from "qs";
import { AxiosNormal } from "../../../utils/interceptors";

const uri = "product-categories";
export function HTTPGenerateCategoryID(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/id`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetCategories(param: {
  token: string;
  page: string;
  limit: string;
  q: string;
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
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddCategory(param: {
  categoryName: string;
  genId: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        categoryName: param.categoryName,
        genId: param.genId,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateCategory(param: {
  categoryName: string;
  id: string;
  token: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).put(
        `${uri}/${param.id}`,
        {
          categoryName: param.categoryName,
        }
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteCategory(param: {
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
    } catch (error) {
      return reject(error);
    }
  });
}
