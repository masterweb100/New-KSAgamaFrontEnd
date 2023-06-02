import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "accounts-categories";
export function HTTPGetAccountCategory(param: {
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
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPGetAccountCategoryID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/${param.id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddAccountCategory(param: {
  token: string;
  categoryName: string;
  genId: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
          genId: param.genId,
          categoryName: param.categoryName,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateAccountCategory(param: {
  token: string;
  id: string;
  categoryName: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(
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

export function HTTPDeleteAccountCategory(param: {
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
