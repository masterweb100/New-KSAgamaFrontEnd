import { AxiosNormal } from "../../../utils/interceptors";
import QueryString from "qs";

const uri = "accounts";
export function HTTPGetAccounts(param: {
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

export function HTTPGetAccountsID(param: { id: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${uri}/${param.id}`);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPAddAccounts(param: {
  token: string;
  accountCategoryId: number;
  accountName: string;
  accountCode: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(uri, {
        accountCategoryId: param.accountCategoryId,
        accountName: param.accountName,
        accountCode: param.accountCode,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPUpdateAccounts(param: {
  token: string;
  id: string;
  accountName: string;
  accountCode: string;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`${uri}/${param.id}`, {
        accountName: param.accountName,
        accountCode: param.accountCode,
      });
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export function HTTPDeleteAccounts(param: {
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
